---
title: We are not giving up on the cloud!
description: Announcing our seed funding round for Wing Cloud
authors: 
  - eladb
tags: [wing cloud, funding, seed, press release]
hide_table_of_contents: true
---

All comedowns are painful, and it seems like our come down from the cloud's [hype curve] is no
different. A grieving process of an industry. When [@dhh](https://twitter.com/dhh) writes about
["Why we're leaving the cloud"](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0) and
Prime Video are [mourning the unexpected costs of serverless], it's not easy to read, especially for
a cloud believer like myself.

And even if companies are not stocking up on server racks, there's a strong sentiment of compromise.
The complexity is overwhelming and teams are really struggling to set up reasonable development
environments, test their systems or deploy them across environments, let alone multiple public
providers or private clouds. 

I don't think I've ever talked to a platform team that feels like they got the platform right or to
a DevOps engineer with a manageable ticket queue. There's frustration and apologies "I know this is
not ideal, but we got to give developers a way to develop". When I talk to enterprises, many of them
are in analysis-paralysis mode. Which cloud provider do we sell our souls to? Are we a serverless
shop or a Kubernetes shop? Do we need to teach developers what IP routing tables are now?

In a way, I think this is why Kubernetes is popular. It perpetuates the old way of building:
developers write some monolithic server and "the cloud" is basically a container orchestration
system that spins up instances of this program as many times as needed to handle the scale. And when
you ask Kubernetes shops about other cloud resources they use, I hear denial. It always starts with
"everything is in our Kubernetes", and then, "oh, yes, we have these couple of queues, and a CDN,
and a DynamoDB table, and a few Lambda functions, and just last week, the dev team needed a bucket
for something, which reminds me, we only provisioned the staging one, but not the one in
production".

On the outset, the idea of the cloud makes total economic sense. It's the classic
total-cost-of-ownership "buy versus build" enabler. You walk into a huge candy store and pick and
choose the building blocks for your application. All these cool managed services at the palm of your
hand, so you can focus on creating value to *your* users.

But in reality, by transferring some of these aspects of your application to cloud services, it also
means that now these aspects move from the category of "application" and become "infrastructure". In
practice, this means that your application code treats these services as some external entities and
managing them happens in separate tools, workflows and oftentimes, on a separate team.

Now, in order to add a route to my REST API, I need to submit a ticket to my DevOps team, or update
some YAML in some repo that I don't fully understand. And I can only test this new API route in a
shared staging environment. That's not good.

The complexity is staring to bury us because we are not expressing our intent at the right level.

So how can we realize the potential of the cloud, but also not burry teams in its complexity? As a
software developer, I'm sorry but I would have to say *abstractions*.

[Yuval Noah-Harari](https://en.wikipedia.org/wiki/Yuval_Noah_Harari) talks about the ability of
**language** to abstract and assign meaning has enabled humans to establish common understandings
and cooperative behaviors over the course of our short history on this planet. Abstractions in
software are no different.

We believe that with the right abstractions, the cloud will be able to fullfil its true potential.
We believe it is possible to establish a better model for building and operating systems with on top
of this powerful computing platform through new common understandings and better collaboration
within engineering organizations.

We call this abstraction **Wing Cloud**, and we are excited to share that we've partnered with an
amazing group of investors such as [Battery Ventures](https://www.battery.com/), [Grove
Ventures](https://www.grovevc.com/) and [StageOne Ventures](https://stageonevc.com/) as well as an
incredible crew of [funds and angels](TBD) from across the industry on the journey to turn this idea
into a reality.

**So what is Wing Cloud**? It is a new kind of *abstract cloud*. It doesn’t involve data centers,
machines, or provisioning engines. Instead, it’s a layer that enable companies to utilize the cloud
as a general-purpose computing platform. It does that through a programming and operational model
that spans both infrastructure and application across all cloud providers and services.

Wing Cloud is a unified programming and operational model that spans all providers and services. It
celebrates the choice and flexibility the cloud has to offer without compromising the developer
experience and engineering practices.

So how does that look like in practice? Our vision for Wing Cloud consists of three main components:

1. A programming language for the cloud, aptly called **Winglang**.
2. An high level cloud SDK, aptly called **Wing Cloud Library**.
3. An application-centric operational console, aptly called **Wing Console**.

### Why are we building a programming language?

With **Winglang**, developers are able to write code that includes both infrastructure **and**
runtime code. This means that when a cloud resource is needed, developers can just add it to their
 code and interact with it in the same way they interact with in-memory objects in traditional
languages. The Winglang compiler takes care of the mechanics required to provision the resource,
configure the minimal IAM permissions and wire up the infrastructure configuration so your code can
interact with this resource at runtime.

You might be wondering why this couldn't be implemented as a library within an existing language.
This is because existing languages don't have language constructs that can express the distributed
nature of cloud applications. To address this, Winglang has two execution phases: *preflight* and
*inflight*. The preflight phase defines your application's infrastructure and the inflight phase
defines its runtime behavior.

Another way to think about it is *space* versus *time*. Think about programming languages as
storytelling devices. Traditional languages are designed to tell a linear story: first this
happened, then that, and so on. Basically the traditional purpose of programming languages was to
describe a sequence of instructions for the CPU. They tells the story of a program over **time**.

But when it comes to cloud applications, the story is not linear. There are multiple storylines
running together, interacting with and affecting each other. It's not just about what happens
*when*, but also *where*. There's a *spatial dimension* to account for, and it's a dimension our
current languages are just don't designed to express.

But preflights and inflights are just the tip of the iceberg in terms of what a language for the
cloud can offer. Think about things like API endpoints and clients, telemetry, metrics and alarms,
data schemas, and more. We have plans to bake many of these capabilities into the language and the
standard library so that developers can truly focus on building their applications.

### A standard library for the cloud

The second piece of the puzzle is what we call the **Wing Cloud Library** (WCL). This is a library
of classes that represent common resources for building cloud applications. You can think of the WCL
as a [standard library](https://en.wikipedia.org/wiki/Standard_library) for the cloud. Similarly to
how standard libraries in traditional languages abstract the operating system, WCL abstracts cloud
providers and services.

We believe the cloud has finally matured to the point where it is possible to establish these
standard abstractions and that they will carry over successfully across public and private cloud
providers. We didn't always have that level of abstraction with standard libraries. When I started
programming, I needed to know exactly which operating system (and even which file system) I was
using in order to write a file. Now, I can just call `writeFile()` and it will work across all
platforms. 

The WCL is designed from the ground up to support multiple targets for each resource. Classes in the
library only define an abstract API, and it is possible to inject concrete implementations at
compile time (technically this happens when the Wing preflight code is executed by the compiler).
This powerful mechanism means that code written against these APIs is **portable across cloud
providers and provisioning engines**.

And of course, we think of of WCL as the foundation for an ecosystem of cloud abstractions. The
programming model is open and extensible and anyone will be able to publish libraries and implement
backends for existing resources based on the needs of their environment.

The WCL is a major project and it's early days. You can see the coverage of resources and targets
through this [compatibility
matrix](https://www.winglang.io/docs/standard-library/compatibility-matrix) and make sure to "+1"
the relevant issue if coverage is missing.

Currently, WCL can only be used from Winglang code, but we are considering releasing it to other
languages as well. The WCL is built using CDK technologies such as
[JSII](https://github.com/aws/jsii) and [constructs](https://github.com/aws/constructs), so
technically it is possible to publish it to other languages.

### Reducing iteration time from minutes to milliseconds

The #1 factor in developer productivity is the time it takes to perform a single iteration
(sometimes called the *inner dev loop* cycle). This is the time it takes to run my code and check
that it does what I expected it to do. 

The more an application leans on the cloud, the more this cycle is broken. If for every iteration, I
need to deploy my code to a personal cloud account, it means that a cycle takes multiple minutes
(depending on the resources I deploy). Then, having to switch to some other system to run my code
and trace the logs also increases this iteration time and breaks my development flow.

Some tools are trying to address this problem by "hot swapping" runtime code in the cloud, or by
proxying requests into my local machine so I can debug locally. But those solutions are only partial as they only take care of the runtime code and not on the entire application. If something changes in my infrastructure, I go back to waiting.

I personally believe that in most cases using real cloud resources for development iterations is
never going to get us to developer experience nirvana. This is because when we provision resources
in the cloud, we leverage their [control plane](https://en.wikipedia.org/wiki/Control_plane), which,
by definition, is not optimized for latency.

In Wing, thanks to the cloud abstraction layer, we are able to take a different approach. The same mechanism we have for cloud portability is used to implement a local cloud simulation target for each resource in the WCL. This means that my entire Wing application can run in a local machine and functionally tested.

### Tests as first-class citizens

We love tests. We think tests are likely the most important asset a software team builds. Our code
can be changed and refactored as much as we like, but our tests capture the expectations from our
system.

The reality of the cloud today is that it is almost impossible to write effective tests that cover
more than just the application code. With Wing, this can now change.

The fact we have a simulator means that it is now possible to **write unit tests** which not only
validate my runtime code, but also how this code is interacting with the infrastructure around it
and with other pieces of my system.

To that end, the Wing language, the SDK and the Wing Console all work together to offer first-class
support for [cloud testing](https://www.winglang.io/docs/concepts/tests).

![screenshot]()

Tests in Wing are multi-cloud by default and can all run in parallel because they use cloud
functions as their compute resource. Every test you write can be execute locally in the cloud
simulator and can also be deployed and executed across all supported cloud providers.

We believe that being able to run and test cloud applications locally is a game changer for
developers. It's definitely a game changer for us!

### Stack traces for the cloud

The last piece of our story is the **Wing Console**. It's a UI tool for interacting with cloud
applications. It displays a visual diagram of your application which shows the hierarchial structure
of your system as well as the relationships between resources. In the future, it will show Open
Telemetry events as the system is activated.

![screenshot]()

In the console, each resource also has dedicated UI which can be used to interact with the resource.
You can invoke functions, push messages to the queue, download and upload files to a bucket and even
open a website. In the future, custom UIs can be created for any resource.

Today, Wing Console only supports local development. It is baked into the Wing CLI and VSCode
experience. To open it, just run `wing it` and it will just work with no additional setup needed. It
will also watch for any file changes, recompile and reload as needed. Batteries included.

**We are planning to offer Wing Console for production**. This means that users will be able to
connect to a deployed system and operate their production systems through Wing Console. 

[Join the waiting list]()

We believe this addresses a major pain when operating cloud applications today. Today, when we
manage applications "from the bottom", from the resources up. I go to my cloud provider's
administration console and what I see is a bunch of low-level resources - queues or buckets or
functions. I don't see my application. I oftentimes also have to juggle to separate administrative
tools for services that are outside of my provider's platform.

Going back to my favorite Lego analogy: Think about a cloud application as this beautiful Lego
castle. I've finished building my castle, and now I now I want to open the main gate. I log into the
provider's console and I see a menu of Lego block types: all the reds, all the 4 piece blues, all
the flat surfaces, etc. My gate is built out of reds and blues and greens and a bunch of cables. But
I can't see a gate. I just see the building blocks from which it's constructed. How would I know
which blue piece to move and where in order to open the gate?

This is the experience we have today when we operate applications in the cloud. We get an alarm that
there are some errors from some Lambda function. How do we know which part of system is affected?
Which team owns this part?

The solution, today, is dashboards. I have to manually craft these views to represent the mental
model of my system. I take the red and green and blue pieces and arrange them together under the
title "Gate", and now if there's an error, I can tell where it belongs.

It goes back to the *space and time* analogy. The operational experience of Wing Console is based on
Wing's *spacial view* of the system. Every resource or event can be *traced back* to the logical
unit it belongs to. This is basically the purpose of stack traces in traditional languages - an
exception is thrown and the stack trace helps me trace back from low-level to high-level so I can
diagnose the problem.

### Fully customizable below the abstraction

We are not naive to think that we can create an abstraction that will cover all use cases and
possible setups. In fact, Wing is designed from the ground up to *celebrate cloud choice and
diversity* and includes multiple levels of extensibility and customizability.

One dimension of extensibility is support for any resource from the IAC ecosystem of the target as
first-class citizens. For example, if you compile you Wing code to Terraform (`tf-aws`, `tf-azure`,
`tf-gcp`), then you can use any resource in the [Terraform Registry](registry.terraform.io) in your
Wing code. If you compile to AWS CDK, you can use any [AWS CDK
construct](https://docs.aws.amazon.com/cdk/api/v2/) in your code (L1s, L2s and any construct library
from the [Construct Hub](https://constructs.dev/)). Naturally, if you use any of these resources,
they will only work when deploying to the cloud, but there is built-in support in Wing for providing
a local implementation for them.

Another dimension is what we call [Wing Compiler
Plugins](https://www.winglang.io/docs/tools/compiler-plugins). Those are hooks implemented through
JavaScript functions that can customize the output of the Wing compiler. These plugins are extremely
powerful and work **below the abstraction line**. This means that they can utilize capabilities that
are provider-specific, **enforce policies**, **apply compliance rules**, etc. We believe these
plugins can be used by platform and centralized cloud teams to enforce and apply common standards
within a company in a streamlined ways for developers.

### We are just getting started

We believe in the cloud. We believe in it's economic sense, it's diversity and choice. We believe
we'll be building stuff on the cloud for the foreseeable future. Even with AI around. We think our
industry is ready for a model that transcends specific providers or stacks and gives developers the
right tools to build.

We know it's a big journey, and we couldn't be more excited to embark on it with these incredible
partners, and the amazing team and community that's forming around this vision.

We hope to make the cloud a better place to build software, so don't give up on it. We are certainly not.

Welcome to Wing Cloud!