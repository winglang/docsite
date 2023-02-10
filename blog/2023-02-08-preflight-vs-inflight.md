---
title: "The Great Divide: Preflight vs Inflight Resource Creation ⚔️"
description: Why does Wing only let you create resources in preflight?
authors: 
  - rybickic
tags: [cloud-oriented programming, winglang, resources, preflight, inflight, iac, security]
hide_table_of_contents: true
---

Today, the cloud computing revolution has made it easier than ever to build
applications that scale to meet demand. But as the cloud has become more
ubiquitous, it’s also become more complex.

One of the important questions you'll have to answer in order to build an
application on top of AWS, Azure, or Google Cloud is: how should I be creating
cloud resources for my application?

For very simple applications, you can get away with creating resources by clicking
in the cloud console. But as your application grows, you'll need to start
thinking about how to manage your resources in a more structured way. This is
where infrastructure as code (IaC) tools like Terraform and CloudFormation have
become popular.

In general, there are two places you can create resources:

* Before your application starts running, as part your app's deployment.
* While your application is running, as part of your app's data path.

In the context of the _cloud_, we find it helpful to imagine our applications as
software that "take flight" through the cloud. Hence, we like to call these two
part's of the app's lifecycle **preflight** and **inflight**. Clever, right? 😎

When you look at the cloud ecosystem, you’ll notice that most cloud services
don't make a hard distinction between APIs that manage resources and APIs that
use those resources. For example, in [AWS's documentation for
SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_AddPermission.html)
(Amazon's distributed queue service), you can see that operations like
`CreateQueue` and `SendMessage` are listed side by side. In Google Cloud's
documentation for their Pub/Sub service, we see the [same
thing](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics)
-- creating topics and publishing to topics are serviced as part of a single set
of APIs.

But in practice, there are important differences between these two kinds of
APIs. In this post, we'll explore why we think most cloud applications should
avoid dynamically creating resources in inflight, and instead stick to managing
resources in preflight using tools like IaC.

## Resource management is hard

First, dynamic resource creation introduces enormous complexity from a resource
management perspective. This is a large part of the reason why the IaC tools
were created. Not only is it too cumbersome and error-prone to create large
numbers of cloud resources by clicking buttons in your web browser, but it also
becomes difficult to reliably maintain, update, and track the infrastructure.
This becomes increasingly true as you start to pay attention to the cost of your
application.

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
in distributed systems.

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

## How do you follow best practices... in practice?

We think the best way to write code that works with cloud resources is to create
your resources in preflight, and then use those resources in inflight.

That's why the design of Wing, the programming language we are building,
encourages developers to create resources in preflight as the path of [least
friction](./2023-02-02-good-cognitive-friction.md). In fact, we think the
distinction between preflight and inflight is so important that we've built it
into the language.

Using Wing, you can create resources in preflight by simply initializing one
of the batteries-included resources, like `Bucket` or `Queue` or `Topic`. Then,
you can use those resources in inflight by referencing them like any other
code:

```js
bring cloud;

let queue = new cloud.Queue(timeout: 2m);
let bucket = new cloud.Bucket();
let counter = new cloud.Counter(initial: 100);

queue.on_message(inflight (body: str): str => {
  let next = counter.inc();
  let key = "myfile-${next}.txt";
  bucket.put(key, body);
});
```

In this example, a set of resources are created, and a remote function is
defined to listen to messages from a message queue that will increment an
distributed counter, and then upload the message body to a file in a cloud
object store.

The `inflight` keyword is something new that we've added to Wing. It's similar
to `async` in JavaScript, but it's used to mark functions that can be bundled
and then executed in the cloud.

>
> Remember what we said about dynamic resource creation being dangerous? If you
> try creating a `new cloud.Bucket()` or `new cloud.Counter()` inside of an
> inflight code block, you’ll get a compiler error in Wing:
>
> ```
> Error: Cannot create the resource "Bucket" in inflight phase.
> ```
>
> That's static analysis in action!
>

When a Wing compiles your program, it will generate the necessary infrastructure
to run the program in your target cloud (like AWS or Azure) in the form of
Terraform code[^1]. This means that you can use Wing to create cloud
applications end-to-end without having to write any YAML or JSON templates
yourself.

In the future, Wing will let you make network requests or call into JavaScript
and TypeScript libraries in inflight code, so you can still directly make API
calls to a cloud provider (like Azure or AWS) to create resources dynamically if
you want to. But in these scenarios, Wing won't provide resource management
capabilities or generate resource permissions for you, so it would be your
responsibility to manage the resource and ensure it gets cleaned up.

[^1]: Other provisioning engines to be supported in the future, based on community interest!

## Closing thoughts

Wing is still early in development, but if you're curious to learn more, check
out our [getting started guide](https://docs.winglang.io/getting-started) or
join us on our [community slack](https://t.winglang.io/slack)! We would love to
hear your feedback about this design -- and if you have a use case where
dynamically creating resources would be useful, please share it with us through
a [GitHub issue](https://github.com/winglang/wing/issues/new/choose) or on this
blog's [discussion post](https://github.com/winglang/wing/discussions/1490)! ❤️
