---
title: Kubernetes (k8s)
id: k8s
sidebar_label: Kubernetes (k8s)
description:  Wing for Kubernetes
keywords: [winglib, Wing library]
---
A framework for synthesizing Kubernetes manifests using Winglang.

## Installation

Install the Wing CLI:

```sh
npm i -g winglang
```

Create a new project and install this library:

```sh
mkdir wing-loves-k8s
cd wing-loves-k8s
npm i @winglibs/k8s
```

## Usage

Let's define an app with a simple Kubernetes object:

```js
// main.w
bring k8s;

new k8s.ApiObject(
  apiVersion: "v1",
  kind: "ConfigMap",
  spec: {
    data: {
      key: "value",
    },
  }
);
```

Now, compile it to YAML:

```sh
$ wing compile -t @winglibs/k8s ubuntu.main.w
target/ubuntu.main.k8s
```

You 

The output is a valid K8S YAML is in `target/ubuntu.main.k8s`:

```sh
$ ls target/ubuntu.main.k8s
chart-c86185a7.k8s.yaml
```

### Creating Helm charts

You can set `WING_K8S_OUTPUT` to `helm` in order to produce a helm chart instead of simple manifest.
This requires a `Chart.yaml` file next in the current directory.

### Default labels and namespace

You can use the `WING_K8S_LABELS` environment variable to apply labels to all resources in an app.
The value is a JSON-encoded map.

The `WING_K8S_NAMESPACE` variable can be used to specify the default namespace.

```sh
export WING_K8S_LABELS='{ "my-label": "123", "your-label": "444" }'
export WING_K8S_NAMESPACE='my-namespace'
wing compile -t @winglibs/k8s main.w
```

### CDK8s Support

This library supports [cdk8s](https://cdk8s.io) and
[cdk8s-plus](https://cdk8s.io/docs/latest/plus/), so you can do stuff like this:

```sh
npm i cdk8s-plus-27
```

And then:

```js
bring "cdk8s-plus-27" as k8s;

// lets create a volume that contains our app.
let appData = new k8s.ConfigMap();
appData.addDirectory("./nodejs-app");

let appVolume = k8s.Volume.fromConfigMap(this, "App", appData);

// lets create a deployment to run a few instances of a pod
let deployment = new k8s.Deployment(
  replicas: 3,
);

// now we create a container that runs our app
let appPath = "/var/lib/app";
let port = 80;
let container = deployment.addContainer({
  image: "node:14.4.0-alpine3.12",
  command: ["node", "index.js", "{port}"],
  port: port,
  workingDir: appPath,
});

// make the app accessible to the container
container.mount(appPath, appVolume);

// finally, we expose the deployment as a load balancer service and make it run
deployment.exposeViaService(serviceType: k8s.ServiceType.LOAD_BALANCER);
```


## Roadmap

* [ ] Support generating Wing bindings from K8S API specifications and CRDs ([`cdk8s
  import`](https://cdk8s.io/docs/latest/cli/import/)).

## Maintainers

* [Elad Ben-Israel](@eladb)

## License

This library is licensed under the [MIT License](./LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/k8s.ApiObject">ApiObject</a>
- **Structs**
  - <a href="#@winglibs/k8s.ApiObjectProps">ApiObjectProps</a>

### ApiObject (preflight class) <a class="wing-docs-anchor" id="@winglibs/k8s.ApiObject"></a>

*No description*

#### Constructor

```
new(props: ApiObjectProps): ApiObject
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>apiGroup</code> | <code>str</code> | The group portion of the API version (e.g. `authorization.k8s.io`). |
| <code>apiVersion</code> | <code>str</code> | The object's API version (e.g. `authorization.k8s.io/v1`). |
| <code>chart</code> | <code>Chart</code> | The chart in which this object is defined. |
| <code>kind</code> | <code>str</code> | The object kind. |
| <code>metadata</code> | <code>ApiObjectMetadataDefinition</code> | Metadata associated with this API object. |
| <code>name</code> | <code>str</code> | The name of the API object. |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>addDependency(dependencies: Array<IConstruct>): void</code> | Create a dependency between this ApiObject and other constructs. |
| <code>addJsonPatch(ops: Array<JsonPatch>): void</code> | Applies a set of RFC-6902 JSON-Patch operations to the manifest synthesized for this API object. |
| <code>static isApiObject(o: any): bool</code> | Return whether the given object is an `ApiObject`. |
| <code>static of(c: IConstruct): ApiObject</code> | Returns the `ApiObject` named `Resource` which is a child of the given construct. |
| <code>toJson(): any</code> | Renders the object to Kubernetes JSON. |

### ApiObjectProps (struct) <a class="wing-docs-anchor" id="@winglibs/k8s.ApiObjectProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>apiVersion</code> | <code>str</code> | API version. |
| <code>kind</code> | <code>str</code> | Resource kind. |
| <code>metadata</code> | <code>ApiObjectMetadata?</code> | Object metadata. |
| <code>spec</code> | <code>Json?</code> | *No description* |


