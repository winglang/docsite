---
title: For
id: for
slug: /for
sidebar_label: 5. For
description: Using for loops with Wing
keywords: [Wing language, example]
---

Wing supports for..in statements.

[for..in](/docs/api/language-reference#26-for) is used to iterate over an array, a set or a range. The loop invariant in for loops is implicitly re-assignable (var).

```js playground title="main.w"
let main = () => {

  // a standard for loop
  for item in 1..3 {
    log(item);
  }

  // for-in with arrays
  let arr = [1, 2, 3];
  for item in arr {
    log("{item}");
  }

  // break a loop
  let items = Set<num>[1, 2, 3];
  for item in items {
    if(item == 1){
      break;
    }
    log(item);
  }

  // continue the next iteration of the loop
  for item in 1..10 {
    if(item%2 == 0){
      continue;
    }
    log(item);
  }

};

main();

```

```bash title="Wing console output"
# Run locally with wing console
wing it

1
2
1
2
3
1
3
5
7
9
```