---
title: Wing by example
id: hello-world
slug: /hello-world
sidebar_label: 1. Hello world
description: Hello world wing example
keywords: [Wing language, example]
---

# Hello world


```js playground title="main.w"
let main = () => {
  log("Hello world!");
};

main();
```

```bash title="Wing console output"
# Run locally with wing console
wing it

Hello world!
```
