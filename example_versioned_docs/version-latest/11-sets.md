---
title: Sets
id: sets
slug: /sets
sidebar_label: 11. Sets
description: Using sets with Wing
keywords: [Wing language, example]
---

Sets are immutable by default `Set<T>`, you can make them immutable using `<MutSet<T>>`.

Sets will store and return unique values.

```js playground example title="main.w"
// mutable set
let unqiueNumbers = MutSet<num>[1, 2, 3, 3, 3];
unqiueNumbers.add(4);
unqiueNumbers.delete(1);

// immutable set, will make values unique
let uniqueStrings = Set<str>["unique", "values", "values"];


log(Json.stringify(unqiueNumbers.toArray()));
log(Json.stringify(unqiueNumbers.size));

log(Json.stringify(uniqueStrings.toArray()));
```

```bash title="Wing console output"
# Run locally with wing console
wing it

[2,3,4]
3
["unique", "values"]
```