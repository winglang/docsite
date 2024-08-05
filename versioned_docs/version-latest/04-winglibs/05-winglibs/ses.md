---
title: Amazon SES
id: ses
sidebar_label: Amazon SES
description:  Wing library for interacting with Amazon SES.
keywords: [winglib, Wing library]
---
# ses

This library allows you to interact with the AWS SES Service

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/ses
```

## Usage

```js
bring ses;

let emailService = new ses.EmailService(emailIdentities: ["bot@wing.cloud"]); 
```

## License

This library is licensed under the [MIT License](./LICENSE).

