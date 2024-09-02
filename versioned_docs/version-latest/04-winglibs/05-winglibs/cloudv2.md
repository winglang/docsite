---
title: cloudv2
id: cloudv2
sidebar_label: cloudv2
description:  Standard cloud library for Wing
keywords: [winglib, Wing library]
---
# cloudv2

This module contains a Wing-based implementation of the built-in `cloud` library. It's a work in progresss as part of a migration for our internal codebase.

Here are the resources available so far:
- Counter

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/cloudv2
```

## Usage

```js
bring cloudv2 as cloud;

let counter = new cloud.Counter();
```

## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/cloudv2.Counter">Counter</a>
  - <a href="#@winglibs/cloudv2.AwsCounter">AwsCounter</a>
- **Interfaces**
  - <a href="#@winglibs/cloudv2.ICounter">ICounter</a>
  - <a href="#@winglibs/cloudv2.IAwsCounter">IAwsCounter</a>
- **Structs**
  - <a href="#@winglibs/cloudv2.CounterProps">CounterProps</a>

<h3 id="@winglibs/cloudv2.Counter">Counter (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: CounterProps): Counter
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>initial</code> | <code>num</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight dec(amount: num?, key: str?): num</code> | *No description* |
| <code>inflight inc(amount: num?, key: str?): num</code> | *No description* |
| <code>inflight peek(key: str?): num</code> | *No description* |
| <code>inflight set(value: num, key: str?): void</code> | *No description* |

<h3 id="@winglibs/cloudv2.AwsCounter">AwsCounter (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): AwsCounter
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static from(c: ICounter): IAwsCounter?</code> | *No description* |

<h3 id="@winglibs/cloudv2.ICounter">ICounter (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight dec(amount: num?, key: str?): num</code> | Decrements the counter atomically by a certain amount and returns the previous value. - `amount` The amount to decrement by (defaults to 1) - `key` The key of the counter (defaults to "default") |
| <code>inflight inc(amount: num?, key: str?): num</code> | Increments the counter atomically by a certain amount and returns the previous value. - `amount` The amount to increment by (defaults to 1) - `key` The key of the counter (defaults to "default") |
| <code>inflight peek(key: str?): num</code> | Returns the current value of the counter. - `key` The key of the counter (defaults to "default") |
| <code>inflight set(value: num, key: str?): void</code> | Sets the value of the counter. - `value` The new value of the counter - `key` The key of the counter (defaults to "default") |

<h3 id="@winglibs/cloudv2.IAwsCounter">IAwsCounter (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>dynamoTableArn(): str</code> | *No description* |
| <code>dynamoTableName(): str</code> | *No description* |

<h3 id="@winglibs/cloudv2.CounterProps">CounterProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>initial</code> | <code>num?</code> | The initial value of the counter @default 0 |


