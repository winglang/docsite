---
title: Containers
id: containers
sidebar_label: Containers
description:  Deploy containers with Wing
keywords: [winglib, Wing library]
---
This library allows deploying arbitrary containers with Wing.

## Installation

Use `npm` to install this library:

```sh
npm i @winglibs/containers
```

## Bring it

The `containers.Workload` resource represents a containerized workload.

```js
bring containers;

new containers.Workload(
  name: "hello",
  image: "paulbouwer/hello-kubernetes:1",
  port: 8080,
  readiness: "/",
  replicas: 4,
  env: {
    "MESSAGE" => message,
  }
);
```

## Forwarding

The `workload.forward()` method returns an `IForward` object with a `fromXxx()` method for each
supported handler type.

For example, this is how you can forward `cloud.Api` requests:

```js
let work = new containers.Workload(...);
let api = new cloud.Api();
api.get("/my_request", work.forward().fromApi());
```

You can pass an optional `route` and `method` to `forward()` in order to customize the behavior:

```js
work.forward(route: "/your_request", method: cloud.HttpMethod.PUT);
```

## `sim`

When executed in the Wing Simulator, the workload is started within a local Docker container.

## `tf-aws`

To deploy containerized workloads on AWS, we will need an EKS cluster. Unless other specified, a
cluster will be automatically provisioned for each Wing application.

However, it a common practice to reuse a single EKS cluster for multiple applications. To reference
an existing cluster, you will need to specify the following platform values:

* `eks.cluster_name`: The name of the cluster
* `eks.endpoint`: The URL of the Kubernetes API endpoint of the cluster
* `eks.certificate`: The certificate authority of this cluster.

This information can be obtained from the AWS Console or through the script `eks-values.sh`:

```sh
$ ./eks-values.sh CLUSTER-NAME > values.yaml
$ wing compile -t tf-aws --values ./values.yaml main.w
```

To create a new EKS cluster, you can use the `tfaws.Cluster` resource:

`eks.main.w`:

```js
bring containers;

new containers.tfaws.Cluster() as "my-wing-cluster";
```

And provision it using Terraform:

```sh
wing compile -t tf-aws eks.main.w
cd target/eks.main.tfaws
terraform init
terraform apply
./eks-values.sh my-wing-cluster > values.yaml
```

This might take a up to 20 minutes to provision (now you see why we want to share it across apps?).
The last command will populate `values.yaml` with the the cluster information needed to deploy
workloads.

To connect to this cluster using `kubectl`, use:

```sh
aws eks update-kubeconfig --name my-wing-cluster
```

Then:

```sh
$ kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   172.20.0.1   <none>        443/TCP   36m
```

## Roadmap

