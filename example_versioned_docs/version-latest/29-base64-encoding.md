---
title: Base64 Encoding
id: base64-encoding
slug: /base64-encoding
sidebar_label: 29. Base64 Encoding
description: Encode and decode Base64 values
keywords: [Wing language, Base64]
---

```js playground example title="main.w"
bring util;

let data = "abc123!?$*&()'-=@~";

let encoded = util.base64Encode(data);
log(encoded);


let decoded = util.base64Decode(encoded);
log(decoded);
```

```bash title="Wing console output"
# Run locally with wing console
YWJjMTIzIT8kKiYoKSctPUB+
abc123!?$*&()'-=@~
```




