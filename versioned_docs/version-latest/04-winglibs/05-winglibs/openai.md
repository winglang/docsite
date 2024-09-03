---
title: OpenAI
id: openai
sidebar_label: OpenAI
description:  Wing library for [OpenAI](https://openai.com/)
keywords: [winglib, Wing library]
---
# openai

An [OpenAI](https://openai.com) library for Winglang.

> This is an initial version of this library which currently exposes a very small subset of the
> OpenAI API.

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/openai
```

## Example

```js
bring cloud;
bring openai;

let key = new cloud.Secret(name: "OAIApiKey");
let oai = new openai.OpenAI(apiKeySecret: key);

new cloud.Function(inflight () => {
  let joke = oai.createCompletion("tell me a short joke", model: "gpt-3.5-turbo", max_tokens: 2048);
  log(joke);
});
```

When running in a `test` context, the `createCompletion` method will return a JSON object which
echos the request under the `mock` key:

```js
bring expect;

test "create completion test" {
  let r = oai.createCompletion("tell me a short joke");
  expect.equal(r, Json.stringify({
    mock: {
      prompt:"tell me a short joke",
      params:{"model":"gpt-3.5-turbo","max_tokens":2048}
    }
  }));
}
```

## Usage

```js
new openai.OpenAI();
```

* `apiKeySecret` - a `cloud.Secret` with the OpenAI API key (required).
* `orgSecret` - a `cloud.Secret` with the OpenAI organization ID (not required).

You can also specify clear text values through `apiKey` and `org`, but make sure not to commit these
values to a repository :warning:.

Methods:

* `inflight createCompletion()` - requests a completion from a model. Options are `model` (defaults
  to `gpt-3.5.turbo`) and `max_tokens` (defaults to 2048).

## Roadmap

* [ ] Support the rest of the OpenAI API
* [ ] Add more examples
* [ ] Add more tests

## Maintainers

* [Shai Ber](https://github.com/shaiber)

## License

Licensed under the [MIT License](/LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/openai.OpenAI">OpenAI</a>
- **Structs**
  - <a href="#@winglibs/openai.CompletionParams">CompletionParams</a>
  - <a href="#@winglibs/openai.OpenAIProps">OpenAIProps</a>

<h3 id="@winglibs/openai.OpenAI">OpenAI (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: OpenAIProps?): OpenAI
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight createCompletion(prompt: str, params: CompletionParams?): str</code> | *No description* |
| <code>static inflight createNewInflightClient(apiKey: str, org: str?): IClient</code> | *No description* |

<h3 id="@winglibs/openai.CompletionParams">CompletionParams (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>maxTokens</code> | <code>num?</code> | *No description* |
| <code>model</code> | <code>str?</code> | *No description* |

<h3 id="@winglibs/openai.OpenAIProps">OpenAIProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>apiKey</code> | <code>str?</code> | *No description* |
| <code>apiKeySecret</code> | <code>Secret?</code> | *No description* |
| <code>org</code> | <code>str?</code> | *No description* |
| <code>orgSecret</code> | <code>Secret?</code> | *No description* |


