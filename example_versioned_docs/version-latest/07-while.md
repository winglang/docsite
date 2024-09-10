---
title: While
id: while
slug: /while
sidebar_label: 7. While
description: Using while statements with Wing
keywords: [Wing language, example]
---

```js playground title="main.w"
let var i = 0;

while(i < 2){
  log("while {i}");
  i = i + 1;
}
```

```bash title="Wing console output"
# Run locally with wing console
wing it

while 0
while 1
```