---
title: WebSocket
id: websockets
sidebar_label: WebSocket
description:  A Wing library that enables you to create WebSockets using Wing.
keywords: [winglib, Wing library]
---
# Websockets

This library enables you to create WebSockets using Wing.

WebSockets offer a persistent, bidirectional communication channel between a client and a server, facilitating real-time, low-latency communication.

By incorporating WebSockets through the Wing library, developers can enhance the interactivity and responsiveness of their applications, delivering a more engaging user experience. Whether you're building a real-time chat application or a collaborative tool, understanding and implementing WebSockets with Wing can significantly elevate your web development projects.

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/websockets
```

## Usage

The example above shows us how we can broadcast a message to any connection assigned to the WebSocket.

```js
bring cloud;
bring ex;
bring websockets;

let tb = new ex.DynamodbTable(
  name: "WebSocketTable",
  hashKey: "connectionId",
  attributeDefinitions: {
    "connectionId": "S",
  },
);

let wb = new websockets.WebSocket(name: "MyWebSocket") as "my-websocket";

wb.onConnect(inflight(id: str): void => {
  tb.putItem({
    item: {
      "connectionId": id
    }
  });
});

wb.onDisconnect(inflight(id: str): void => {
  tb.deleteItem({
    key: {
      "connectionId": id
    }
  });
});

wb.onMessage(inflight (id: str, body: str): void => {
  let connections = tb.scan();
  for item in connections.items {
    wb.sendMessage(str.fromJson(item["connectionId"]), body);
  }
});

```

## `sim`

When executing in the Wing Simulator, the WebSocket uses the `ws` library.

## `tf-aws`

When running on AWS, the WebSocket utilizes the WebSocket API of API Gateway.

## `awscdk`

When running on AWS, the WebSocket utilizes the WebSocket API of API Gateway.
To compile to `awscdk`, we need to import the `@winglang/platform-awscdk`.


## Maintainers

[@marciocadev](https://github.com/marciocadev)

## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/websockets.WebSocket">WebSocket</a>
  - <a href="#@winglibs/websockets.platform.WebSocket_tfaws">platform.WebSocket_tfaws</a>
  - <a href="#@winglibs/websockets.platform.WebSocket_sim">platform.WebSocket_sim</a>
  - <a href="#@winglibs/websockets.platform.WebSocket_awscdk">platform.WebSocket_awscdk</a>
- **Interfaces**
  - <a href="#@winglibs/websockets.platform.aws.IAwsWebSocket">platform.aws.IAwsWebSocket</a>
  - <a href="#@winglibs/websockets.commons.IWebSocket">commons.IWebSocket</a>
- **Structs**
  - <a href="#@winglibs/websockets.platform.aws.WebSocketAwsRequest">platform.aws.WebSocketAwsRequest</a>
  - <a href="#@winglibs/websockets.platform.aws.WebSocketAwsRequestContext">platform.aws.WebSocketAwsRequestContext</a>
  - <a href="#@winglibs/websockets.platform.aws.WebSocketAwsResponse">platform.aws.WebSocketAwsResponse</a>
  - <a href="#@winglibs/websockets.commons.WebSocketProps">commons.WebSocketProps</a>

<h3 id="@winglibs/websockets.WebSocket">WebSocket (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: WebSocketProps): WebSocket
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>onConnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onDisconnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onMessage(handler: inflight (str, str): void): void</code> | *No description* |
| <code>inflight sendMessage(connectionId: str, message: str): void</code> | *No description* |

<h3 id="@winglibs/websockets.platform.WebSocket_tfaws">platform.WebSocket_tfaws (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: WebSocketProps): WebSocket_tfaws
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>addRoute(handler: Function, routeKey: str): void</code> | *No description* |
| <code>onConnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onDisconnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onMessage(handler: inflight (str, str): void): void</code> | *No description* |
| <code>inflight sendMessage(connectionId: str, message: str): void</code> | *No description* |

<h3 id="@winglibs/websockets.platform.WebSocket_sim">platform.WebSocket_sim (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: WebSocketProps): WebSocket_sim
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>onConnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onDisconnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onMessage(handler: inflight (str, str): void): void</code> | *No description* |
| <code>inflight sendMessage(connectionId: str, message: str): void</code> | *No description* |

<h3 id="@winglibs/websockets.platform.WebSocket_awscdk">platform.WebSocket_awscdk (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: WebSocketProps): WebSocket_awscdk
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>addRoute(handler: Function, routeKey: str): void</code> | *No description* |
| <code>onConnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onDisconnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onMessage(handler: inflight (str, str): void): void</code> | *No description* |
| <code>inflight sendMessage(connectionId: str, message: str): void</code> | *No description* |

<h3 id="@winglibs/websockets.platform.aws.IAwsWebSocket">platform.aws.IAwsWebSocket (interface)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>node</code> | <code>Node</code> | The tree node. |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>addRoute(handler: Function, routeKey: str): void</code> | *No description* |
| <code>onConnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onDisconnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onMessage(handler: inflight (str, str): void): void</code> | *No description* |
| <code>inflight sendMessage(connectionId: str, message: str): void</code> | *No description* |

<h3 id="@winglibs/websockets.commons.IWebSocket">commons.IWebSocket (interface)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>node</code> | <code>Node</code> | The tree node. |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>onConnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onDisconnect(handler: inflight (str): void): void</code> | *No description* |
| <code>onMessage(handler: inflight (str, str): void): void</code> | *No description* |
| <code>inflight sendMessage(connectionId: str, message: str): void</code> | *No description* |

<h3 id="@winglibs/websockets.platform.aws.WebSocketAwsRequest">platform.aws.WebSocketAwsRequest (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>body</code> | <code>str</code> | *No description* |
| <code>requestContext</code> | <code>WebSocketAwsRequestContext</code> | *No description* |

<h3 id="@winglibs/websockets.platform.aws.WebSocketAwsRequestContext">platform.aws.WebSocketAwsRequestContext (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>connectionId</code> | <code>str</code> | *No description* |
| <code>routeKey</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/websockets.platform.aws.WebSocketAwsResponse">platform.aws.WebSocketAwsResponse (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>body</code> | <code>str?</code> | *No description* |
| <code>statusCode</code> | <code>num</code> | *No description* |

<h3 id="@winglibs/websockets.commons.WebSocketProps">commons.WebSocketProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>name</code> | <code>str</code> | *No description* |
| <code>stageName</code> | <code>str?</code> | *No description* |


