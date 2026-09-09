---
title: First Wing application
id: first-wing-app
slug: /first-wing-app
keywords: [Wing]
---

# Creating a Notes API

In this section we will create an API that stores and fetches data from some storage.

By the end of this section you will:

- Be familiar with the [Wing Cloud Library](/docs/api/category/cloud)
- Understand [Preflight and Inflight](/docs/concepts/inflights) with Wing
- Develop your first Wing application and run it locally

## Creating the Notes API

In this section we will create a **Notes API**. The API will consists of the following endpoints:

- `POST /nodes`: Add a new note to the bucket. Each note will have a unique ID and some text content
- `GET /notes/{id}`: Retrieve a specific note by its ID.

### Gaining an understanding

Wing may have some new concepts you have to learn, so let's dive into a basic example and walk through what is happening.

```js {1,4-4,7-12} showLineNumbers
bring cloud;

// Create a new API using the Wing Cloud Library
let api = new cloud.Api();

// GET /notes returns dummy data
api.get("/notes", inflight () => {
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify([{id: 1, content: "Hello world"}])
  };
});
```

<div class="bg-wing/20 border border-white w-full">
  <h3 class="text-white bg-wing/20 w-full p-2">Understanding the code</h3>
  <div class="px-2 pb-2">

The first thing we do is bring The [Wing Cloud Library](/docs/api/category/cloud) to our application. We do this using the `bring` keyword.

```js
bring cloud;
```

The Cloud Library provides a list of cloud resources. Each resource you use has a set of [preflight and inflight APIs](/docs/concepts/inflights).

<hr class="bg-wing/20" />

Next, we create the new API resource. We do this by defining a new api using the Cloud Library.

```js
// Create a new API using the Wing Cloud Library (preflight code)
let api = new cloud.Api();
```

The API is defined and now we can add routes to it. The API is defined within the `preflight` context.

:::info What is preflight?
Preflight code runs once, at compile time, and defined your application's infrastructure configuration. This configuration is then consumed by an infrastructure provisioning engine such as Terraform, CloudFormation, Pulumi or Kubernetes.

You can read more about [preflight here](/docs/concepts/inflights#preflight-code).
:::

<hr class="bg-wing/20" />

Finally we add the `GET /notes` route to our API. 

```js
// GET /notes returns dummy data
api.get("/notes", inflight () => {
  // inflight code
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify([{id: 1, content: "Hello world"}])
  };
});
```

Using the `API` preflight api, we can attach a new `GET` path to our API. Here we add `/notes` to the API.

We defined an `inflight` function that is called when the route gets triggered.

:::info What is inflight?
Inflight blocks are where you write asynchronous runtime code that can directly interact with resources through their inflight APIs. Inflight functions can be easily packaged and executed onto compute platforms like containers, CI/CD pipelines or FaaS.

You can read more about [inflight here](/docs/concepts/inflights#inflight-code).
:::


  </div>


</div>

## Creating the notes API

## Putting it all together
