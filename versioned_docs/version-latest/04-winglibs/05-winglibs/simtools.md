---
title: Wing simulator utils
id: simtools
sidebar_label: Wing simulator utils
description:  '[Wing simulator](https://www.winglang.io/docs/platforms/sim) utility library'
keywords: [winglib, Wing library]
---
# simtools

This library is a set of tools that are supposed to make the user of the simulator a happier developer. 

For the time being, it contains only one function, `addMacro()`.

## Using `addMacro`

This function adds a Macro into the target resource's interaction pane in Wing Console.
Every macro that is added is seen as a button on the right side panel.

The following code:
```wing
bring cloud;
bring simtools;

let bucket = new cloud.Bucket();

simtools.addMacro(bucket, "Clean", inflight () => {
  for i in bucket.list() {
    bucket.delete(i);
  }
});

simtools.addMacro(bucket, "Populate",  inflight () => {
 for i in 1..10 {
  bucket.put("{i}.txt", "This is {i}");
 }
});
```

Will create two buttons on the Bucket resource on the right side panel:
* Clean
* Populate





## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/simtools
```


## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/simtools.Util">Util</a>

<h3 id="@winglibs/simtools.Util">Util (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): Util
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static addMacro(target: IResource, name: str, fn: inflight (): void): void</code> | *No description* |


