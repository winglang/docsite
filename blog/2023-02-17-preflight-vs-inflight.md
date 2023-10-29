---
title: "The Great Divide: Preflight vs Inflight Resource Creation ⚔️"
description: Why does Wing let you only create resources in preflight?
authors: 
  - rybickic
tags: [cloud-oriented programming, winglang, resources, preflight, inflight, iac, security]
hide_table_of_contents: true
---

> Why does Wing let you only create resources in preflight?

![constructs-api-blog-banner](https://github.com/winglang/docsite/assets/2212620/dc35043b-4dca-4591-93f7-03c74c0f2876)

<!--truncate-->

There are two ways to create resources in the cloud: in preflight, or in
inflight. In this post, I'll explore what these terms mean, and why I think
most cloud applications should avoid dynamically creating resources in inflight
and instead stick to managing resources in preflight using tools like IaC.

Today, the cloud computing revolution has made it easier than ever to build
applications that scale to meet the demands of users. However, as the cloud has become more prevalent, it has also become more complex.

One of the important questions you'll have to answer in order to build an
application with AWS, Azure, or Google Cloud is: how should I create the cloud
resources for my application?

For simple applications, you can get away with creating resources by clicking
around in the cloud console. But as your application grows, a more structured
approach is necessary. Infrastructure as code (IaC) tools like Terraform and
CloudFormation have become popular for this purpose.

In general, there are two ways to create cloud resources for an application:
before the application starts running, as part of the deployment process, and
while the application is running, as part of the data path. We refer to these
two phases of the application's lifecycle as **preflight** and **inflight**.
Clever, ha?

In the cloud ecosystem, many cloud services do not make a hard distinction
between APIs that manage resources and APIs that use those resources. For
example, in AWS's documentation for SQS, operations like `CreateQueue` and
`SendMessage` are listed [side by
side](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_Operations.html).
The same goes for Google Cloud's [Pub/Sub
service](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics).

However, there are significant differences between these two types of APIs in
practice. This post will explore why I believe most cloud applications should
avoid dynamically creating resources in inflight and, instead, focus on managing
resources in preflight using tools like IaC.

## Resource management is hard

First, dynamic resource creation introduces enormous complexity from a resource
management perspective. This is the main reason why the IaC tools were created.
Not only is it too cumbersome and error-prone to create large numbers of cloud
resources by clicking buttons in your web browser, but it also becomes difficult
to reliably maintain, update, and track the infrastructure. This is especially
true as you start to pay attention to the cost of your application.

When you use tools like Terraform or CloudFormation, you typically create a YAML
file or JSON file that describes resources in a declarative format. These
solutions have several benefits:

* By using version control, it's easier to identify where resources came from or
when they were changed among different versions of your app (especially across
apps and teams).
* Provisioning tools can detect and fix "resource drift" (when the actual
configuration of a resource differs from the desired configuration).
* You can estimate the cost of your workload based on the list of resources
using tools like [infracost](https://www.infracost.io).
* It's more straightforward to clean up / spin down your application, since all of
the resources in your app are tracked in the file.

When resources are created, updated, and deleted dynamically as part of an
application's data path, we lose many of these benefits. I’ve heard of many
cases where an application was designed around creating resources dynamically,
and entire projects and teams had to be dedicated *just* to writing code that
garbage collects these resources.

There are a few kinds of applications that require dynamic resource creation of
course (like applications that provision cloud resources on behalf of other
users), but these tend to be the exception to the rule.

## Static app architectures are more resilient

Second, dynamic resource creation can make your application more likely to
encounter runtime errors in production. Resource creation and deletion typically
requires performing control plane operations on the underlying cloud provider,
while most inflight operations only require data plane operations.

Cloud services are more fault tolerant when they only depend on data plane
operations as part of the business logic's critical path. This is because even
if the control plane of a cloud service has a partial outage (for example, if
AWS Lambda functions could not be updated with new code), the data plane can
continue running with the last known configuration, even as servers come in and
out of service. This property, called static stability, is a desirable attribute
in distributed systems, and most cloud platforms are designed around these
tradeoffs.

## Dynamic resource creation requires broader security permissions

Lastly, dynamic resource creation means your code needs to have admin-like
permissions, which dramatically increases the attack surface for bad actors.

In the cloud, most machines ultimately need some form of network access -
whether it’s to connect with other VMs in a cluster, or to connect to other
cloud services (like automatically scaling databases and messaging queues).

When resources are statically defined, you can narrowly scope these permissions
to define which resources are exposed to the public, which resources can call
which endpoints, and even which teams can view sensitive data (and how data
accesses are logged and audited).

## How to follow best practices... in practice?

I believe the best way to write applications for the cloud is to define your
resources in preflight, and then use them in inflight. That's why
[Wing](https://www.winglang.io/), the programming language my team and I are building,
encourages developers to create resources in preflight as the easiest path to follow.
We think the
distinction between preflight and inflight is critical, which is why we've [built it
into the language itself](https://docs.winglang.io/concepts/inflights). For example, if you try to
create a resource in a block of code that is labeled with an _inflight_ scope,
Wing will produce a compiler error:

```js
bring cloud;

let queue = new cloud.Queue();
queue.addConsumer(inflight (message: str) => {
  // error: Cannot create the resource "Bucket" in inflight phase.
  new cloud.Bucket();
});
```

Wing is intended to be a general purpose language, so you'll still be able to
make API calls to a cloud providers (through network requests or
JavaScript/TypeScript libraries) to dynamically create resources if you really
want to. But in these scenarios, Wing won't provide resource management
capabilities or generate resource permissions for you, so it would be your
responsibility to manage the resource and ensure they get cleaned up.

If you're curious to learn more, check out our [getting started
guide](https://docs.winglang.io/) or join us on our [community
slack](https://t.winglang.io/slack) and share what kinds of applications you're
building in the cloud! We would love to hear your feedback about this design --
and if you have use case where dynamically creating resources would be helpful,
please share it with us through a [GitHub
issue](https://github.com/winglang/wing/issues/new/choose) or on this blog's
[discussion post](https://github.com/winglang/wing/discussions/1490)! ❤️
