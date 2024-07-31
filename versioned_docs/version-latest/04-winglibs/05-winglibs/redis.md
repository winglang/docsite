---
title: Redis
id: redis
sidebar_label: Redis
description:  A Wing library for [Redis](https://redis.io/)
keywords: [winglib, Wing library]
---
# Redis support for Winglang

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
