---
title: Redis
id: redis
sidebar_label: Redis (winglib)
description:  A Wing library for [Redis](https://redis.io/)
keywords: [winglib, Wing library]
---
This library provides a Wing client for Redis.

## Installation

Use `npm` to install this library:

```sh
npm i @winglibs/redis
```

## Bring it

The `redis.Redis` resource represents a Redis client.

```js
bring redis;

let redis  = new redis.Redis();

new cloud.Function(inflight () => {
    redis.set("mykey", "myvalue");
});
```

## Use it

The `redis.Redis` resource provides the following inflight methods:

* `get` - Gets a value from the Redis server.
* `set` - Sets a value on the Redis server.
* `del` - Deletes a value from the Redis server.
* `hGet` - Gets a value from a hash on the Redis server.
* `hSet` - Sets a value on a hash on the Redis server.
* `sAdd` - Adds a value to a set on the Redis server.
* `sMembers` - Gets all members of a set on the Redis server.


## `sim`

When executed in the Wing Simulator, a Redis server is started within a local Docker container.

## `tf-aws`

Coming soon.

## Roadmap

* [x] Support for the Wing Simulator
* [ ] Support for AWS
* [ ] Support for GCP
* [ ] Support for Azure

## Maintainers

* [Subhodip Roy](https://github.com/subh-cs)

## License

Licensed under the [MIT License](/LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/redis.Util">Util</a>
  - <a href="#@winglibs/redis.Redis">Redis</a>
  - <a href="#@winglibs/redis.Redis_sim">Redis_sim</a>
- **Interfaces**
  - <a href="#@winglibs/redis.IRedis">IRedis</a>
  - <a href="#@winglibs/redis.IRedisClient">IRedisClient</a>

### Util (preflight class) <a class="wing-docs-anchor" id="@winglibs/redis.Util"></a>

*No description*

#### Constructor

```
new(): Util
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight newRedisClient(url: str, redisPassword: str): IRedisClient</code> | *No description* |

### Redis (preflight class) <a class="wing-docs-anchor" id="@winglibs/redis.Redis"></a>

*No description*

#### Constructor

```
new(): Redis
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight del(key: str): void?</code> | *No description* |
| <code>inflight get(key: str): str?</code> | *No description* |
| <code>inflight hGet(key: str, field: str): str?</code> | *No description* |
| <code>inflight hSet(key: str, field: str, value: str): void?</code> | *No description* |
| <code>inflight sAdd(key: str, value: str): void?</code> | *No description* |
| <code>inflight sMembers(key: str): Array<str>?</code> | *No description* |
| <code>inflight set(key: str, value: str): void?</code> | *No description* |
| <code>inflight url(): str</code> | *No description* |

### Redis_sim (preflight class) <a class="wing-docs-anchor" id="@winglibs/redis.Redis_sim"></a>

*No description*

#### Constructor

```
new(): Redis_sim
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight del(key: str): void</code> | *No description* |
| <code>inflight get(key: str): str?</code> | *No description* |
| <code>inflight hGet(key: str, field: str): str?</code> | *No description* |
| <code>inflight hSet(key: str, field: str, value: str): void</code> | *No description* |
| <code>inflight sAdd(key: str, value: str): void</code> | *No description* |
| <code>inflight sMembers(key: str): Array<str>?</code> | *No description* |
| <code>inflight set(key: str, value: str): void</code> | *No description* |
| <code>inflight url(): str</code> | *No description* |

### IRedis (interface) <a class="wing-docs-anchor" id="@winglibs/redis.IRedis"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight del(key: str): void</code> | *No description* |
| <code>inflight get(key: str): str?</code> | *No description* |
| <code>inflight hGet(key: str, field: str): str?</code> | *No description* |
| <code>inflight hSet(key: str, field: str, value: str): void</code> | *No description* |
| <code>inflight sAdd(key: str, value: str): void</code> | *No description* |
| <code>inflight sMembers(key: str): Array<str>?</code> | *No description* |
| <code>inflight set(key: str, value: str): void</code> | *No description* |
| <code>inflight url(): str</code> | *No description* |

### IRedisClient (interface) <a class="wing-docs-anchor" id="@winglibs/redis.IRedisClient"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight connect(): void</code> | *No description* |
| <code>inflight del(key: str): void</code> | *No description* |
| <code>inflight disconnect(): void</code> | *No description* |
| <code>inflight get(key: str): str?</code> | *No description* |
| <code>inflight hGet(key: str, field: str): str?</code> | *No description* |
| <code>inflight hSet(key: str, field: str, value: str): void</code> | *No description* |
| <code>inflight sAdd(key: str, value: str): void</code> | *No description* |
| <code>inflight sMembers(key: str): Array<str>?</code> | *No description* |
| <code>inflight set(key: str, value: str): void</code> | *No description* |
| <code>inflight url(): str</code> | *No description* |


