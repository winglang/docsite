---
title: "Builing a Websockets app with Winglang"
description: A step by step Winglang tutorial for builing serverless websocket applications
authors: 
  - eladcon
tags: [winglang, websockets, application, server side]
hide_table_of_contents: true
---

In this tutorial we're going to use Winglang to build a web based application powered by websockets. We will cover how to build basic resources in Winglang with a special focus on serverless cloud abilities. We will learn how to integrate JS code into our Wing app and
how to test our application end-to-end for our local environment as well as our cloud. 

### A Websocket server

Since Websockets are still not supported natively in Winglang, we will create a websockets resource ourselves. This will allow us to abstract the cloud and its underlying resources, so all of our server logic will be the same no matter where it will run.

First thing first, let's define a wing interface that could help represent websockets support:

```js
pub interface IWebsocketsApi {
  onConnect(fn: inflight (str): void);
  onDisconnect(fn: inflight (str): void);
  onMessage(fn: inflight (str, str): void);
  inflight send(connectionId: str, message: str): void;
  inflight url(): str;
}
```

For each WS event - a client connected, a client disconnected and a message recieved - we are configuring an inflight handler which will accept a connection ID (and additional message) and will allow us to react with our respective application logic. Additionaly, we will implement sending a message to a specific connection. Finally, we want to know the server URL, so client could connect.

#### Local simulation

Now let's implement our interface for a local experience. By developing locally, we wouldn't have to wait for long deployment cycles, our tests will run faster and we will have a better debugging experience. 

Since we can't start a websocket server directly from wing yet, we can use JS code instead:

```js
//
// websockets-api-local.js
//
import { WebSocketServer } from 'ws';

export const startWebSocketApi = (
  onConnect, 
  onDisconnect, 
  onMessage) => {

  const port = Math.floor(Math.random() * 1000 + 3000);
  const wss = new WebSocketServer({ port });
  global.wss = wss;

  wss.on('connection', function connection(ws) {
    ws.id = Date.now().toString().slice(-6);
    ws.on('error', console.error);
    
    ws.on('message', function message(data) {
      onMessage(ws.id, data.toString("utf8"));
    });

    ws.on('close', function () {
      onDisconnect(ws.id);
    });

    onConnect(ws.id);
  });
  
  return {
    close: () => {
      console.log("closing server...");
      wss.close();
    },
    url: () => `ws://127.0.0.1:${port}`
  }
};
```

Note: make sure to install the `ws` NPM library first. 

In this code we export a function which initiates a web server. The function accepts our inflight handlers and calls them when the relevant
events occurs. Note that we set a connection ID on the socket itself so we can interact with those connections later.
Let's add the missing javascript part - sending a message to a connection:

```js
export const sendMessage = (connectionId, message) => {
  let wss = global.wss;
  if (!wss) {
    return;
  }

  wss.clients.forEach((ws) => {
    if (ws.id !== connectionId) {
      return;
    }

    ws.send(message)
  });
}
```

Now, we can write our local implementation and connect our Winglang code to the JS exports using the `extern` keyword:

```js
pub class WebSocketApi_sim impl IWebsocketsApi {
  extern "./websockets-api-local.js" static inflight startWebSocketApi(
    connectFn: inflight (str): void,
    disconnectFn: inflight (str): void,
    onmessageFn: inflight (str, str): void
  ): StartWebSocketApiResult;
  extern "./websockets-api-local.js" static inflight sendMessage(
    connectionId: str,
    message: str,
  ): inflight(): void;
}
```

To start the server we can use the `cloud.Service` resource which will run once the simulator starts:

```js
pub class WebSocketApi_sim impl IWebsocketsApi {
  var connectFn: inflight (str): void;
  var disconnectFn: inflight (str): void;
  var onmessageFn: inflight (str, str): void;
  _url: sim.State;

  init() {
    this.connectFn = inflight () => {};
    this.disconnectFn = inflight () => {};
    this.onmessageFn = inflight () => {};
    this._url = new sim.State();
    new cloud.Service(inflight () => {
      let res = WebSocketApi_sim.startWebSocketApi(this.connectFn, this.disconnectFn, this.onmessageFn);
      this._url.set("service_url", res.url());
      return () => {
        res.close();
      };
    });
  }

  pub onConnect(fn: inflight (str): void) {
    this.connectFn = fn;
  }

  pub onDisconnect(fn: inflight (str): void) {
    this.disconnectFn = fn;
  }

  pub onMessage(fn: inflight (str, str): void) {
    this.onmessageFn = fn;
  }

