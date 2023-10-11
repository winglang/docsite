---
title: "Avoiding mutability pitfalls in constructs-based API design: part 2"
description: The second part in a series about designing safe APIs around mutation using the constructs framework
authors: 
  - rybickic
tags: [winglang, cdk, constructs, api design, jsii, AWS CDK, mutability]
hide_table_of_contents: true
---

Hey there! 👋
My name's Chris and I'm a software engineer on the Wing Cloud team.
Lately I've been helping out building Wing's compiler, and the design of APIs in Wing's standard library.

In the [first post](./2023-09-25-constructs-api-design.md) in this series, I introduced some of the challenges of designing APIs for [constructs](https://github.com/aws/constructs) and frameworks like AWS CDK, CDKTF, and cdk8s when mutation is involved.

To recap, a construct can have public methods that mutate the objects' private state.
But if this state is replaced or destroyed, then application code becomes more sensitive to the order in which methods are called.
This is usually undesirable when our constructs are modeling declarative information, like infrastructure configuration.

To that end, we proposed two solutions for designing construct methods:

1. Only add state, never subtract or update
2. Document destructive APIs

These measures are great for addressing a lot of our concerns with mutation.
But as we'll see, mutation has wider effects than just the design of methods.

## Sharing construct state through properties

Another key capability of most constructs is that they can expose parts of their state for other constructs to use through **properties**.
We can see how they're used in an example from the AWS CDK framework below, written in Wing:

```js
bring "aws-cdk-lib" as cdk;

let table = new cdk.aws_dynamodb.Table(
  partitionKey: {
    name: "path",
    type: cdk.aws_dynamodb.AttributeType.STRING
  }
) as "hits";

let handler = new cdk.aws_lambda.Function(
  runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
  handler: "hitcounter.handler",
  code: cdk.aws_lambda.Code.fromAsset("./lambda"),
  environment: {
    HITS_TABLE_NAME: table.tableName
  }
);
```

The construct named `Table` has a public property named `tableName` that stores the table's physical name for identifying it on AWS.
The table's `tableName` passed as the value of the `HITS_TABLE_NAME` environment variable so that the AWS Lambda function can use the table's dynamic name at runtime -- for example, to query the table (not shown).

Any construct state that isn't meant to be a private implementation detail can be made public.
But, as we've mentioned before, it's also possible for construct state to change after it was first initialized in the code.

Uh oh - this smells like a recipe for problems.

## When properties get stale

Let's understand what causes properties to not play well with mutating methods through an example.
I'll start by taking my `Flower` class from the previous post and adding options to specify the regions in the world where it's natively found:

```js
class Flower extends Construct {
  constructor(scope, id, props) {
    super(scope, id);
    this._kind = props.kind;
    this._nativeRegions = props.nativeRegions;
  }

  addNativeRegion(region) {
    this._nativeRegions.push(nativeRegion);
  }

  toJson() {
    return {
      id: this.node.path,
      kind: this._kind,
      nativeRegions: this._nativeRegions,
    };
  }
}
```

I've prefixed the instance fields with underscores to indicate that they're not meant to be accessed outside of the class's implementation.
JavaScript does support private class members now, but it's a somewhat recent addition, so you don't find them in the wild too often.[^1]

[^1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields

Here's how the updated construct is used:

```js
let flower = new Flower(garden, `tulip`, {
  kind: "tulip",
  nativeRegions: ["Turkey", "Greece"],
});
flower.addNativeRegion("Romania");
```

Everything's good so far.
If we try synthesizing a `garden.json` file with the new Flower, it will output the flower's definition in JSON as we expect:

```json
[
  {
    "id": "root/rose",
    "kind": "rose",
    "color": "red",
    "nativeRegions": [
      "Denmark"
    ]
  },
  // ... rest of the garden data
]
```
Now let's say we add the capability for users to _get_ the native regions of a flower.
I'll also add a construct for representing a signpost in front of our garden.

```js
class Flower extends Construct {
  get nativeRegions() {
    return [...this._nativeRegions];
  }

  // ... rest of the class unchanged
}

class Signpost extends Construct {
  constructor(scope, id, props) {
    super(scope, id);
    const allRegions = new Set(props.flowers.flatMap((f) => f.nativeRegions));

    this._message = "Welcome to Tulip Trove, home to flowers from: ";
    this._message += [...allRegions].join(", ");
    this._message += ";";
  }

  toJson() {
    return {
      id: this.node.path,
      message: this._message,
    };
  }
}
```

Inside `Signpost`, we're collecting and de-deplicating all of the native regions of the flowers passed to the signpost, and embedding them into a friendly message.

Finally, I'll write some client code that tries using the signpost with some flowers:

```js
const garden = new Garden(undefined, "root");

// add a flower
const rose = new Flower(garden, "rose", { kind: "rose", color: "red" });
rose.addNativeRegion("Denmark");

// add a signpost
new Signpost(garden, "signpost", { flowers: [rose] });

// add more regions to our first flower
rose.addNativeRegion("Turkey");
rose.addNativeRegion("Greece");

garden.synth();
```

When I synthesize my garden with `node garden.js`, I'm expecting the signpost to have a message like "Welcome to Tulip Trove, home to flowers from: Denmark, Turkey, Greece".
But when I check `garden.json`, I find instead it only lists Denmark:

```json
[
  {
    "id": "root/rose",
    "kind": "rose",
    "color": "red",
    "nativeRegions": [
      "Denmark",
      "Turkey",
      "Greece"
    ]
  },
  {
    "id": "root/signpost",
    "message": "Welcome to Tuple Trove, home to flowers from: Denmark."
  }
]
```

Aw shucks.

The problem, as you guessed, is that the state read by `Signpost` was stale.
Since the signpost's message was calculated immediately, it wasn't changed when the rose's native regions was added to.

But in some sense, it's not entirely `Signpost`'s fault - how was it supposed to know the field could change?
It doesn't seem right that to have to look at the implementation of `Flower` in order to determine whether the data will be calculated later or not.
We need a better way.

## "Lazy" values to the rescue

The approach we're going to take to solve this problem is to add support for a way of modeling values that aren't available yet, called `Lazy` values.

Each constructs framework has a slightly different way of doing this, but the general idea is that instead of returning some state that could become stale, as we did here in `Flower`:

```js
class Flower extends Construct {
  get nativeRegions() {
    return [...this._nativeRegions];
  }

  // ... rest of the class unchanged
}
```

... we will instead return a `Lazy` value that promises to return the correct value:

```js
class Flower extends Construct {
  get nativeRegions() {
    return new Lazy(() => [...this._nativeRegions]);
  }

  // ... rest of the class unchanged
}
```

Representing delayed values with lazy values (sometimes called "[thunks](https://en.wikipedia.org/wiki/Thunk)") is a well-trodden path in the history of computer science, which sees popular use all kinds of frameworks.
React's [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) hook is a good example of where this pattern in the real world.

If we were using TypeScript for these examples, we would also model this with a different type.
Instead of the `nativeRegions` getter returning `Array<string>`, it will return `Lazy<Array<string>>`.
This extra `Lazy` "wrapper" matches up with the fact that to access the value stored inside, we have to write some extra code to unwrap it.

Now let's update `Signpost` to make it work with the fixed `Flower` construct:

```js
class Signpost extends Construct {
  constructor(scope, id, props) {
    super(scope, id);

    this._message = new Lazy(() => {
      const allRegions = new Set(props.flowers.flatMap((f) => f.nativeRegions.produce()));
  
      let message = "Welcome to Tuple Trove, home to flowers from: ";
      message += [...allRegions].join(", ");
      message += ".";
      return message;
    });
  }

  // toJson unchanged
}
```

As you can see, since `nativeRegions` is a `Lazy` value, it's clear that `_message` also needs to be a lazy value.
It's not a public property of `Signpost`, but we could expose it with type `Lazy<string>` if we wanted now.
The main change is that we also have to call `produce` on the lazy value in order to unwrap its actual value (in the example above, `f.nativeRegions` has become `f.nativeRegions.produce()`).

The core implementation of `Lazy` requires some changes to `Garden` as well, but they're not too interesting to look at.
But if you're curious, the code from this post in its entirety is available as a gist [here](https://gist.github.com/Chriscbr/58384bdd7b8ce5e8fedf24ddba55e103) for your perusal.

## Ideas for making `Lazy` less complicated

`Lazy` values can be pretty powerful -- but one thing holding them back is the ergonomics of using them.
In our example, we see that in order to create a `Lazy`, you need to wrap it in this function literal syntax `new Lazy(() => { ... })`.

But even with that aside, we have also potentially introduced new issues, because of this fact:

> `produce` should only be called on a `Lazy` value within another `Lazy` definition

If we tried calling `f.nativeRegions.produce()` directly inside of `Signpost`'s constructor, we'd obtain a list of native regions that would still get stale, putting us back at square one.
The only way to guarantee we're using `Lazy` properly is if it's only evaluated at the end of our app, when we call `garden.synth()`.

In addition, having to call `produce()` on each `Lazy` is tedious and it's easy to forget.

But perhaps... there's a better way?

It turns out the issues I've described above (like checking for errors in your code, and automatically generating code for you) are the kinds of problems that **compilers** are perfect for!

We don't have a proposal available yet, but it's possible in a future version of Wing, the language could have built-in support for safe and easy `Lazy` usage:

```js
// in Wing...

class Flower {
  // ...

  get nativeRegions(): Lazy<Array<str>> {
    return lazy { this._nativeRegions.copy() };
  }
}

class Signpost {
  constructor(props) {
    this._message = lazy {
      let allRegions = Set<string>.from(
        // no need to call .produce() - it's automatically handled by `lazy { ... }`
        props.flowers.flatMap((f) => f.nativeRegions)
      );
  
      let var message = "Welcome to Tuple Trove, home to flowers from: ";
      message += allRegions.toArray().join(", ");
      message += ".";
      return message;
    };
  }
}
```

What do you think?
Let us know on our [GitHub](https://github.com/winglang/wing) or [Slack](https://t.winglang.io/slack) if you have any thoughts or feedback on this post, or just the language in general.
