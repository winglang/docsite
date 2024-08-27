---
title: Variables
id: Variables
slug: /Variables
sidebar_label: 4. Variables
description: Using variables with Wing
keywords: [Wing language, example]
---

Wing has various value types including strings, integers, floats, booleans, etc. Here are a few basic examples.

- Strings, which can be added together with +
- Integers and floats
- Booleans, with boolean operators as you'd expect

```js title="main.w"
let main = () => {

  // var delcares a varaible. Wing infers the type
  let a = "initial";
  log(a);


  // type can also be declared
  let b: num = 1;
  let c: num = 2;
  log("{b}, {c}");

  // variables cannot be changed using let without var
  let d: str = "Hello";
  // d = "Test"; // error: Variable is not reassignable

  // makes variable mutable
  let var s = "hello";
  s = "hello world"; // compiles
  log(s);

};

main();

```

```bash title="Wing console output"
# Run locally with wing console
wing it

initial
1, 2
hello world
```