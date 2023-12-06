---
title: "Avoiding mutability pitfalls in constructs-based API design"
description: A technical deep dive on some of the challenges of designing mutation APIs using the constructs framework
authors: 
  - rybickic
tags: [winglang, cdk, constructs, api design, jsii, AWS CDK]
image: https://uploads-ssl.webflow.com/63720940a94e098b4e2a542b/653fbf0e427627f6648c8c32_opengraph1.png
hide_table_of_contents: true
---
![constructs-api-blog-banner](./assets/constructs_api_blog_banner.png)

At Wing Cloud, we're building a programming language named Winglang that makes it easier to build cloud applications.
One of the main features of Winglang is that it lets you model an app's cloud resources alongside its application code.
Every cloud resource in Winglang is modeled as a **construct**, similar to the [AWS CDK] and [CDKTF] infrastructure-as-code frameworks.
In the Wing application below, the classes named `Bucket` and `Function` are both constructs:

```js
bring cloud;

let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
    bucket.put("Hello", "world");
});
```

One of the cooler capabilities of constructs is that their properties can be configured after they have been initialized, through methods.
For example, environment variables can be added to a serverless function during or after initialization:

```js
let fn = new cloud.Function(
  inflight () => { /* code */ },
  env: { DB_HOST: "af43b12" }
);

// ...later

fn.addEnvironment("DB_NAME", "orders");
```

However, the flexibility to mutate constructs introduces some challenges once we try to compose them together.
In this blog post I'll highlight some of these challenges, and explain several of the best practices for designing APIs that avoid these pitfalls.

[AWS CDK]: https://github.com/aws/aws-cdk
[CDKTF]: https://github.com/hashicorp/terraform-cdk

## What are constructs?

First, let's familiarize ourselves with constructs to get an idea of how they works.

[`constructs`](https://github.com/aws/constructs) is a JavaScript library that provides an API for organizing classes into trees.
A construct is created in JavaScript by writing a class that extends the `Construct` class, with a signature of `(scope, id, props)`.
Constructs are always created in the scope of another construct[^1] and must always have an identifier which must be unique within the scope it’s created.
A construct's identifier is used to generate a unique names for every cloud component.

[^1]: An exception is the "root" construct, often named `App` or something similar.

In this running example, I'll create a made-up construct framework for modeling gardens.
Let's imagine our garden framework produces a `garden.json` file that declaratively specifies all of the flowers in our garden in a flat list.

```js
// garden.js
const { Construct } = require("constructs");
const { writeFileSync } = require("node:fs");

// --- garden framework classes ---

class Flower extends Construct {
  constructor(scope, id, props) {
    super(scope, id);
    this.kind = props.kind;
    this.color = props.color;
  }

  toJson() {
    return {
      id: this.node.path,
      kind: this.kind,
      color: this.color,
    };
  }
}

class Garden extends Construct {
  constructor() {
    super(undefined, "root");
  }

  synth() {
    const isFlower = (node) => node instanceof Flower;
    // every construct class has a `.node` field for accessing construct-related APIs
    const flowers = this.node.findAll().filter(isFlower).map((c) => c.toJson());
    writeFileSync("garden.json", JSON.stringify(flowers, null, 2));
  }
}

// --- application code ---

const garden = new Garden();
for (let i = 0; i < 5; i++) {
  new Flower(garden, `tulip${i}`, {
    kind: "tulip",
    color: "yellow",
  });
}
garden.synth();
```

Above, we have two constructs: `Flower` and `Garden`.

`Flower` represents a single flower, with two pieces of state (its kind and color).

`Garden` is the root of our garden application, and it will contain all of the flower constructs.
It will also be responsible for finding all flowers in the constructs tree, converting them to JSON, and writing the `garden.json` file.

By running `node garden.js`, we produce a `garden.json`, which looks like:

```json
[
  {
    "id": "root/tulip0",
    "kind": "tulip",
    "color": "yellow"
  },
  {
    "id": "root/tulip1",
    "kind": "tulip",
    "color": "yellow"
  },
  {
    "id": "root/tulip2",
    "kind": "tulip",
    "color": "yellow"
  },
  {
    "id": "root/tulip3",
    "kind": "tulip",
    "color": "yellow"
  },
  {
    "id": "root/tulip4",
    "kind": "tulip",
    "color": "yellow"
  }
]
```

When you create an app in Wing and compile it to a target like `tf-azure`, instead of creating `garden.json`, it creates a Terraform JSON file that describes all of the resources in your app -- but the essential structure is the same.

## Using methods to mutate state

The default way to configure a construct is to provide a list of properties (sometimes called "props") during initialization.
We saw this in the previous example when creating new flowers:

```js
let flower = new Flower(garden, `tulip${i}`, {
  kind: "tulip",
  color: "yellow",
});
```

But as we saw in the introduction, it's also possible to for methods to change a construct's properties.
For example, we could add a method that changes the flower's color:

```js
flower.setColor("blue");
```

This works like you'd imagine - and it's easy to implement.
However, it's not without drawbacks.

By making the construct's state *mutable*, it's possible for it to be changed in more than one place. can lead to surprising behavior.

For example, take the following code where I've defined two new constructs, an `OrangePatch` and `PurplePatch`, both accepting a flower in its `props`:

```js
class OrangePatch extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    props.flower.setColor("orange");
  }
}

class PurplePatch extends Construct {
  constructor(scope, id, props) {
    super(scope, id, props);
    props.flower.setColor("purple");
  }
}

const garden = new Garden();
const rose = new Flower(garden, "rose", {
  kind: "rose",
  color: "red",
});
new OrangePatch(garden, "orange-patch", { flower: rose });
new PurplePatch(garden, "purple-patch", { flower: rose });
```

Since they both set the color of `rose`, one of them is going to override the decision of the other (in this case, the final rose will be purple).
Uh oh!

To avoid these kinds of issues, I recommend following these two rules when designing methods on constructs:

### Rule 1: Only add state, never subtract or update

Methods should add state, not update or subtract state. If you're always adding state, then state that was configured or added earlier in the application won't get removed or overridden. The additions should also be [commutative](https://en.wikipedia.org/wiki/Commutative_property) - which means re-ordering them should not change the application's functional behavior.

We can see an example of this rule with the `addEnvironment` method on `cloud.Function`:

```js
let fn = new cloud.Function(/* props */);
fn.addEnvironment("DB_NAME", "orders");
```

If you try calling `addEnvironment` with the same string twice, it throws an error.
Since environment variables can only be added, you can pass around `fn` throughout your codebase - including to third party libraries! - without worrying about environment variables being removed or changed.

### Rule 2: Document destructive APIs

While methods that destroy existing state are worth avoiding, if there's a need for them, document the APIs accordingly.

For example, if changing a flower's color is truly necessary, it's a good practice to give the method a descriptive name like `overrideColor()` to make it clear when reading the code that something exceptional is happening.

Another common use case for mutating APIs are to provide [escape hatches](https://docs.aws.amazon.com/cdk/v2/guide/cfn_layer.html#cfn_layer_raw) for when an abstraction doesn't expose all of the capabilities you need.
You shouldn't need them often, but when you do, you're usually glad they're available.

## Summary

By following the rules above, you'll design safer APIs like the classes in the AWS CDK and Wing's standard library, that lead to fewer mutation surprises when they're used by other developers.

If you're interested in learning more about constructs, check out the [constructs documentation](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html) on the AWS CDK website.