  extern "./websockets-api-local.js" static inflight startWebSocketApi(
    connectFn: inflight (str): void,
    disconnectFn: inflight (str): void,
    onmessageFn: inflight (str, str): void
  ): StartWebSocketApiResult;
  extern "./websockets-api-local.js" static inflight sendMessage(
    connectionId: str,
    message: str,
  ): inflight(): void;
}
```

We also used the `sim.State` resource which helps us keep track of the server URL even when running code in different contexts (For example, sendaing a message to a connection while reacting to a new bucket item).

#### AWS implementation

To implement Websockets on AWS, we will use an API Gateway backed by 3 lambdas, each reacting to a connection opened/closed or a message recieved event. Winglang provides an out of the box way to define lambdas, and we will use CDKTF to define the rest of the infrastructure and to connect those lambdas to the new resources.

```js
bring "@cdktf/provider-aws" as awsProvider;

pub class WebSocketApi_aws impl IWebsocketsApi {
  api: awsProvider.apigatewayv2Api.Apigatewayv2Api;
  stage: awsProvider.apigatewayv2Stage.Apigatewayv2Stage;
  apiEndpoint: str;
  wsEndpoint: str;
  init() {
    this.api = new awsProvider.apigatewayv2Api.Apigatewayv2Api(
      name: "wing-websocket-tunnels", 
      protocolType: "WEBSOCKET", 
      routeSelectionExpression: "\$request.body.action"
    );

    this.stage = new awsProvider.apigatewayv2Stage.Apigatewayv2Stage(
      apiId: this.api.id,
      name: "prod",
      autoDeploy: true
    );

    this.apiEndpoint = "https://${this.api.id}.execute-api.us-east-1.amazonaws.com/${this.stage.id}";
    this.wsEndpoint = this.stage.invokeUrl;
  }
}
```

Note: make sure to install the `@cdktf/provider-aws` NPM library first. 

Now when someone will create a new `WebSocketApi_aws`, it will also create a new AWS API Gateway. To attach an API Gateway Integration, Route and Lambda to this Gateway, we'll implement a new method called `createRoute`. This method accepts a `cloud.Function` along with route details and will create the additional API Gateway cloud resources:

```js
createRoute(handler: cloud.Function, routeName: str, routeKey: str) {
  let unsafeHandler = unsafeCast(handler);
  let handlerArn: str = unsafeHandler.arn;
  let handlerInvokeArn: str = unsafeHandler.invokeArn;
  let handlerName: str = unsafeHandler.functionName;

  let policy = new awsProvider.iamPolicy.IamPolicy(
    policy: cdktf.Fn.jsonencode({
      Version: "2012-10-17",
      Statement: [
        {
          Action: [
            "lambda:InvokeFunction",
          ],
          Effect: "Allow",
          Resource: handlerArn
        },
      ]
    }),
  ) in handler;

  let role = new awsProvider.iamRole.IamRole(
    assumeRolePolicy: cdktf.Fn.jsonencode({
      Version: "2012-10-17",
      Statement: [
        {
          Action: "sts:AssumeRole",
          Effect: "Allow",
          Sid: "",
          Principal: {
            Service: "apigateway.amazonaws.com"
          }
        },
      ]
    }),
    managedPolicyArns: [policy.arn]
  ) in handler;

  let integration = new awsProvider.apigatewayv2Integration.Apigatewayv2Integration(
    apiId: this.api.id,
    integrationType: "AWS_PROXY",
    integrationUri: handlerInvokeArn,
    credentialsArn: role.arn,
    contentHandlingStrategy: "CONVERT_TO_TEXT",
    passthroughBehavior: "WHEN_NO_MATCH",
  ) in handler;

  new awsProvider.apigatewayv2IntegrationResponse.Apigatewayv2IntegrationResponse(
    apiId: this.api.id,
    integrationId: integration.id,
    integrationResponseKey: "/200/"
  ) in handler;

  let route = new awsProvider.apigatewayv2Route.Apigatewayv2Route(
    apiId: this.api.id,
    routeKey: routeKey,
    target: "integrations/${integration.id}"
  ) in handler;

  new awsProvider.apigatewayv2RouteResponse.Apigatewayv2RouteResponse(
    apiId: this.api.id,
    routeId: route.id,
    routeResponseKey: "\$default",
  ) in handler;

  new awsProvider.lambdaPermission.LambdaPermission(
    statementId: "AllowExecutionFromAPIGateway",
    action: "lambda:InvokeFunction",
    functionName: handlerName,
    principal: "apigateway.amazonaws.com",
    sourceArn: "${this.api.executionArn}/*/*"
  ) in handler;
}
```

Now we can use that function to implement our Websockets interface. For example, the `onConnect` method can look like this:

```js
pub onConnect(fn: inflight (str): void) {
  let handler = new cloud.Function(inflight (event: WebSocketRequest): void => {
    if event.requestContext.routeKey == "\$connect" {
      fn(event.requestContext.connectionId);
    }
  }) as "connect function";

  this.createRoute(handler, "connect", "\$connect");
}
```

Note that we created a custom struct (`WebSocketRequest`) with additional context which is provided by AWS to handle the requests:

```js
struct WebSocketRequestContext {
  routeKey: str;
  eventType: str;
  connectionId: str;
}

