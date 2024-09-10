---
title: HTTP Client
id: http-client
slug: /http-client
sidebar_label: 33. HTTP Client
description: Directories
keywords: [Wing language, HTTP]
---

The Wing standard library comes with [HTTP support](/docs/api/standard-library/http/api-reference).

In this example we’ll use it to issue a simple HTTP request.

```js playground example title="main.w"
bring http;
bring cloud;

struct Pokemon {
  id: str;
  name: str;
  order: num;
  weight: num;
}

new cloud.Function(inflight () => {
  let x = http.get("https://pokeapi.co/api/v2/pokemon/ditto");

  // response status
  log(x.status);

  // Cast response back into struct
  let ditto = Pokemon.fromJson(x.body);
  log(ditto.name);

});
```

```bash title="Wing console output"
# Run locally with wing console
No directory found
```




