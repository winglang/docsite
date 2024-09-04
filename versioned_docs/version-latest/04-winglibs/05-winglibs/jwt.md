---
title: JWT authentication
id: jwt
sidebar_label: JWT authentication
description:  Wing library for JWT authentication
keywords: [winglib, Wing library]
---
# jwt

A Wing library for working with JWT authentication.

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/jwt
```

## Usage

```js
bring util;
bring jwt;

test "will sign and verify" {
  let id = util.nanoid();
  let token = jwt.sign({ foo: id }, "shhhhh");
  let decoded1 = jwt.verify(token, secret: "shhhhh");
}
```

## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/jwt.Util">Util</a>
- **Structs**
  - <a href="#@winglibs/jwt.DecodeOptions">DecodeOptions</a>
  - <a href="#@winglibs/jwt.SignOptions">SignOptions</a>
  - <a href="#@winglibs/jwt.VerifyJwtOptions">VerifyJwtOptions</a>
  - <a href="#@winglibs/jwt.VerifyOptions">VerifyOptions</a>

<h3 id="@winglibs/jwt.Util">Util (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): Util
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight decode(token: str, options: DecodeOptions?): Json</code> | *No description* |
| <code>static inflight sign(data: Json, secret: str, options: SignOptions?): str</code> | *No description* |
| <code>static inflight verify(token: str, options: VerifyOptions): Json</code> | *No description* |

<h3 id="@winglibs/jwt.DecodeOptions">DecodeOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>complete</code> | <code>bool?</code> | *No description* |

<h3 id="@winglibs/jwt.SignOptions">SignOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>algorithm</code> | <code>str?</code> | *No description* |
| <code>audience</code> | <code>Array<str>?</code> | *No description* |
| <code>encoding</code> | <code>str?</code> | *No description* |
| <code>expiresIn</code> | <code>duration?</code> | *No description* |
| <code>issuer</code> | <code>str?</code> | *No description* |
| <code>jwtid</code> | <code>str?</code> | *No description* |
| <code>keyid</code> | <code>str?</code> | *No description* |
| <code>notBefore</code> | <code>duration?</code> | *No description* |
| <code>subject</code> | <code>str?</code> | *No description* |

<h3 id="@winglibs/jwt.VerifyJwtOptions">VerifyJwtOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>algorithms</code> | <code>Array<str>?</code> | *No description* |
| <code>audience</code> | <code>str?</code> | *No description* |
| <code>ignoreExpiration</code> | <code>bool?</code> | *No description* |
| <code>ignoreNotBefore</code> | <code>bool?</code> | *No description* |
| <code>issuer</code> | <code>str?</code> | *No description* |
| <code>jwtid</code> | <code>str?</code> | *No description* |
| <code>maxAge</code> | <code>str?</code> | *No description* |
| <code>nonce</code> | <code>str?</code> | *No description* |
| <code>subject</code> | <code>str?</code> | *No description* |

<h3 id="@winglibs/jwt.VerifyOptions">VerifyOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>jwksUri</code> | <code>str?</code> | *No description* |
| <code>options</code> | <code>VerifyJwtOptions?</code> | *No description* |
| <code>secret</code> | <code>str?</code> | *No description* |