See [Captain's Log](https://winglang.slack.com/archives/C047QFSUL5R/p1696868156845019) in the [Wing
Slack](https://t.winglang.io).

- [x] EKS as a singleton
- [ ] Container logs to Wing logs
- [x] Add support for local Dockerfiles (currently only images from Docker Hub are supported), this
      includes publishing into an ECR.
- [x] Invalidation of local docker image (both local and in registry). Check what cdk-assets is
  doing.
- [x] Reference existing EKS repository.
- [ ] Use a `cloud.Redis` database
- [ ] Implement `cloud.Service` using containers.
- [x] Reference workload from another workload (without going through the load balancer) - Microservice example.
- [x] `internalUrl()` in the simulator/aws.
- [x] `publicUrl()` in simulator/aws.
- [ ] Logging in `tf-aws` (`Disabled logging because aws-logging configmap was not found. configmap
  "aws-logging" not found`).
- [ ] Logging in `sim`.
- [ ] Publish the library
- [x] Generate helm charts under target directory
- [ ] Implement `start()` and `stop()`.
- [ ] Sidecar containers
- [ ] Domains
- [ ] How can we vend `./eks-value.sh` as part of this library?
- [ ] SSL
- [x] Nodes - what should we do there? Use Fargate profiles in EKS instead of managed node groups?
- [ ] Open bugs
- [ ] Restore microservice test (fails on GitHub).

## License

Licensed under the [MIT License](./LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/containers.Workload">Workload</a>
  - <a href="#@winglibs/containers.sim.Workload_sim">sim.Workload_sim</a>
  - <a href="#@winglibs/containers.helm.Chart">helm.Chart</a>
  - <a href="#@winglibs/containers.eks.Workload_tfaws">eks.Workload_tfaws</a>
  - <a href="#@winglibs/containers.eks.Vpc">eks.Vpc</a>
  - <a href="#@winglibs/containers.eks.Cluster">eks.Cluster</a>
  - <a href="#@winglibs/containers.eks.ClusterBase">eks.ClusterBase</a>
  - <a href="#@winglibs/containers.eks.Repository">eks.Repository</a>
  - <a href="#@winglibs/containers.eks.Aws">eks.Aws</a>
- **Interfaces**
  - <a href="#@winglibs/containers.IForward">IForward</a>
  - <a href="#@winglibs/containers.IWorkload">IWorkload</a>
- **Structs**
  - <a href="#@winglibs/containers.ContainerOpts">ContainerOpts</a>
  - <a href="#@winglibs/containers.ForwardOptions">ForwardOptions</a>
  - <a href="#@winglibs/containers.WorkloadProps">WorkloadProps</a>

### Workload (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.Workload"></a>

*No description*

#### Constructor

```
new(props: WorkloadProps): Workload
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>internalUrl</code> | <code>str?</code> | *No description* |
| <code>publicUrl</code> | <code>str?</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>forward(opts: ForwardOptions?): IForward</code> | *No description* |

### sim.Workload_sim (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.sim.Workload_sim"></a>

*No description*

#### Constructor

```
new(props: WorkloadProps): Workload_sim
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>internalUrl</code> | <code>str?</code> | *No description* |
| <code>publicUrl</code> | <code>str?</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>forward(opts: ForwardOptions?): IForward</code> | *No description* |

### helm.Chart (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.helm.Chart"></a>

*No description*

#### Constructor

```
new(props: WorkloadProps): Chart
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>apiObjects</code> | <code>Array<ApiObject></code> | Returns all the included API objects. |
| <code>labels</code> | <code>Map<str></code> | Labels applied to all resources in this chart. |
| <code>namespace</code> | <code>str?</code> | The default namespace for all objects in this chart. |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>forward(opts: ForwardOptions?): IForward</code> | *No description* |
| <code>toHelm(workdir: str): str</code> | *No description* |
| <code>static toHelmChart(wingdir: str, chart: Chart): str</code> | *No description* |
| <code>addDependency(dependencies: Array<IConstruct>): void</code> | Create a dependency between this Chart and other constructs. |
| <code>generateObjectName(apiObject: ApiObject): str</code> | Generates a app-unique name for an object given it's construct node path. |
| <code>static isChart(x: any): bool</code> | Return whether the given object is a Chart. |
| <code>static of(c: IConstruct): Chart</code> | Finds the chart in which a node is defined. |
| <code>toJson(): Array<any></code> | Renders this chart to a set of Kubernetes JSON resources. |

### eks.Workload_tfaws (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.eks.Workload_tfaws"></a>

*No description*

#### Constructor

```
new(props: WorkloadProps): Workload_tfaws
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>internalUrl</code> | <code>str?</code> | *No description* |
| <code>publicUrl</code> | <code>str?</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>forward(opts: ForwardOptions?): IForward</code> | *No description* |

### eks.Vpc (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.eks.Vpc"></a>

*No description*

#### Constructor

```
new(props: VpcProps?): Vpc
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>privateSubnets</code> | <code>Array<str></code> | *No description* |
| <code>publicSubnets</code> | <code>Array<str></code> | *No description* |

#### Methods

*No methods*

### eks.Cluster (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.eks.Cluster"></a>

*No description*

#### Constructor

```
new(clusterName: str): Cluster
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>attributes(): ClusterAttributes</code> | *No description* |
| <code>static getOrCreate(scope: IResource): ICluster</code> | *No description* |
| <code>helmProvider(): TerraformProvider</code> | *No description* |
| <code>kubernetesProvider(): TerraformProvider</code> | *No description* |

### eks.ClusterBase (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.eks.ClusterBase"></a>

*No description*

#### Constructor

```
new(): ClusterBase
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>attributes(): ClusterAttributes</code> | *No description* |
| <code>helmProvider(): TerraformProvider</code> | *No description* |
| <code>kubernetesProvider(): TerraformProvider</code> | *No description* |

### eks.Repository (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.eks.Repository"></a>

*No description*

#### Constructor

```
new(props: RepositoryProps): Repository
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>deps</code> | <code>Array<ITerraformDependable></code> | *No description* |
| <code>image</code> | <code>str</code> | *No description* |

#### Methods

*No methods*

### eks.Aws (preflight class) <a class="wing-docs-anchor" id="@winglibs/containers.eks.Aws"></a>

*No description*

#### Constructor

```
new(): Aws
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>accountId(): str</code> | *No description* |
| <code>static getOrCreate(scope: IResource): Aws</code> | *No description* |
| <code>region(): str</code> | *No description* |

### IForward (interface) <a class="wing-docs-anchor" id="@winglibs/containers.IForward"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>fromApi(): inflight (request: ApiRequest): ApiResponse?</code> | *No description* |
| <code>fromBucketEvent(): inflight (key: str, type: BucketEventType): void</code> | *No description* |
| <code>fromQueue(): inflight (message: str): void</code> | *No description* |
| <code>fromSchedule(): inflight (): void</code> | *No description* |
| <code>fromTopic(): inflight (message: str): void</code> | *No description* |

### IWorkload (interface) <a class="wing-docs-anchor" id="@winglibs/containers.IWorkload"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>forward(opts: ForwardOptions?): IForward</code> | *No description* |

### ContainerOpts (struct) <a class="wing-docs-anchor" id="@winglibs/containers.ContainerOpts"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>args</code> | <code>Array<str>?</code> | *No description* |
| <code>env</code> | <code>Map<str?>?</code> | *No description* |
| <code>image</code> | <code>str</code> | *No description* |
| <code>name</code> | <code>str</code> | *No description* |
| <code>port</code> | <code>num?</code> | *No description* |
| <code>public</code> | <code>bool?</code> | *No description* |
| <code>readiness</code> | <code>str?</code> | *No description* |
| <code>replicas</code> | <code>num?</code> | *No description* |
| <code>sourceHash</code> | <code>str?</code> | *No description* |
| <code>sources</code> | <code>str?</code> | *No description* |

### ForwardOptions (struct) <a class="wing-docs-anchor" id="@winglibs/containers.ForwardOptions"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>method</code> | <code>HttpMethod?</code> | *No description* |
| <code>route</code> | <code>str?</code> | *No description* |

### WorkloadProps (struct) <a class="wing-docs-anchor" id="@winglibs/containers.WorkloadProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>args</code> | <code>Array<str>?</code> | *No description* |
| <code>env</code> | <code>Map<str?>?</code> | *No description* |
| <code>image</code> | <code>str</code> | *No description* |
| <code>name</code> | <code>str</code> | *No description* |
| <code>port</code> | <code>num?</code> | *No description* |
| <code>public</code> | <code>bool?</code> | *No description* |
| <code>readiness</code> | <code>str?</code> | *No description* |
| <code>replicas</code> | <code>num?</code> | *No description* |
| <code>sourceHash</code> | <code>str?</code> | *No description* |
| <code>sources</code> | <code>str?</code> | *No description* |


