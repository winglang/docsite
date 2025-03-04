---
title: HTTP Server
id: http-server
slug: /http-server
sidebar_label: HTTP Server
description: Directories
keywords: [Wing language, HTTP]
image: /img/wing-by-example.png
custom_edit_url: https://github.com/winglang/wing/blob/main/docs/by-example/34-http-server.md
---

You can create HTTP servers using the [cloud.Api](/docs/api/standard-library/cloud/api) standard library.

This example shows an example of using an API with a GET and PUT endpoint that interacts with a bucket.


```js playground example title="main.w"
bring cloud;
bring http;

let noteBucket = new cloud.Bucket();

let api = new cloud.Api();

api.get("/note", inflight (request) => {
  let noteName = request.query.get("name"); 
  let note = noteBucket.get(noteName);

  return {
    status: 200,
    body: note
  };
});

api.put("/note/:name", inflight (request) => {
  let note = request.body;
  let noteName = request.vars.get("name");

  if (note == "") {
    return {
      status: 400,
      body: "note is required"
    };
  }

  noteBucket.put(noteName, note ?? "");
  // handler implicitly returns `status: 200` by default
});

// Consumer functions (not required for the app to work, but useful for testing)
new cloud.Function(inflight (event: Json?) => {
  if let event = event {
    let parts = event.asStr().split(":");
    let name = parts.at(0);
    let note = parts.at(1);

    let response = http.put("{api.url}/note/{name}", {
      body: "{note}"
    });
    return response.body;
  }

  return "event is required `NAME:NOTE`";
}) as "Consumer-PUT";

new cloud.Function(inflight (event: Json?) => {
  if let event = event {
    return http.get("{api.url}/note?name={event}").body;
  }

  return "event is required `NAME`";
}) as "Consumer-GET";
```

## API Gateway

### Creating routes

Defining a new API with routes.

```js playground example
bring cloud;

let api = new cloud.Api();

api.get("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello GET"
    };
});
api.post("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello POST"
    };
});
api.put("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200, body:
      "Hello PUT"
    };
});
api.delete("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello DELETE"
    };
});
```

### Path parameters 

Using path parameters with your API routes.

```js playground example
bring cloud;

let api = new cloud.Api();

api.get("/items/:id/:value", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  let itemValue = req.vars.get("value");
  log("Received itemId:{itemId}, itemValue:{itemValue}");
  return cloud.ApiResponse {
    status: 200,
    body: "Received itemId:{itemId}, itemValue:{itemValue}"
  };
});

```

### Json body

Parsing request body as Json.

```js playground example
bring cloud;

let api = new cloud.Api();

api.put("/items/:id", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  if let itemBody = Json.tryParse(req.body ?? "") {    
    return cloud.ApiResponse {
        status: 200,
        body: "Received id {itemId} with body {itemBody}"
    };
  }
  return cloud.ApiResponse {
      status: 400,
      body: "Missing body"
  };
});
``` 



