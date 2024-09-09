---
title: Amazon SageMaker
id: sagemaker
sidebar_label: Amazon SageMaker
description:  The library enables owners of a trained sagemaker model, to access its Endpoints from a winglang [inflight](https://www.winglang.io/docs/concepts/inflights#inflight-code) code.
keywords: [winglib, Wing library]
---
# sagemaker

## Prerequisites

- [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/sagemaker
```

## Usage

The library enables owners of a trained sagemaker model, to access its Endpoints from a winglang inflight code.

```wing
bring sagemaker;
bring cloud;

let sm = new sagemaker.Endpoint("my-endpoint-name", "my-inference-name");

let handler = inflight () => {
  let res = sm.invoke({
    inputs: "do AI stuff"
    },
    ContentType: "application/json"
  );
  log(res.Body);
};

new cloud.Function(handler);
```

## Troubleshooting

Encountering issues? Here are some common problems and their solutions:

### `Error: Region is missing`

**Problem**: When trying to invoke the sagemaker model, the region reports missing
`Error: Region is missing`

**Solution**:

Add `AWS_REGION` to the cloud.Function environment variable:

```wing
bring sagemaker;
bring cloud;

let sm = new sagemaker.Endpoint("my-endpoint-name", "my-inference-name");

let handler = inflight () => {
  let res = sm.invoke({
    inputs: "do AI stuff"
    },
    ContentType: "application/json"
  );
  log(res.Body);
};

new cloud.Function(handler, env: {
  "AWS_REGION":"us-west-2"
});
```


## License

This library is licensed under the [MIT License](./LICENSE).

---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/sagemaker.Endpoint">Endpoint</a>
  - <a href="#@winglibs/sagemaker.SageMaker_tfaws">SageMaker_tfaws</a>
  - <a href="#@winglibs/sagemaker.SageMaker_sim">SageMaker_sim</a>
- **Interfaces**
  - <a href="#@winglibs/sagemaker.ISageMaker">ISageMaker</a>
- **Structs**
  - <a href="#@winglibs/sagemaker.InvocationOptions">InvocationOptions</a>
  - <a href="#@winglibs/sagemaker.InvocationOutput">InvocationOutput</a>

### Endpoint (preflight class) <a class="wing-docs-anchor" id="@winglibs/sagemaker.Endpoint"></a>

*No description*

#### Constructor

```
new(endpointName: str, inferenceComponentName: str): Endpoint
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>endpointName</code> | <code>str</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight invoke(body: Json, options: InvocationOptions?): InvocationOutput</code> | *No description* |

### SageMaker_tfaws (preflight class) <a class="wing-docs-anchor" id="@winglibs/sagemaker.SageMaker_tfaws"></a>

*No description*

#### Constructor

```
new(endpointName: str, inferenceComponentName: str): SageMaker_tfaws
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>endpointName</code> | <code>str</code> | *No description* |
| <code>inferenceComponentName</code> | <code>str</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight invoke(body: Json, options: InvocationOptions?): InvocationOutput</code> | *No description* |

### SageMaker_sim (preflight class) <a class="wing-docs-anchor" id="@winglibs/sagemaker.SageMaker_sim"></a>

*No description*

#### Constructor

```
new(endpointName: str, inferenceName: str): SageMaker_sim
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight invoke(body: Json, options: InvocationOptions?): InvocationOutput</code> | *No description* |
| <code>setMockResponse(fn: inflight (Json, InvocationOptions?): InvocationOutput): void</code> | *No description* |

### ISageMaker (interface) <a class="wing-docs-anchor" id="@winglibs/sagemaker.ISageMaker"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight invoke(body: Json, InvocationOptions: InvocationOptions?): InvocationOutput</code> | *No description* |

### InvocationOptions (struct) <a class="wing-docs-anchor" id="@winglibs/sagemaker.InvocationOptions"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>Accept</code> | <code>str?</code> | *No description* |
| <code>ContentType</code> | <code>str?</code> | *No description* |
| <code>CustomAttributes</code> | <code>str?</code> | *No description* |
| <code>EnableExplanations</code> | <code>str?</code> | *No description* |
| <code>InferenceComponentName</code> | <code>str?</code> | *No description* |
| <code>InferenceId</code> | <code>str?</code> | *No description* |
| <code>TargetContainerHostname</code> | <code>str?</code> | *No description* |
| <code>TargetModel</code> | <code>str?</code> | *No description* |
| <code>TargetVariant</code> | <code>str?</code> | *No description* |

### InvocationOutput (struct) <a class="wing-docs-anchor" id="@winglibs/sagemaker.InvocationOutput"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>Body</code> | <code>str</code> | *No description* |
| <code>ContentType</code> | <code>str?</code> | *No description* |
| <code>CustomAttributes</code> | <code>str?</code> | *No description* |
| <code>InvokedProductionVariant</code> | <code>str?</code> | *No description* |


