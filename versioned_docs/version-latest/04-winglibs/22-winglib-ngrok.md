---
title: ngrok
id: ngrok
sidebar_label: ngrok (winglib)
description:  Wing library for [ngrok](https://ngrok.com/). Create local tunnels to Wing endpoints.
keywords: [winglib, Wing library]
---
This library can be used to create an [ngrok](https://ngrok.com) tunnel for local development that
forwards HTTP requests to a localhost endpoint.

When compiled to the cloud, this resource is a no-op.

## Prerequisites

* [winglang](https://winglang.io).
* An [ngrok account](https://ngrok.com).
* `NGROK_AUTHTOKEN` should include the auth token for your ngrok user.

## Installation

```sh
npm i @winglibs/ngrok
```

## Usage

Let's forward all requests that are sent to `eladb.ngrok.dev` to our `cloud.Api`.

```js
bring ngrok;

let api = new cloud.Api();

api.get("/", inflight () => {
  return {
    status: 200,
    body: "hello ngrok!"
  };
});

let t = new ngrok.Tunnel(api.url, 
  domain: "eladb.ngrok.dev",

  // optional callback
  onConnect: inflight (url: str) => {
    log("connected to {url}");
  },
);

// you can add listeners
t.onConnect(inflight (url) => {
  log("url: {url}");
});

new cloud.Function(inflight () => {
  log("tunnel connected to {t.url}");
});
```

Once a tunnel is initialized, if an `onConnect` callback is set, it will be called with the external
URL of the tunnel. You can use this hook, for example, to update a webhook URL with a dynamic ngrok
endpoint.

## Maintainers

- [@eladb](https://github.com/eladb)

## License

This library is licensed under the [MIT License](./LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/ngrok.Tunnel">Tunnel</a>
- **Interfaces**
  - <a href="#@winglibs/ngrok.OnConnectHandler">OnConnectHandler</a>
- **Structs**
  - <a href="#@winglibs/ngrok.NgrokProps">NgrokProps</a>

### Tunnel (preflight class) <a class="wing-docs-anchor" id="@winglibs/ngrok.Tunnel"></a>

*No description*

#### Constructor

```
new(url: str, props: NgrokProps?): Tunnel
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>onConnect(handler: inflight (str): void): void</code> | *No description* |

### OnConnectHandler (interface) <a class="wing-docs-anchor" id="@winglibs/ngrok.OnConnectHandler"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight handle(url: str): void</code> | *No description* |

### NgrokProps (struct) <a class="wing-docs-anchor" id="@winglibs/ngrok.NgrokProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>domain</code> | <code>str?</code> | *No description* |
| <code>onConnect</code> | <code>(inflight (str): void)?</code> | *No description* |


