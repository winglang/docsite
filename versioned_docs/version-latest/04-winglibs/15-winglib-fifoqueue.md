---
title: FIFO Queue
id: fifoqueue
sidebar_label: FIFO Queue (winglib)
description:  A wing library to work with FIFO (first-in first-out) Queues
keywords: [winglib, Wing library]
---
A wing library to work with FIFO (first-in first-out) Queues.

To use the queue, set `groupId` to group messages and process them in an ordered fashion.

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/fifoqueue
```

## Usage

```js
bring fifoqueue;

let queue = new fifoqueue.FifoQueue();

queue.setConsumer(inflight (message: str) => {
  log("recieved message {message}");
});

test "will push to queue" {
  queue.push("a new message", groupId: "myGroup");
}
```

## License

This library is licensed under the [MIT License](./LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/fifoqueue.FifoQueue">FifoQueue</a>
  - <a href="#@winglibs/fifoqueue.FifoQueue_sim">FifoQueue_sim</a>
  - <a href="#@winglibs/fifoqueue.FifoQueue_aws">FifoQueue_aws</a>
- **Interfaces**
  - <a href="#@winglibs/fifoqueue.IFifoQueue">IFifoQueue</a>
- **Structs**
  - <a href="#@winglibs/fifoqueue.FifoQueueProps">FifoQueueProps</a>
  - <a href="#@winglibs/fifoqueue.PushOptions">PushOptions</a>
  - <a href="#@winglibs/fifoqueue.SetConsumerOptions">SetConsumerOptions</a>

### FifoQueue (preflight class) <a class="wing-docs-anchor" id="@winglibs/fifoqueue.FifoQueue"></a>

*No description*

#### Constructor

```
new(props: FifoQueueProps?): FifoQueue
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight push(message: str, options: PushOptions): void</code> | *No description* |
| <code>setConsumer(fn: inflight (str): void, options: SetConsumerOptions?): void</code> | *No description* |

### FifoQueue_sim (preflight class) <a class="wing-docs-anchor" id="@winglibs/fifoqueue.FifoQueue_sim"></a>

*No description*

#### Constructor

```
new(): FifoQueue_sim
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight push(message: str, options: PushOptions): void</code> | *No description* |
| <code>setConsumer(handler: inflight (str): void, options: SetConsumerOptions?): void</code> | *No description* |

### FifoQueue_aws (preflight class) <a class="wing-docs-anchor" id="@winglibs/fifoqueue.FifoQueue_aws"></a>

*No description*

#### Constructor

```
new(props: FifoQueueProps?): FifoQueue_aws
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight push(message: str, options: PushOptions): void</code> | *No description* |
| <code>setConsumer(handler: inflight (str): void, options: SetConsumerOptions?): void</code> | *No description* |

### IFifoQueue (interface) <a class="wing-docs-anchor" id="@winglibs/fifoqueue.IFifoQueue"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight push(message: str, options: PushOptions): void</code> | *No description* |
| <code>setConsumer(handler: inflight (str): void, options: SetConsumerOptions?): void</code> | *No description* |

### FifoQueueProps (struct) <a class="wing-docs-anchor" id="@winglibs/fifoqueue.FifoQueueProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>dlq</code> | <code>DeadLetterQueueProps?</code> | A dead-letter queue. |
| <code>retentionPeriod</code> | <code>duration?</code> | How long a queue retains a message. |
| <code>timeout</code> | <code>duration?</code> | How long a queue's consumers have to process a message. |

### PushOptions (struct) <a class="wing-docs-anchor" id="@winglibs/fifoqueue.PushOptions"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>groupId</code> | <code>str</code> | *No description* |

### SetConsumerOptions (struct) <a class="wing-docs-anchor" id="@winglibs/fifoqueue.SetConsumerOptions"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>batchSize</code> | <code>num?</code> | The maximum number of messages to send to subscribers at once. |
| <code>concurrency</code> | <code>num?</code> | The maximum concurrent invocations that can run at one time. |
| <code>env</code> | <code>Map<str>?</code> | Environment variables to pass to the function. |
| <code>logRetentionDays</code> | <code>num?</code> | Specifies the number of days that function logs will be kept. |
| <code>memory</code> | <code>num?</code> | The amount of memory to allocate to the function, in MB. |
| <code>timeout</code> | <code>duration?</code> | The maximum amount of time the function can run. |


