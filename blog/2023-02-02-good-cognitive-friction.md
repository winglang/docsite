---
title: Introducing `let var` and good cognitive friction
description: Why we are making Wing immutable by default
authors: 
  - eladb
tags: [cloud-oriented programming, winglang, immutability, let, var, inflights, community]
hide_table_of_contents: true
---

[Chris Rybicki](https://twitter.com/rybickic) has recently added support for `let var` to Wing (see
the [pull request](https://github.com/winglang/wing/pull/1180)), and I thought it might be a good
opportunity to share our thoughts on the topic of immutability in Wing.

One of Wing's design goals is to help developers write safer code. Change in state is a major source
of complexity (and bugs) in software. Eric Elliott's [Dao of Immutability](https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd#.9g51h5stk) describes it beautifully:

> "The true constant is change. Mutation hides change. Hidden change manifests chaos. Therefore, the
> wise embrace history"

A language-level guarantee that state cannot change offers opportunities for caching, runtime
optimizations and lock-free concurrency. Those attributes are very useful in distributed systems.

## Immutable by default

This is why, similarly to other modern programming languages such as Rust and Go, we are designing
Wing to be *immutable by default*.

Let's look at an example:

```js
let myArray = [1,2,3,4];
```

The above code defines an *immutable* array with the contents `[1,2,3,4]` and assigns it to
`myArray`. Immutability means that the contents of the object cannot be modified.

So if we try to add an item:

```js
myArray.push(5);
//       ^^^^ Unknown symbol "push"
```

> Eventually we would want this error to be something like `Operation "push" is only available on
> mutable arrays. Did you mean to declare the array with MutArray<num>?`, but [bear with
> us](https://github.com/winglang/wing/issues/1428)...

This is because the type of `myArray` is `Array<num>`, which represents an immutable array, it
simply doesn't have any methods that will cause it to change. In Wing, the following types are
immutable: `str`, `num`, `bool`, `Array<T>`, `Set<T>` and `Map<T>`.

If I wanted to define it as a mutable array, I will need to be explicit:

```js
let myMutArray = MutArray<str>["hello", "world"];
```

And now we can go wild:

```js
myMutArray.push("go wild!"); // OK!
```

Similarly, we can define other mutable collection types:

```js
let mySet = MutSet<str>{"hello", "world"};
let myMap = MutMap<bool>{"dog": true, "cat": false};
```

> By the way: we are still debating if the standard types should be pascal-cased (e.g. `Array<T>`,
> `MutArray<T>`) or snake (`array<T>`, `mutArray<T>`). Let us know what you think!

Yes! We are going to make this *slightly* harder to define mutable collections. 

> In the *future*, maybe we will introduce some syntactic sugar like:
> 
> ```js
> let x = mut [1,2,3]; // <-- not a doctor
> ```

This design concept is what's called "good cognitive friction" (or "mechanical sympathy"). It is
introduced intentionally in order to make sure the user understands the system better and encourage
best practices.

## Reassignability

But immutability is not enough! Since we reference our array through `myArray`, the compiler also
needs to guarantee that `myArray` will always point to the same object.

Let's look at a hypothetic example:

```js
let i = 10;
new cloud.Function(inflight () => { print(i); }) as "f1";
i = 20;
new cloud.Function(inflight () => { i = i + 9; }) as "f2";
i = i - 90;
```

What value will the cloud function print? We can't tell because `i` is reassigned in multiple
locations and there is absolutely no way to determine its value.

This is where **reassignability** comes into play. In fact, in Wing, the above example would have
failed compilation:

```js
   i = 20;
// ^ variable i is not reassignable
```

OK, now we can relax. The Wing compiler tells us that `i` is not reassignable.

Reassignability is a form of mutability (it is mutating the reference) and most modern programming
languages are trying to encourage single assignment. `let` in Rust, `:=` in Go, and `const`
everywhere in JavaScript.

So how do you make something reassignable? You can use `let var`:

```js
let var s = "hello";
s = "world";
```

You can also use `var` in class and resource declarations:

```js
class Foo {
  i: num;
  var s: str;


  init() {
    // all non-optional fields must be assigned at construction (not implemented yet)
    this.i = 10;
    this.s = "world";
  }

  bar() {
    // "var" fields can be reassigned at any time
    this.s = "hello";

    this.i = 20;
    //   ^ i is not reassignable
  }
}
```

It can also be used in argument declarations:

```js
let handler = inflight (var x: str) => {
  if x == "hello" {
    x = "${x} world";
  }
};
```

## Why `let var`?

We originally [considered](https://github.com/winglang/wing/pull/1180) using `var` instead of `let
var`, but we realized this is making it too easy to do the wrong thing. Entire code bases will be
written with just `var` and mountains of linters will be written to protect you from shooting
yourself in the foot.

Going back to this concept of "good cognitive friction". If you need to type a few more characters in
order to make a variable reassignable (`let var` versus `let`), you will likely just use `let` most
of the time, and the world will be a better place with less bugs and happier developers.

## The Inflight Connection

So how is all this related to cloud development?

One of the very cool things about immutable state is that the compiler can create as many copies of
it as needed. If the compiler has a guarantee that a blob of data will never change over the
lifetime (and space) of the system, it can simply distribute it where it is needed.

This means, that in Wing, immutable data can be seamlessly referenced from any [inflight
context](https://docs.winglang.io/concepts/inflights).

Let's look at a very simple example just to explain the idea:

```js
bring cloud;

let myArray = ["hello", "world"];

new cloud.Function(inflight (_: str) => { 
  assert(myArray.length == 2); 
}) as "test";
```

So what's going on here? We have defined a cloud function that simply references `myArray`. As much
as this looks simple and intuitive, the compiler actually had to do a bit of work to make this
happen. As a reminder, a `cloud.Function` represents a cloud compute platform (such as AWS Lambda).
This means that the code inside the `inflight` block is going to be executed sometime in the future,
on some other machine. Completely isolated from the original memory space in which `myArray` was
defined.

Since our array is immutable, the compiler can safely clone it and bundle it together with the code
that runs inside the cloud function.

> In the future, the compiler will be able to identify that `myArray.length` itself is immutable,
> and will only copy its value (see [#1251](https://github.com/winglang/wing/issues/1251)).

If we try to reference a reassignable variable from inflight code:

```js
let var s = "hello";

new cloud.Function(inflight (_: str) => {
  print(s);
  //    ^ Cannot capture a reassignable variable "s"
});
```

If we try to reference a mutable collection from inflight code:

```js
bring cloud;

let myArray = MutArray<num>[1,2,3,4];

new cloud.Function(inflight (_: str) => {
  assert(myArray.length == 4);
  //     ^^^^^^^^ Cannot reference 'myArray' of type 'MutArray<num>' from an inflight context
});
```

In this case as well, the compiler won't allow us to reference a mutable object within an inflight
context, because it won't be able to guarantee correctness.

Unsupported yet, but we will also have `clone()` to cover you in case you want to reference a
snapshot of a mutable collection (`cloneMut()` returns a mutable clone):

```js
let mutArr = MutArray<num>[1,2,3];
let arr = mutArr.clone();

new cloud.Function(inflight () => {
  assert(arr.length == 3);
});
```

> See [this pull request](https://github.com/winglang/wing/pull/1247) if you are curious how
> immutable capturing works in Wing (for the time being).

## What about user-defined types?

In the current revision of the language specification, we still haven't covered the idea of
immutable user-defined types (its on our [roadmap](https://github.com/winglang/wing/issues/1369)).

This means that the compiler only allows capturing primitives, `Array`, `Map`, `Set`, `Json` (coming
soon) and structs (coming soon). Any other type cannot be captured directly. This means you will
likely need to extract any information from the object in order to reference it within an inflight
context.

## Summary

There are endless ways to express ideas using code and we believe a programming language should be
designed to make it intuitive for developers to write better, safer and more robust code. We use
"good cognitive friction" such as `let var` and `MutXxx` to get our brain to spare another cognitive
cycle on choosing some programming approach.

Making Wing "immutable by default" is designed to encourage developers to write more functional and
immutable code. We continue to think of how to do it in elegant, simple, and not annoying ways, and
we would love your feedback and suggestions on [Wing Slack](https://t.winglang.io/slack).

