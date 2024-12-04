---
title: First Wing application
id: first-wing-app
slug: /first-wing-app
keywords: [Wing]
---

# Creating the Hello World API

What we will do now is create our first API. This API will:

- Have a GET route to return information from storage (bucket)
- Have a POST route to store data into a storage (bucket)
- Have a health endpoint for our API.

### 1. Creating an API and a bucket

The first step is to create a new [API](http://localhost:3000/docs/guide/cloud-primitives#-apis) and [Bucket](http://localhost:3000/docs/guide/cloud-primitives#%EF%B8%8F-storage) in your Wing application.

This is done using the [Wing Cloud Library](/docs/api/category/cloud).

```js
bring cloud;

// Create the API
let api = new cloud.Api();

// Create the storage
let storage = new cloud.Bucket();
```


:::info What is the Wing Cloud Library?  
The Wing Cloud Library provides a collection of cloud primitives that you can use in your applications.  
These primitives include APIs, buckets, functions, queues, and more. Learn more about them [here](/docs/api/category/cloud).  
:::

Let's add a simple endpoint on our API that returns some static data.

```js
bring cloud;

let api = new cloud.Api();
let storage = new cloud.Bucket();

api.get("/hello", inflight() => {
  return cloud.ApiResponse {
    status: 200,
    body: "world"
  };
});
```


## Putting it all together