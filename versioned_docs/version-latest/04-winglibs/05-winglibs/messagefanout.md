---
title: Message Fanout
id: messagefanout
sidebar_label: Message Fanout
description:  Wing library to fan out messages
keywords: [winglib, Wing library]
---
# messagefanout

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/messagefanout
```

## Usage

```js
bring messagefanout;

let fanout = new messagefanout.MessageFanout();

fanout.addConsumer(inflight (msg: str) => {
  log("Hello {msg}!!!");
});

test "push a message to fanout" {
  fanout.publish("world");
}
```

## License

This library is licensed under the [MIT License](./LICENSE).

