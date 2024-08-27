---
title: Structs
id: structs
slug: /structs
sidebar_label: 10. Structs
description: Using arrays with Wing
keywords: [Wing language, example]
---

Structs are loosely modeled after typed JSON literals in JavaScript.

```js playground example title="main.w"
let main = () => {

  let a = MutArray<num>[1, 2, 3];

  log("{a[0]}, {a[1]}, {a[2]}");

  a[2] = 4;

  log("mutated value: {a[2]}");
  log("len: {a.length}");

  let data = MutArray<num>[1, 2, 3];
  let twoD = MutArray<MutArray<num>>[data];

  for array in twoD {
    for item in array {
      log(item * 10);
    }
  } 

}

```

```bash title="Wing console output"
# Run locally with wing console
wing it

1, 2, 3
mutated value: 4
len: 3
10
20
30
```