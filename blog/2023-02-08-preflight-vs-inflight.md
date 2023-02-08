---
title: The Great Divide: Preflight vs Inflight Resource Creation
description: Why does Wing only let you create resources in preflight?
authors: 
  - rybickic
tags: [cloud-oriented programming, winglang, resources, preflight, inflight, iac, security]
hide_table_of_contents: true
---

Wing is a cloud-oriented programming language we’re building that aims to break
down boundaries that get in the way of building applications using cloud
services.

One of the main features Wing is that it distinguishes between "preflight code"
(code that defines your cloud infrastructure, and runs as part of compilation) –
and "inflight code" (code that runs in the cloud, at runtime). We believe this
distinction – and the ability to write code that reaches across the
preflight-inflight boundary using safe abstractions – makes it easier to build
scalable cloud applications, both by encouraging best practices, and helping
developers avoid common pitfalls.

One of the important differences between preflight and inflight is that
resources can only be created in preflight. For example, if you try creating a
`new cloud.Bucket()` or `new cloud.Counter()` inside of an inflight method,
you’ll get a compiler error message: `Cannot create the resource "Bucket" in
inflight phase`.

**So why doesn’t Wing let you create resources while inflight?**

Even though Wing makes a distinction between preflight and inflight operations
(like creating a bucket versus putting an object inside a bucket), most cloud
providers typically don't make this same distinction in their APIs.

For example, in [AWS's documentation for
SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_AddPermission.html)
(Amazon's distributed queue service), you can see that operations like
`CreateQueue` and `SendMessage` are listed side by side. In Google Cloud's
documentation for their Pub/Sub service, we see the [same
thing](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics)
-- creating topics and publishing to topics are serviced as part of a single set
of APIs.

**The reason Wing limits resource creation to the preflight phase is because we
believe dynamic resource creation leads to applications that are less stable and
harder to maintain.** Let’s dive into why this is.

## Resource management is hard

First, dynamic resource creation introduces enormous complexity from a resource
management perspective. This is part of the reason why the IaC (infrastructure
as code) tools were created. Not only was it too cumbersome and error-prone to
create large numbers of cloud resources by clicking on buttons in your web
browser, but it also became very difficult to reliably maintain and update the
infrastructure.

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
* It's more straightforward to clean up / spin down your application -- all of
the resources you need to delete are listed in the file.

If resources were created, updated, and deleted dynamically based on app
business logic, we would lose many of these benefits. I’ve heard of countless
examples where resources are created dynamically, and entire projects and teams
are created in organizations dedicated to garbage collecting these resources.

Applications depending on dynamic resource creation are needed in some cases of
course (like applications that provision cloud resources on behalf of a user),
but these tend to be the exception to the rule.

## Static app architectures are more resistant to network changes

Second, dynamic resource creation can make your application less stable – or in
other words, more likely to encounter runtime errors in production. Resource
creation and deletion typically performs control plane operations on the
underlying cloud provider, while most inflight operations only perform data
plane operations.

Cloud services are more fault tolerant when they only depend on data plane
operations as part of the business logic's critical path. This is because even
if the control plane of a cloud resource has an outage (for example, if AWS
Lambda had a partial outage so that Lambda functions could not be updated with
new code), the data plane can continue running with the last known
configuration, even as servers come in and out of service. This property, called
static stability, is a desirable attribute in distributed systems.

## Dynamic resource creation requires dynamic security permissions

Lastly, dynamic resource creation means your code needs to have admin-like
permissions, which dramatically increases the attack surface for bad actors. In
the cloud, most machines ultimately need some form of network access - whether
it’s to connect with other VMs in a cluster, or to connect to other cloud
services (like automatically scaling databases and messaging queues).

When resources are statically defined, you can narrowly scope these permissions
to define which resources are exposed to the public, which resources can call
which endpoints, and even which teams can view sensitive data (and how data
accesses are logged and audited).

## Closing thoughts

For all these reasons, Wing's design encourages developers to create resources
in preflight as the path of least friction. Since Wing will let you make network
requests or make calls into JavaScript or TypeScript libraries in inflight code,
you can still directly make calls to a cloud provider (like Azure or AWS) to
directly request resources to be created in your application logic if you so
choose. But in these scenarios, Wing doesn’t provide any safety or resource
management capabilities for you, so it's your responsibility to manage the
resource and ensure it gets cleaned up.

With these caveats in mind, we would love to hear your feedback about this
design -- and if you have a use case where dynamically creating resources would
be useful, please share it with us! Here is a GitHub discussion for this blog
post: [https://github.com/winglang/wing/discussions/1490]
