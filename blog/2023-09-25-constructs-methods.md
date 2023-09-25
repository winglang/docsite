---
title: Designing programmatic APIs for cloud infrastructure using constructs
description: Technical deep dive on some of the challenges of designing ergonomic APIs using the constructs framework
authors: 
  - rybickic
tags: [winglang, cdk, constructs, api design, jsii, AWS CDK]
hide_table_of_contents: true
---

One of the essential features of Winglang is being able to use familiar programming language tools like variables, for loops, and classes to describe the cloud resources that are part of your application.
For example, cloud applications may rely on databases, queues, storage buckets, API endpoints, as well as compute platforms such as Kubernetes clusters or AWS Lambda.

Today, Winglang uses **constructs**, a foundational framework that underpins several infrastructure-as-code libraries such as [AWS CDK], [CDKTF], and [cdk8s], to allow cloud components to be expressed and composed together into higher level abstractions.

In the Wing application below, the classes named `Bucket` and `Function` are both constructs:

```js
bring cloud;

let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
    bucket.put("Hello", "world");
});
```

Each class in Winglang's standard library representing a cloud component is a construct.
When an application is compiled, a construct is converted into one or more pieces of declarative [IaC] configuration (such as Terraform or CloudFormation).

One superpower of constructs is that their properties can be configured after initialization, through methods.
For example, environment variables can be added to a serverless function during or after initialization:

```js
let fn = new cloud.Function(
  inflight () => { /* code */ },
  env: { DB_HOST: "af43b12" }
);

// ... some more code

fn.addEnvironment("DB_NAME", "orders");
```

However, this extra expressiveness introduces some challenges once we try to compose constructs together.
In this blog post I'll highlight some of these challenges, and explain several of the best practices for designing APIs that avoid these pitfalls.

[IaC]: https://en.wikipedia.org/wiki/Infrastructure_as_code
[AWS CDK]: https://github.com/aws/aws-cdk
[CDKTF]: https://github.com/hashicorp/terraform-cdk
[cdk8s]: https://github.com/cdk8s-team/cdk8s

## What is `constructs`?

First, let's familiarize ourselves with `constructs` to get an idea of how it works.

`constructs` at its core is a JavaScript library that provides a set of APIs for organizing classes into trees.
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

  synth() {
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
    const flowers = this.node.findAll().filter(isFlower).map((c) => c.synth());
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

## Using methods to change state

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

const garden = new Garden(undefined, "root");
const rose = new Flower(garden, "rose", {
  kind: "rose",
  color: "red",
});
new OrangePatch(garden, "orange-patch", { flower: rose });
new PurplePatch(garden, "purple-patch", { flower: rose });
```

Since they both set the color of `rose`, one of them is going to override the decision of the other (in this case, the final rose will be purple).
Uh oh!

To avoid these kinds of issues, we usually follow these two rules when designing the methods of constructs.

### Rule 1: Only add state

Methods should add state, not update or subtract state. If you're always adding state, then state that was configured or added earlier in the application won't get removed or overridden. The additions should also be [commutative](https://en.wikipedia.org/wiki/Commutative_property) - which means re-ordering them should not change the application's functional behavior.

We can see an example of this rule with the `addEnvironment` method on `cloud.Function`:

```js
let fn = new cloud.Function(/* props */);
fn.addEnvironment("DB_NAME", "orders");
```

If you try calling `addEnvironment` with the same string twice, it throws an error.
Since environment variables can only be added, you can pass around `fn` throughout your codebase - including to third party libraries! - without worrying about environment variables being removed or changed.

Besides changing internal state on a construct, methods can also create new auxiliary constructs, which is another way to safely add state. For example, in Wing it's possible to add objects to a bucket during deployment like so:

```js
bring cloud;

let bucket = new cloud.Bucket();
bucket.addObject("hello.txt", "cool beans");
```

Under the hood, `addObject` creates a new construct representing a bucket object, and that gets translated into IaC configuration separately from the actual bucket.

### Rule 2: Document mutating APIs

While methods that destroy existing state are worth avoiding, if there's a need for them, document the APIs accordingly.

For example, if changing a flower's color is truly necessary, it's a good practice to give the method a descriptive name like `overrideColor()` to make it clear when reading the code that something exceptional is happening.

Another common use case for mutating APIs are to provide [escape hatches](https://docs.aws.amazon.com/cdk/v2/guide/cfn_layer.html#cfn_layer_raw) for when an abstraction doesn't expose all of the capabilities you need.
You shouldn't need them often, but when you do, you're usually glad they're available.

## To be continued

By following the rules above, you'll find it easier to design more safer APIs like the classes in the AWS CDK and Wing's standard library that lead to fewer surprises when they're used by other developers.

In the next post, we'll explore more design patterns in the constructs ecosystem, including how to safely design "getters" on constructs in the face of mutations.
