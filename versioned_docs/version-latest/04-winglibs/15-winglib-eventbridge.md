---
title: Amazon EventBridge
id: eventbridge
sidebar_label: Amazon EventBridge (winglib)
description:  A Wing library for working with Amazon EventBridge
keywords: [winglib, Wing library]
---
A Wing library for working with [Amazon EventBridge](https://aws.amazon.com/eventbridge/).

## Prerequisites

* [winglang](https://winglang.io)

## Installation

```sh
npm i @winglibs/eventbridge
```

## Usage

```js
bring cloud;
bring eventbridge;

let bus = new eventbridge.Bus(name: "my-bus");

bus.onEvent("github.pull-request.created", inflight (event) => {
  log("subscribed event received {Json.stringify(event)}");
}, {
  "detail-type": [{"prefix": "pull-request."}],
  "source": ["github.com"],
});

new cloud.Function(inflight () => {
  bus.putEvents({
    detailType: "pull-request.created",
    resources: ["test"],
    source: "github.com",
    version: "0",
    detail: {
      "test": "test",
    },
  });
});
```

## Parameters

* eventBridgeName - `str` - Optional. Name of an existing EventBridge to reference.

#### Usage

```sh
wing compile -t @winglang/platform-awscdk -v eventBridgeName="my-bus" main.w
```

## License

This library is licensed under the [MIT License](./LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/eventbridge.Bus">Bus</a>
  - <a href="#@winglibs/eventbridge.platform.tfaws.Bus">platform.tfaws.Bus</a>
  - <a href="#@winglibs/eventbridge.platform.sim.Bus">platform.sim.Bus</a>
  - <a href="#@winglibs/eventbridge.platform.sim.EventBridgeBus">platform.sim.EventBridgeBus</a>
  - <a href="#@winglibs/eventbridge.platform.awscdk.Bus">platform.awscdk.Bus</a>
  - <a href="#@winglibs/eventbridge.platform.aws.Util">platform.aws.Util</a>
- **Interfaces**
  - <a href="#@winglibs/eventbridge.IBus">IBus</a>
- **Structs**
  - <a href="#@winglibs/eventbridge.BusProps">BusProps</a>
  - <a href="#@winglibs/eventbridge.Event">Event</a>
  - <a href="#@winglibs/eventbridge.PublishEvent">PublishEvent</a>
  - <a href="#@winglibs/eventbridge.platform.aws.PutEventCommandEntry">platform.aws.PutEventCommandEntry</a>
  - <a href="#@winglibs/eventbridge.platform.aws.PutEventCommandInput">platform.aws.PutEventCommandInput</a>

### Bus (preflight class) <a class="wing-docs-anchor" id="@winglibs/eventbridge.Bus"></a>

*No description*

#### Constructor

```
new(props: BusProps?): Bus
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>onEvent(name: str, handler: inflight (Event): void, pattern: Json): void</code> | *No description* |
| <code>inflight putEvents(events: Array<PublishEvent>): void</code> | *No description* |
| <code>subscribeQueue(name: str, queue: Queue, pattern: Json): void</code> | *No description* |

### platform.tfaws.Bus (preflight class) <a class="wing-docs-anchor" id="@winglibs/eventbridge.platform.tfaws.Bus"></a>

*No description*

#### Constructor

```
new(props: BusProps?): Bus
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>onEvent(name: str, handler: inflight (Event): void, pattern: Json): void</code> | *No description* |
| <code>inflight putEvents(events: Array<PublishEvent>): void</code> | *No description* |
| <code>subscribeQueue(name: str, queue: Queue, pattern: Json): void</code> | *No description* |

### platform.sim.Bus (preflight class) <a class="wing-docs-anchor" id="@winglibs/eventbridge.platform.sim.Bus"></a>

*No description*

#### Constructor

```
new(props: BusProps?): Bus
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>onEvent(name: str, handler: inflight (Event): void, pattern: Json): void</code> | *No description* |
| <code>inflight putEvents(events: Array<PublishEvent>): void</code> | *No description* |
| <code>subscribeQueue(name: str, queue: Queue, pattern: Json): void</code> | *No description* |

### platform.sim.EventBridgeBus (preflight class) <a class="wing-docs-anchor" id="@winglibs/eventbridge.platform.sim.EventBridgeBus"></a>

*No description*

#### Constructor

```
new(props: BusProps?): EventBridgeBus
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight putEvents(events: Array<PublishEvent>): void</code> | *No description* |
| <code>subscribe(callback: inflight (Event): void, pattern: Json): Resource</code> | *No description* |

### platform.awscdk.Bus (preflight class) <a class="wing-docs-anchor" id="@winglibs/eventbridge.platform.awscdk.Bus"></a>

*No description*

#### Constructor

```
new(props: BusProps?): Bus
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>static addRulePermission(handler: str, arn: str): void</code> | *No description* |
| <code>onEvent(name: str, handler: inflight (Event): void, pattern: Json): void</code> | *No description* |
| <code>inflight putEvents(events: Array<PublishEvent>): void</code> | *No description* |
| <code>subscribeQueue(name: str, queue: Queue, pattern: Json): void</code> | *No description* |

### platform.aws.Util (preflight class) <a class="wing-docs-anchor" id="@winglibs/eventbridge.platform.aws.Util"></a>

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
| <code>static inflight _putEvent(name: str, event: PutEventCommandInput): void</code> | *No description* |
| <code>static inflight putEvent(name: str, events: Array<PublishEvent>): void</code> | *No description* |

### IBus (interface) <a class="wing-docs-anchor" id="@winglibs/eventbridge.IBus"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>node</code> | <code>Node</code> | The tree node. |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>onEvent(name: str, handler: inflight (Event): void, pattern: Json): void</code> | *No description* |
| <code>inflight putEvents(events: Array<PublishEvent>): void</code> | *No description* |
| <code>subscribeQueue(name: str, queue: Queue, pattern: Json): void</code> | *No description* |

### BusProps (struct) <a class="wing-docs-anchor" id="@winglibs/eventbridge.BusProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>debug</code> | <code>bool?</code> | *No description* |
| <code>name</code> | <code>str</code> | *No description* |

### Event (struct) <a class="wing-docs-anchor" id="@winglibs/eventbridge.Event"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>account</code> | <code>str</code> | *No description* |
| <code>detail</code> | <code>Json</code> | *No description* |
| <code>detailType</code> | <code>str</code> | *No description* |
| <code>id</code> | <code>str</code> | *No description* |
| <code>region</code> | <code>str</code> | *No description* |
| <code>resources</code> | <code>Array<str></code> | *No description* |
| <code>source</code> | <code>str</code> | *No description* |
| <code>time</code> | <code>str</code> | *No description* |
| <code>version</code> | <code>str</code> | *No description* |

### PublishEvent (struct) <a class="wing-docs-anchor" id="@winglibs/eventbridge.PublishEvent"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>detail</code> | <code>Json</code> | *No description* |
| <code>detailType</code> | <code>str</code> | *No description* |
| <code>resources</code> | <code>Array<str></code> | *No description* |
| <code>source</code> | <code>str</code> | *No description* |
| <code>version</code> | <code>str</code> | *No description* |

### platform.aws.PutEventCommandEntry (struct) <a class="wing-docs-anchor" id="@winglibs/eventbridge.platform.aws.PutEventCommandEntry"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>Detail</code> | <code>str</code> | *No description* |
| <code>DetailType</code> | <code>str</code> | *No description* |
| <code>EventBusName</code> | <code>str</code> | *No description* |
| <code>Resources</code> | <code>Array<str></code> | *No description* |
| <code>Source</code> | <code>str</code> | *No description* |

### platform.aws.PutEventCommandInput (struct) <a class="wing-docs-anchor" id="@winglibs/eventbridge.platform.aws.PutEventCommandInput"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>Entries</code> | <code>Array<PutEventCommandEntry></code> | *No description* |