struct WebSocketRequest {
  requestContext: WebSocketRequestContext;
  body: str;
}
```

For any cloud resource we create, we also have to make sure we are giving it the right set of permssions. Anyone who wants to call `send` wiil have to have access to our API Gateway. In Winglang we can do it straight from our class code by implementing the `onLift` method:

```js
pub onLift(host: std.IInflightHost, ops: Array<str>) {
  if let host = aws.Function.from(host) {
    if ops.contains("send") {
      host.addPolicyStatements(aws.PolicyStatement {
        actions: ["execute-api:*"],
        resources: ["${this.api.executionArn}/*"],
        effect: aws.Effect.ALLOW,
      });
    }
  }
}
```

#### A proxy for the abstraction

We now can create a class which will instantiate the right implementation based on the current target we are compiling for. This class will forward all of the request to the underlying resource:

```js
pub class WebSocketApi impl IWebsocketsApi {
  api: IWebsocketsApi;
  init() {
    let target = util.env("WING_TARGET");

    if target == "sim" {
      this.api = new WebSocketApi_sim();
    } elif target == "tf-aws" {
      this.api = new WebSocketApi_aws();
    } else {
      throw "unsupported target ${target}";
    }
  }

  pub onConnect(fn: inflight (str): void) {
    this.api.onConnect(fn);
  }

  pub onDisconnect(fn: inflight (str): void) {
    this.api.onDisconnect(fn);
  }

  pub onMessage(fn: inflight (str, str): void) {
    this.api.onMessage(fn);
  }

  pub inflight send(connectionId: str, message: str) {
    this.api.send(connectionId, message);
  }

  pub inflight url(): str {
    return this.api.url();
  }
}
```

### The application logic

So far we covered a generic serverless Websocket server written in Winglang. Those set of resources will be used by our application but they can also be reused for every future app in case we'll need Websockets or even be exported as a Wing library for others to use. 

Our application is a simple client app which will broadcast messages to other clients that are connected to the server.
First thing we need to do is keep track of all the clients in our system. To do that, we can use the `ex.Table` resource. Here is how we can integrate the two resources:

```js
let connections = new ex.Table(name: "connections", primaryKey: "connectionId", columns: {
  connectionId: ex.ColumnType.STRING
});
let wss = new WebSocketApi();
wss.onConnect(inflight (connectionId: str) => {
  connections.insert(connectionId, {});
});
wss.onDisconnect(inflight (connectionId: str) => {
  connections.delete(connectionId);
});
wss.onMessage(inflight (connectionId: str, message: str) => {
  for connection in connections.list() {
    let currentConnectionId = connection.get("connectionId").asStr();
    if (currentConnectionId != connectionId) {
      wss.send(currentConnectionId, message);
    }
  }
});
```

Now we can create a JS code that will act as our client:

```js
const WebSocket = require("ws");
module.exports.initWebsocket = (url) => {
  const ws = new WebSocket(url);
  const messages = [];
  ws.onmessage = async function(data) {
    const msg = data.data;
    messages.push(msg);
    console.log('Message recieved: ' + msg);
  }

  return {
    send() {
      ws.send(data);
    },
    messages() {
      return messages;
    }
  }
}
```

### Making sure it all work together

With all of our application code ready, we can create a Wing Test to verify everything works on every platform we are running on:

```js
interface WebsocketTestClient {
  inflight send(message: str);
  inflight messages(): Array<str>;
}

class Util {
  extern "./websockets-client.js" pub static inflight initWebsocket(
    url: str,
  ): WebsocketTestClient; 
}

test "can send and recieve messages" {
  let client1 = Util.initWebsocket(wss.url());
  let client2 = Util.initWebsocket(wss.url());

  // wait for clients to connect
  util.waitUntil(inflight () => {
    return connections.list().length == 2;
  }, timeout: 5s);

  client1.send("hello");

  util.waitUntil(inflight () => {
    return client2.messages().length > 0;
  }, timeout: 3s);

  assert(client2.messages().length == 1);
  assert(client2.messages().at(0) == "hello");
}
```

## Summary

In this tutorial we have created a full Websockets server ready to be deployed on the cloud but can also be debugged and tested locally. We created all of our infrastructure straight from our code which also seamlessly include our custom logic.

Winglang is stil growing as a language and it's eco system is developing rapidly. Make sure to follow us on https://winglang.io. 
