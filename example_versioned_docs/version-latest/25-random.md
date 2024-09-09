---
title: Random
id: random
slug: /random
sidebar_label: 25. Random
description: Create random values in Wing
keywords: [Wing language, random]
---

```js playground example title="main.w"
bring math;

log(math.random(100));

log(math.ceil(math.random(100)));

log((math.random()*5)+5);

```

```bash title="Wing console output"
# Run locally with wing console, output will vary
46.58171364582826
4
5.721934646951212
```




