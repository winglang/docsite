---
title: Amazon Bedrock
id: bedrock
sidebar_label: Amazon Bedrock
description:  A Wing library for Amazon Bedrock
keywords: [winglib, Wing library]
---
# bedrock

A Wing library for working with [Amazon Bedrock](https://aws.amazon.com/bedrock/).

## Prerequisites

* [winglang](https://winglang.io).
* [Model access](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) to Amazon bedrock

## Installation

```sh
npm i @winglibs/bedrock
```

## Usage

```js
bring bedrock;

pub class JokeMaker {
  claud: bedrock.Model;

  new() {
    this.claud = new bedrock.Model("anthropic.claude-v2") as "claude";
  }

  pub inflight makeJoke(topic: str): str {
    let res = this.claud.invoke({
      prompt: "\n\nHuman: Tell me a joke about {topic}\n\nAssistant:",
      max_tokens_to_sample: 300,
      temperature: 0.5,
      top_k: 250,
      top_p: 1,
      stop_sequences: [
        "\n\nHuman:"
      ],
      anthropic_version: "bedrock-2023-05-31"
    });

    return res["completion"].asStr();
  }
}
```

## Development & Testing 

When running in simulator using `wing run`, request are sent to Amazon Bedrock.
When running tests using `wing test` or by running tests from within Wing Console, requests are 
handled by the mocked service. 

## Maintainers

[@eladb](https://github.com/eladb), [@ekeren](https://github.com/ekeren)

## License

This library is licensed under the [MIT License](./LICENSE).

---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/bedrock.JokeMaker">JokeMaker</a>
  - <a href="#@winglibs/bedrock.Model">Model</a>

### JokeMaker (preflight class) <a class="wing-docs-anchor" id="@winglibs/bedrock.JokeMaker"></a>

*No description*

#### Constructor

```
new(): JokeMaker
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight makeJoke(topic: str): str</code> | *No description* |

### Model (preflight class) <a class="wing-docs-anchor" id="@winglibs/bedrock.Model"></a>

*No description*

#### Constructor

```
new(modelId: str): Model
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>modelId</code> | <code>str</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight invoke(body: Json): Json</code> | *No description* |


