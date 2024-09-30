---
title: Momento
id: momento
sidebar_label: Momento
description:  Wing library for [momento](https://www.gomomento.com/)
keywords: [winglib, Wing library]
---
## Prerequisites

* [winglang](https://winglang.io)
* [Momento](https://www.gomomento.com/) account and API key (see [Getting started with Momento](https://docs.momentohq.com/cache/getting-started))

## Installation

```sh
npm i @winglibs/momento
```

## Usage

```js
bring cloud;
bring momento;

let token = new cloud.Secret("momento-key");
let cache = new momento.Cache(token: token);

new cloud.Function(inflight () => {
  cache.set("key", "value");
  log(cache.get("key"));
});
```

To deploy an application with Momento resources using Terraform, you will need to set the MOMENTO_API_KEY environment variable to a valid super-user API key on the machine running `terraform apply`.

You will also need a valid Momento token (super-user token or fine-grained access token) with permissions for performing any data operations on the cache(s) that can be used by the application.
You can set the secret by running `wing secrets -t tf-aws main.w`.
You are responsible for rotating the secret as needed.

See the [Momento documentation](https://docs.momentohq.com/cache/develop/authentication/api-keys) for more information about creating API keys.

## License

This library is licensed under the [MIT License](./LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/momento.Cache">Cache</a>
- **Interfaces**
  - <a href="#@winglibs/momento.ICache">ICache</a>
- **Structs**
  - <a href="#@winglibs/momento.CacheGetOptions">CacheGetOptions</a>
  - <a href="#@winglibs/momento.CacheProps">CacheProps</a>
  - <a href="#@winglibs/momento.CacheSetOptions">CacheSetOptions</a>

### Cache (preflight class) <a class="wing-docs-anchor" id="@winglibs/momento.Cache"></a>

*No description*

#### Constructor

```
new(props: CacheProps): Cache
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight get(key: str): str?</code> | *No description* |
| <code>inflight set(key: str, value: str, opts: CacheSetOptions?): void</code> | *No description* |

### ICache (interface) <a class="wing-docs-anchor" id="@winglibs/momento.ICache"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight get(key: str, opts: CacheGetOptions?): str?</code> | Get a value from the cache. |
| <code>inflight set(key: str, value: str, opts: CacheSetOptions?): void</code> | Set a value in the cache. |

### CacheGetOptions (struct) <a class="wing-docs-anchor" id="@winglibs/momento.CacheGetOptions"></a>

*No description*

#### Properties

*No properties*

### CacheProps (struct) <a class="wing-docs-anchor" id="@winglibs/momento.CacheProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>defaultTtl</code> | <code>duration?</code> | The default time-to-live for cache entries. @default 60 |
| <code>name</code> | <code>str?</code> | The name of the cache. @default - a unique id will be generated |
| <code>token</code> | <code>Secret</code> | A secret containing the Momento API key to use for accessing the cache at runtime. |

### CacheSetOptions (struct) <a class="wing-docs-anchor" id="@winglibs/momento.CacheSetOptions"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>ttl</code> | <code>duration?</code> | The time-to-live for the cache entry, in seconds. @default 60s |


