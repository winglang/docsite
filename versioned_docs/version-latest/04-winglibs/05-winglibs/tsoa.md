---
title: tsoa
id: tsoa
sidebar_label: tsoa
description:  A Wing library for working with [TSOA](https://tsoa-community.github.io/docs/) - An OpenAPI-compliant Web APIs using TypeScript.
keywords: [winglib, Wing library]
---
# tsoa

A Wing library for working with [TSOA](https://tsoa-community.github.io/docs/) - An OpenAPI-compliant Web APIs using TypeScript.

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/tsoa
```

## Usage

```js
// main.w
bring tsoa;

let service = new tsoa.Service(
  controllerPathGlobs: ["./src/*Controller.ts"],
  outputDirectory: "../build",
  routesDir: "../build"
);
```

It is also possible to use Wing resources from the TS code

```js
let bucket = new cloud.Bucket();
service.lift(bucket, id: "bucket", allow: ["put"]);
```

```ts
// someController.ts ...
import { lifted } from "@winglibs/tsoa/clients.js";

@Get("{userId}")
public async getUser(
  @Path() userId: number,
  @Request() request: Req,
  @Query() name?: string,
): Promise<User> {
  let bucket = lifted("bucket");
  await bucket.put(userId.toString(), name ?? "not-a-name");

  return  {
    id :userId,
    name: name ?? "not-a-name",
    status: "Happy",
    email:"email",
    phoneNumbers: ["a"]
  }
}
```

## Roadmap

- [x] Support `sim` platform
- [ ] Add Console support for http client (depends on https://github.com/winglang/wing/issues/6131) 
- [x] Support `tf-aws` platform using [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
- [ ] Support `gcp` platform using [GCP Api Gateway](https://cloud.google.com/api-gateway)

## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/tsoa.Service_tfaws">Service_tfaws</a>
  - <a href="#@winglibs/tsoa.Service_sim">Service_sim</a>
  - <a href="#@winglibs/tsoa.Service">Service</a>
- **Interfaces**
  - <a href="#@winglibs/tsoa.IService">IService</a>
- **Structs**
  - <a href="#@winglibs/tsoa.LiftOptions">LiftOptions</a>
  - <a href="#@winglibs/tsoa.ServiceProps">ServiceProps</a>
  - <a href="#@winglibs/tsoa.SpecProps">SpecProps</a>
  - <a href="#@winglibs/tsoa.StartServiceOptions">StartServiceOptions</a>

<h3 id="@winglibs/tsoa.Service_tfaws">Service_tfaws (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ServiceProps): Service_tfaws
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>specFile</code> | <code>str</code> | *No description* |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>lift(client: Resource, ops: LiftOptions): void</code> | *No description* |

<h3 id="@winglibs/tsoa.Service_sim">Service_sim (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ServiceProps): Service_sim
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>specFile</code> | <code>str</code> | *No description* |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>lift(client: Resource, ops: LiftOptions): void</code> | *No description* |

<h3 id="@winglibs/tsoa.Service">Service (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ServiceProps): Service
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>specFile</code> | <code>str</code> | *No description* |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>lift(client: Resource, ops: LiftOptions): void</code> | *No description* |

<h3 id="@winglibs/tsoa.IService">IService (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>lift(client: Resource, ops: LiftOptions): void</code> | *No description* |

<h3 id="@winglibs/tsoa.LiftOptions">LiftOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>allow</code> | <code>Array<str></code> | *No description* |
| <code>id</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/tsoa.ServiceProps">ServiceProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>controllerPathGlobs</code> | <code>Array<str></code> | *No description* |
| <code>entryFile</code> | <code>str?</code> | *No description* |
| <code>outputDirectory</code> | <code>str</code> | *No description* |
| <code>routesDir</code> | <code>str</code> | *No description* |
| <code>spec</code> | <code>SpecProps?</code> | *No description* |
| <code>watchDir</code> | <code>str?</code> | *No description* |

<h3 id="@winglibs/tsoa.SpecProps">SpecProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>outputDirectory</code> | <code>str?</code> | *No description* |
| <code>specVersion</code> | <code>num?</code> | *No description* |

<h3 id="@winglibs/tsoa.StartServiceOptions">StartServiceOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>basedir</code> | <code>str</code> | *No description* |
| <code>clients</code> | <code>Map<Resource></code> | *No description* |
| <code>currentdir</code> | <code>str</code> | *No description* |
| <code>homeEnv</code> | <code>str</code> | *No description* |
| <code>lastPort</code> | <code>str?</code> | *No description* |
| <code>options</code> | <code>ServiceProps</code> | *No description* |
| <code>pathEnv</code> | <code>str</code> | *No description* |
| <code>workdir</code> | <code>str</code> | *No description* |


