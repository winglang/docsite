---
title: Amazon SNS
id: sns
sidebar_label: Amazon SNS
description:  A Wing library for working with [Amazon SNS](https://aws.amazon.com/sns/)
keywords: [winglib, Wing library]
---
# sns

This library allows you to interact with the Amazon SNS Service.

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/sns
```

## Usage

```js
bring sns;

let client = new sns.MobileNotifications();

test "sending an SMS" {
  client.publish(PhoneNumber: "+14155552671", Message: "Hello");
}
```

## License

This library is licensed under the [MIT License](./LICENSE).

