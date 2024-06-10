---
title: In Search for Winglang Middleware Part One
description: Winglang middleware
authors:
  - ashersterkin
tags: [cloud-oriented, programming, middleware, platforms]
hide_table_of_contents: true
image: https://miro.medium.com/v2/resize:fit:640/format:webp/1*CrYbo6MTHhudUgazL2h9Vw.png
---

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*CrYbo6MTHhudUgazL2h9Vw.png"/>
</div>

Introducing a new programming language that creates an opportunity and an obligation to reevaluate existing methodologies, solutions, and the entire ecosystem—from language syntax and toolchain to the standard library through the lens of **first principles**.

Simply lifting and shifting existing applications to the cloud has been broadly recognized as risky and sub-optimal. Such a transition tends to render applications less secure, inefficient, and costly without proper adaptation. This principle holds for programming languages and their ecosystems.

Currently, most cloud platform vendors accommodate mainstream programming languages like Python or TypeScript with minimal adjustments. While leveraging existing languages and their vast ecosystems has certain advantages—given it takes about a decade for a new programming language to gain significant traction—it's constrained by the limitations of third-party libraries and tools designed primarily for desktop or server environments, with perhaps a nod towards containerization.

[Winglang](https://github.com/winglang/wing) is a new programming language pioneering a _cloud-oriented_ paradigm that seeks to rethink the cloud software development stack from the ground up. My initial evaluations of
[Winglang's](https://github.com/winglang/wing) syntax, standard library, and toolchain were presented in two prior Medium publications:

1. [Hello, Winglang Hexagon!: Exploring Cloud Hexagonal Design with Winglang, TypeScript, and Ports & Adapters](https://medium.com/itnext/hello-winglang-hexagon-6f2bdb550f37)
2. [Implementing Production-grade CRUD REST API in Winglang: The First Steps](https://medium.com/itnext/implementing-production-grade-crud-rest-api-in-winglang-7b8f6917efc2)

Capitalizing on this exploration, I will focus now on the higher-level infrastructure frameworks, often called 'Middleware'. Given its breadth and complexity, Middleware development cannot be comprehensively covered in a single publication. Thus, this publication is probably the beginning of a series where each part will be published as new materials are gathered, insights derived, or solutions uncovered.

Part One of the series, the current publication, will provide an overview of Middleware origins and discuss the current state of affairs, and possible directions for [Winglang](https://github.com/winglang/wing) Middleware. The next publications will look at more specific aspects.

With [Winglang](https://github.com/winglang/wing) being a rapidly evolving language, distinguishing the core language features from the third-party Middleware built atop this series will remain an unfolding narrative. Stay tuned.

# Acknowledgments

Throughout the preparation of this publication, I utilized several key tools to enhance the draft and ensure its quality.

The initial draft was crafted with the organizational capabilities of [Notion](https://www.notion.so/)'s free subscription, facilitating the structuring and development of ideas.

For grammar and spelling review, the free version of [Grammarly](https://app.grammarly.com/) proved useful for identifying and correcting basic errors, ensuring the readability of the text.

The enhancement of stylistic expression and the narrative coherence checks were performed using the paid version of [ChatGPT 4.0](https://openai.com/gpt-4).

I owe a special mention to [Nick Gal’s](https://profile.typepad.com/ironick) informative [blog post](https://ironick.typepad.com/ironick/2005/07/update_on_the_o.html) for illuminating the origins of the term "Middleware," helping to set the correct historical context of the whole discussion.

While these advanced tools and resources significantly contributed to the preparation process, the concepts, solutions, and final decisions presented in this article are entirely my own, for which I bear full responsibility.

# What is Middleware?

The term "Middleware" passed a long way from its inception and formal definitions to its usage in day-to-day software development practices, particularly within web development.

Covering every nuance and variation of Middleware would be long a journey worthy of a comprehensive volume entitled “The History of Middleware”—a volume awaiting its author.

In this exploration, we aim to chart the principal course, distilling the essence of Middleware and its crucial role in filling the gap between basic-level infrastructure and the practical needs of cloud-based applications development.

## Origins of Middleware

> ![Brian Ranell](https://miro.medium.com/v2/resize:fit:78/1*wwcUBzKuagPLLBCuuiw9ig.png)The concept of _Middleware_ ||traces its roots back to an intriguing figure: the Russian-born British cartographer and cryptographer, Alexander d’Agapeyeff, at the "[1968 NATO Software Engineering Conference](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF)."

Despite the scarcity of official information about d’Agapeyeff, his legacy extends beyond the enigmatic [d’Agapeyeff Cipher](https://en.wikipedia.org/wiki/D%27Agapeyeff_cipher), as he also played a pivotal role in the software industry as the founder and chairman of the "[CAP Group](https://en.wikipedia.org/wiki/CAP_Group)." Insights into the early days of Middleware are illuminated by [Brian Randell](https://en.wikipedia.org/wiki/Brian_Randell), a distinguished British computer scientist, in his recounting of "[Some Middleware Beginnings](https://web.archive.org/web/20131231001745/http://icse08.upb.de/downloads/ICSE08-40yRandellMiddleware.pdf)."

At the [NATO Conference](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF) d’Agapeyeff introduced his Inverted Pyramid—a conceptual framework positioning Middleware as the critical layer bridging the gap between low-level infrastructure (such as Control Programs and Service Routines) and Application Programs:

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*CrYbo6MTHhudUgazL2h9Vw.png"/>
</div>
<p style={{ textAlign: "center" }}>Fig 1: Alexander d'Agapeyeff's Pyramid</p>

Here is how A. d’Agapeyeff explains it:

> _An example of the kind of software system I am talking about is putting all the applications in a hospital on a computer, whereby you get a whole set of people to use the machine. This kind of system is very sensitive to weaknesses in the software, particular as regards the inability to maintain the system and to extend it freely._

> _This sensitivity of software can be understood if we liken it to what I will call the inverted pyramid... The buttresses are assemblers and compilers. They don’t help to maintain the thing, but if they fail you have a skew. At the bottom are the control programs, then the various service routines. Further up we have what I call middleware._

> _This is because no matter how good the manufacturer’s software for items like file handling it is just not suitable; it’s either inefficient or inappropriate. We usually have to rewrite the file handling processes, the initial message analysis and above all the real-time schedulers, because in this type of situation the application programs interact and the manufacturers, software tends to throw them off at the drop of a hat, which is somewhat embarrassing. On the top you have a whole chain of application programs._

> _The point about this pyramid is that it is terribly sensitive to change in the underlying software such that the new version does not contain the old as a subset. It becomes very expensive to maintain these systems and to extend them while keeping them live._

A. d'Agapeyeff emphasized the delicate balance within this pyramid, noting how sensitive it is to changes in the underlying software that do not preserve backward compatibility. He also warned against danger of over-generalized software too often unsuitable to any practical need:

> _In aiming at too many objectives the higher-level languages have, perhaps, proved to be useless to the layman, too complex for the novice and too restricted for the expert._

Despite improvements in general-purpose file handling and other advancements since d’Agapeyeff's time, the essence of his observations remains relevant.

There is still a big gap between low-level infrastructure, today encapsulated in an Operating System, like Linux, and the needs of final applications. The Operating System layer reflects and simplifies access to hardware capabilities, which are common for almost all applications.

Higher-level infrastructure needs, however, vary between different groups of applications: some prioritize minimizing the operational cost, some others - speed of development, and others - highly tightened security.

Different implementations of the Middleware layer are intended to fill up this gap and to provide domain-neutral services that are better tailored to the non-functional requirements of various groups of applications.

This consideration also explains why it’s always preferable to keep the core language, aka [Winglang](https://github.com/winglang/wing), and its standard library relatively small and stable, leaving more [variability](https://www.dre.vanderbilt.edu/~schmidt/PDF/Commonality_Variability.pdf) to be addressed by these intermediate Middleware layers.

## Patterns, Frameworks, and Middleware

The middleware definition was refined in the “[Patterns, Frameworks, and Middleware:
Their Synergistic Relationships](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf)” paper, published in 2003 by [Douglas C. Schmidt](https://en.wikipedia.org/wiki/Douglas_C._Schmidt) and [Frank Buschmann](https://en.wikipedia.org/wiki/Pattern-Oriented_Software_Architecture). Here, they define middleware as:

> _software that can significantly increase reuse by providing readily usable, standard solutions
> to common programming tasks, such as persistent storage, (de)marshaling, message buffering and queueing, request demultiplexing, and concurrency control. Developers who use
> middleware can therefore focus primarily on application-oriented topics, such as business logic, rather than wrestling with tedious and error-prone details associated with programming infrastructure software using lower-level OS APIs and mechanisms._

To understand the interplay between Design Patterns, Frameworks and Middleware, let’s start with formal definitions derived from the “[Patterns, Frameworks, and Middleware: Their Synergistic Relationships](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf)” paper Abstract:

> _Patterns codify reusable design expertise that provides time-proven solutions to commonly occurring software problems that arise in particular contexts and domains._

> _Frameworks provide both a reusable [product-line architecture](https://www.amazon.com/Software-Product-Lines-Practices-Patterns/dp/0201703327) – guided by patterns – for a family of related applications and an integrated set of collaborating components that implement concrete realizations of the architecture._

> _Middleware is reusable software that leverages patterns and frameworks to bridge the gap between the functional requirements of applications and the underlying operating systems, network protocol stacks, and databases._

In other words, Middleware is implemented in the form of one or more Frameworks, which in turn apply several Design Patterns to achieve their goals including future extensibility. Exactly this combination, when implemented correctly, ensures Middleware's ability to flexibly address the infrastructure needs of large yet distinct groups of applications.

Let’s take a closer look at the definitions of each element presented above.

## Design Patterns

In the realm of software engineering, a **Software Design Pattern** is understood as a generalized, reusable blueprint for addressing frequent challenges encountered in software design. As defined by [Wikipedia](https://en.wikipedia.org/wiki/Software_design_pattern):

> In [software engineering](https://en.wikipedia.org/wiki/Software_engineering), a **software design pattern** is a general, [reusable](https://en.wikipedia.org/wiki/Reusability) solution to a commonly occurring problem within a given context in [software design](https://en.wikipedia.org/wiki/Software_design). It is not a finished design that can be transformed directly into [source](https://en.wikipedia.org/wiki/Source_code) or [machine code](https://en.wikipedia.org/wiki/Machine_code). Rather, it is a description or template for how to solve a problem that can be used in many different situations. Design patterns are formalized [best practices](https://en.wikipedia.org/wiki/Best_practice) that the programmer can use to solve common problems when designing an application or system.

Sometimes, the term **Architectural Pattern** is used to distinguish high-level software architecture decisions from lower-level, implementation-oriented [Design Patterns](https://en.wikipedia.org/wiki/Software_design_pattern), as defined in [Wikipedia](https://en.wikipedia.org/wiki/Architectural_pattern):

> An **architectural pattern** is a general, reusable resolution to a commonly occurring problem in [software architecture](https://en.wikipedia.org/wiki/Software_architecture) within a given context. The architectural patterns address various issues in [software engineering](https://en.wikipedia.org/wiki/Software_engineering), such as [computer hardware](https://en.wikipedia.org/wiki/Computer_hardware) performance limitations, [high availability](https://en.wikipedia.org/wiki/High_availability) and minimization of a [business risk](https://en.wikipedia.org/wiki/Business_risk). Some architectural patterns have been implemented within [software frameworks](https://en.wikipedia.org/wiki/Software_framework).

It is essential to differentiate [Architectural](https://en.wikipedia.org/wiki/Architectural_pattern) and [Design Patterns](https://en.wikipedia.org/wiki/Software_design_pattern) from their implementations in specific software projects. While an [Architectural](https://en.wikipedia.org/wiki/Architectural_pattern) or [Design Pattern](https://en.wikipedia.org/wiki/Software_design_pattern) provides an initial idea for solution, its implementation may involve a combination of several patterns, tailored to the unique requirements and nuances of the project at hand.

[Architectural Patterns](https://en.wikipedia.org/wiki/Architectural_pattern), such as [Pipe-and-Filters](https://patterns.eecs.berkeley.edu/?page_id=19), and [Design Patterns](https://en.wikipedia.org/wiki/Software_design_pattern), such as the [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern), are not only about solving problems in code. They also serve as a common language among architects and developers, facilitating more straightforward communication about software structure and design choices. They are also invaluable tools for analyzing existing solutions, as we will see later.

## Software Frameworks

In the domain of computer programming, a **Software Framework** represents a sophisticated form of abstraction, designed to standardize the development process by offering a reusable set of libraries or tools. As defined by [Wikipedia](https://en.wikipedia.org/wiki/Software_framework):

> In [computer programming](https://en.wikipedia.org/wiki/Computer_programming), a **software framework** is an [abstraction](<https://en.wikipedia.org/wiki/Abstraction_(computer*science)>) in which [software](https://en.wikipedia.org/wiki/Software), providing generic functionality, can be selectively changed by additional user-written code, thus providing application-specific software.

> It provides a standard way to build and deploy applications and is a universal, reusable [software environment](<https://en.wikipedia.org/wiki/Software_environment_(disambiguation)>) that provides particular functionality as part of a larger [software platform](https://en.wikipedia.org/wiki/Software_platform) to facilitate the development of [software applications](https://en.wikipedia.org/wiki/Software_application), products and solutions.

In other words, a [Software Framework](https://en.wikipedia.org/wiki/Software_framework) is an evolved [Software Library](<https://en.wikipedia.org/wiki/Library_(computing)>) that employs the principle of [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control). This means the framework, rather than the user's application, takes charge of the control flow. The application-specific code is then integrated through [callbacks](<https://en.wikipedia.org/wiki/Callback_(computer_programming)>) or [plugins](<https://en.wikipedia.org/wiki/Plug-in_(computing)>), which the framework's core logic invokes as needed.

Utilizing a [Software Framework](https://en.wikipedia.org/wiki/Software_framework) as the foundational layer for integrating domain-specific code with the underlying infrastructure allows developers to significantly decrease the development time and effort for complex software applications. Frameworks facilitate adherence to established coding standards and patterns, resulting in more maintainable, scalable, and secure code.

Nonetheless, it's crucial to follow the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) guidelines, which mandate that domain-specific code remains decoupled and independent from any framework to preserve its ability to evolve independently of any infrastructure. Therefore, an ideal [Software Framework](https://en.wikipedia.org/wiki/Software_framework) should support plugging into it a pure domain code without any modification.

## Middleware

The Middleware is defined by [Wikipedia](https://en.wikipedia.org/wiki/Middleware) as follows:

> _**Middleware** is a type of [computer software](https://en.wikipedia.org/wiki/Computer_software) program that provides services to software applications beyond those available from the [operating system](https://en.wikipedia.org/wiki/Operating_system). It can be described as "software glue"._

> _**Middleware** in the context of [distributed applications](https://en.wikipedia.org/wiki/Distributed_application) is [software](https://en.wikipedia.org/wiki/Software) that provides services beyond those provided by the [operating system](https://en.wikipedia.org/wiki/Operating_system) to enable the various components of a distributed system to communicate and manage data. Middleware supports and simplifies complex [distributed applications](https://en.wikipedia.org/wiki/Distributed_application). It includes [web servers](https://en.wikipedia.org/wiki/Web_server), [application servers](https://en.wikipedia.org/wiki/Application_server), messaging and similar tools that support application development and delivery. Middleware is especially integral to modern information technology based on [XML](https://en.wikipedia.org/wiki/XML), [SOAP](https://en.wikipedia.org/wiki/SOAP), [Web services](https://en.wikipedia.org/wiki/Web_service), and [service-oriented architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture)._

Middleware, however, is not a monolithic entity but is rather composed of several distinct layers as we shall see in the next section.

# Middleware Layers

Below is an illustrative diagram portraying Middleware as a stack of such layers, each with its specialized function, as suggested in the [Schmidt and Buchman paper](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf):

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*OrkhM6vKHGKMxdXdqdIbLA.png"/>
</div>
<p style={{ textAlign: "center" }}>Fig 2: Middleware Layers</p>

Fig 2: Middleware Layers in Context

## Layered Architecture Clarified

To appreciate the significance of this layered structure, a good understanding of the very concept of Layered Architecture is essential—a concept too often misunderstood completely and confused with the [Multitier Architecture](https://en.wikipedia.org/wiki/Multitier_architecture), deviating significantly from the original principles laid out by [E.W. Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra).

At the “[1968 NATO Software Engineering Conference](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF),” [E.W. Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra) presented a paper titled “Complexity Controlled by Hierarchical Ordering of Function and Variability” where he stated:

> _We conceive an ordered sequence of machines: A[0], A[1], ... A[n], where A[0] is the given hardware machine and where the software of layer i transforms machine A[i] into A[i+1]. The software of layer i is defined in terms of machine A[i], it is to be executed by machine A[i], the software of layer i uses machine A[i] to make machine A[i+1]._

In other words, in a correctly organized Layered Architecture, the higher-level virtual machine is implemented _in terms of_ the lower-level virtual machine. Within this series, we will come back to this powerful technique over and over again.

## Back to the Middleware Layers

Right beneath the Applications layer resides the Domain-Specific Middleware Services layer, a notion deserving a separate discussion within the broader framework of [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design).

Within this context, however, we are more interested in the Distribution Middleware layer, which serves as the intermediary between Host Infrastructure Middleware within a single "box" and the Common Middleware Services layer which operates across a distributed system's architecture.

As stated in the [paper](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf):

> _Common middleware services augment distribution middleware by defining higher-level domain-independent reusable services that allow application developers to concentrate on programming business logic._

With this understanding, we can now place [Winglang](https://github.com/winglang/wing) Middleware within the Middleware Services layer enabling the implementation of Domain-Specific Middleware Services _in terms of_ its primitives.

To complete the picture, we need more quotes from the “[Patterns, Frameworks, and Middleware: Their Synergistic Relationships](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf)” article mapped onto the modern cloud infrastructure elements.

## Host Infrastructure Middleware

Here is how it’s defined in the [paper](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf):

> **Host infrastructure middleware** encapsulates and enhances native OS mechanisms to create reusable event demultiplexing, interprocess communication, concurrency, and synchronization objects, such as reactors; acceptors, connectors, and service handlers; monitor objects; active objects; and service configurators. By encapsulating the peculiarities of particular operating systems, these reusable objects help eliminate many tedious, error-prone, and non-portable aspects of developing and maintaining application software via low-level OS programming APIs, such as Sockets or POSIX pthreads.

In the AWS environment, general-purpose virtualization services such as [AWS EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) (computer), [AWS VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) (network), and [AWS EBS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ebs-volumes.html) (storage) play this role.

On the other hand, when speaking about the [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) [execution environment](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html), we may identify [AWS Firecracker](https://aws.amazon.com/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/), AWS Lambda standard and custom [Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html), [AWS Lambda Extensions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-extensions.html), and [AWS Lambda Layers](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html) as also belonging to this category.

## Distribution Middleware

Here is how it’s defined in the [paper](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf):

> _**Distribution middleware** defines higher-level distributed programming models whose reusable APIs and objects automate and extend the native OS mechanisms encapsulated by host infrastructure middleware._

> _**Distribution middleware** enables clients to program applications by invoking operations on target objects without hard-coding dependencies on their location, programming language, OS platform, communication protocols and interconnects, and hardware._

Within the AWS environment, fully managed API, Storage, and Messaging services such as [AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html), [AWS SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html), [AWS SNS](https://docs.aws.amazon.com/sns/latest/dg/welcome.html), [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html), and [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) would fit naturally into this category.

## Common Middleware Services

Here is how it’s defined in the [paper](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf):

> _**Common middleware services** augment distribution middleware by defining higher-level domain-independent reusable services that allow application developers to concentrate on programming business logic, without the need to write the “plumbing” code required to develop distributed applications via lower-level middleware directly._

> _For example, common middleware service providers bundle transactional behavior, security, and database connection pooling and threading into reusable components, so that application developers no longer need to write code that handles these tasks._

> _Whereas distribution middleware focuses largely on managing end-system resources in support of an object-oriented distributed programming model, common middleware services focus on allocating, scheduling, and coordinating various resources throughout a distributed system using a component programming and scripting model._

> _Developers can reuse these component services to manage global resources and perform common distribution tasks that would otherwise be implemented in an ad hoc manner within each application. The form and content of these services will continue to evolve as the requirements on the applications being constructed expand._

Formally speaking, [Winglang](https://github.com/winglang/wing), its [Standard Library](https://www.winglang.io/docs/category/standard-library), and its [Extended Libraries](https://github.com/winglang/winglibs) collectively constitute **Common middleware services** built on the top of the cloud platform **Distribution Middleware** and its corresponding lower-level **Common middleware services** represented by the cloud platform [SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/) and various [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code) tools, such as [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) or [Terraform](https://www.terraform.io/).

With [Winglang](https://github.com/winglang/wing) Middleware we are looking for a higher level of abstraction built _in terms of_ the core language and its library and facilitating the development of [production-grade](https://medium.com/itnext/implementing-production-grade-crud-rest-api-in-winglang-7b8f6917efc2) **Domain-specific middleware services** and applications on top of it.

## Domain-Specific Middleware Services

Here is how it’s defined in the [paper](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf):

> **Domain-specific middleware services** are tailored to the requirements of particular domains, such as telecom, e-commerce, health care, process automation, or aerospace. Unlike the other three middleware layers discussed above that provide broadly reusable “horizontal” mechanisms and services, domain-specific middleware services are targeted at “vertical” markets and product-line architectures. Since they embody knowledge of a domain, moreover, reusable domain-specific middleware services have the most potential to increase the quality and decrease the cycle-time and effort required to develop particular types of application software.

To sum up, the [Winglang](https://github.com/winglang/wing) Middleware objective is to continue the trend of the [Winglang](https://github.com/winglang/wing) compiler and its standard library to make developing **Domain-specific middleware services** _[less difficult](https://medium.com/@hackingonstuff/cloud-why-so-difficult-%EF%B8%8F-4e9ef1446a64)._

# Cloud Middleware State of Affairs

Applying the terminology introduced above, the current state of affairs with AWS cloud Middleware could be visualized as follows:

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*uLzuyjbLRD_w77NVGCt0Bg.jpeg"/>
</div>
<p style={{ textAlign: "center" }}>Fig 3: Cloud Middleware State of Affairs</p>

We will look at three leading Middleware Frameworks for AWS:

1. [Middy](https://middy.js.org/) (TypeScript)
2. [Power Tools for AWS Lambda](https://github.com/aws-powertools) ([Python](https://docs.powertools.aws.dev/lambda/python/latest/), [TypeScript](https://docs.powertools.aws.dev/lambda/typescript/latest/), [Java](https://docs.powertools.aws.dev/lambda/java/), and [.NET](https://docs.powertools.aws.dev/lambda/dotnet/))
3. [Lambda Middleware](https://dbartholomae.github.io/lambda-middleware/)

## Middy

If we dive into the [Middy Documentation](https://middy.js.org/docs) we will find that it positions itself as a **middleware engine**, which is correct if we recall that very often [Frameworks](https://en.wikipedia.org/wiki/Software_framework), which [Middy](https://middy.js.org/) is, are called Engines. However, it later claims that “… like generic web frameworks ([fastify](http://fastify.io/), [hapi](https://hapijs.com/), [express](http://expressjs.com/), etc.), this problem has been solved using the [middleware pattern](https://www.packtpub.com/mapt/book/web_development/9781783287314/4/ch04lvl1sec33/middleware).” This is, as we understand now, complete nonsense. If we dive into the [Middy Documentation](https://middy.js.org/docs) [further](https://middy.js.org/docs/intro/how-it-works), we will find the following picture:

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*4bwNcnUdQiKO9o48bRs_5A.png"/>
</div>
<p style={{ textAlign: "center" }}>Fig 4: Middy</p>

Now, we realize that what [Middy](https://middy.js.org/) calls “middleware” is a particular implementation of the [Pipe-and-Filters Architecture Pattern](https://patterns.eecs.berkeley.edu/?page_id=19) via the [Decorator Design Pattern](https://en.wikipedia.org/wiki/Decorator_pattern). The latter should not be confused with [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html). In other words, [Middy](https://middy.js.org/) decorators are assembled into a pipeline each one performing certain operations _before_ and/or _after_ an HTTP request handling.

Perhaps, the main culprit of this confusion is the [expressjs Framework Guide](http://expressjs.com/en/guide/writing-middleware.html) usage of titles like “Writing Middleware” and “Using Middleware” even though it internally uses the term **middleware function**, which is correct.

[Middy](https://middy.js.org/) comes with an impressive list of [official middleware decorator plugins](https://middy.js.org/docs/middlewares/intro) plus a long list of [3rd party middleware decorator plugins](https://middy.js.org/docs/middlewares/third-party)**.**

## Power Tools for AWS Lambda

Here, the basic building blocks are called [Features](https://docs.powertools.aws.dev/lambda/python/latest/#features), which in many cases are [Adapters](https://en.wikipedia.org/wiki/Adapter_pattern) of lower-level [SDK](https://aws.amazon.com/sdk-for-javascript/) functions. The list of features for different languages varies with the [Python version](https://docs.powertools.aws.dev/lambda/python/latest/) to have the most comprehensive one. Features could be attached to Lambda Handlers using language decorators, used manually, or, in the case of [TypeScript](https://docs.powertools.aws.dev/lambda/typescript/latest/), using [Middy](https://middy.js.org/). The term **middleware** pops up [here](https://docs.powertools.aws.dev/lambda/python/latest/utilities/middleware_factory/) and [there](https://middy.js.org/docs/integrations/lambda-powertools/#best-practices) and always means some [decorator](https://en.wikipedia.org/wiki/Decorator_pattern).

## Lambda Middleware

This one is also an implementation of the [Pipe-and-Filters Architecture Pattern](https://patterns.eecs.berkeley.edu/?page_id=19) via the [Decorator Design Pattern](https://en.wikipedia.org/wiki/Decorator_pattern). Unlike [Middy](https://middy.js.org/), individual decorators are combined in a pipeline using a special [Compose decorator](https://dbartholomae.github.io/lambda-middleware/packages/compose/) effectively applying the [Composite Design Pattern](https://en.wikipedia.org/wiki/Composite_pattern).

## Limitations of existing solutions

Apart from using the incorrect terminology, all three frameworks have certain limitations in common, as follows:

1. **The confusing sequence of operation of multiple [Decorators](https://en.wikipedia.org/wiki/Decorator_pattern).** When more than one decorator is defined, the sequence of _before_ operations is in the order of decorators, but the the sequence of _after_ operations is in **reverse order**. With a long list of decorators that might be a source of serious confusion or even a conflict.

2. **Reliance of environment variables.** Control over the operation of particular [adapters](https://en.wikipedia.org/wiki/Adapter_pattern) (e.g. [Logger](https://docs.powertools.aws.dev/lambda/typescript/latest/core/logger/)) solely relies on environment variables. To make a change, one will need to redeploy the Lambda Function.

3. **A single list of decorators with some limited control in runtime.** There is only one list of decorators per Lambda Function and, if some decorators need to be excluded and replaced depending on the deployment target or run-time environment, a run-time check needs to be performed (look, for example, at how [Tracer behavior is controlled](https://docs.powertools.aws.dev/lambda/typescript/latest/core/tracer/) in [Power Tools for AWS Lambda](https://docs.powertools.aws.dev/lambda/typescript/latest/)). This introduces unnecessary run-time overhead and enlarges the potential security attack surface.

4. **Lack of support for higher-level crosscut specifications.** All middleware decorators are specified for individual Lambda functions. Common specifications at the organization, organization unit, account, or service levels will require some handmade custom solutions.

5. **Too narrow interpretation of Middleware as a linear implementation of [Pipe-and-Filers](https://patterns.eecs.berkeley.edu/?page_id=19) and [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern) design patterns.** [Power Tools for AWS Lambda](https://docs.powertools.aws.dev/lambda/typescript/latest/) makes it slightly better by introducing its [Features](https://docs.powertools.aws.dev/lambda/python/latest/#features), also called Utilities, such as [Logger](https://docs.powertools.aws.dev/lambda/typescript/latest/core/logger/), first and corresponding decorators second. [Middy](https://middy.js.org/), on the other hand, treats everything as a decorator. In both cases, the decorators are stacked in one linear sequence, such that retrieving two parameters, one from the [Secrets Manager](https://docs.powertools.aws.dev/lambda/typescript/latest/utilities/parameters/#secretsprovider) and another from the [AppConfig](https://docs.powertools.aws.dev/lambda/typescript/latest/utilities/parameters/#appconfigprovider), cannot be performed in parallel while state-of-the-art pipeline builders, such as [Marble.js](https://docs.marblejs.com/) and [Async.js](http://caolan.github.io/async/v3/), support significantly more advanced control forms.

For [Winglang](https://github.com/winglang/wing) Common Services Middleware Framework (we can now use the correct full name) this list of limitations will serve as a call for action to look for pragmatic ways to overcome these limitations.

# Winglang Middleware Direction

Following the “[Patterns, Frameworks, and Middleware: Their Synergistic Relationships](https://www.dre.vanderbilt.edu/~schmidt/PDF/ICSE-03.pdf)” article middleware layers taxonomy, the [Winglang](https://github.com/winglang/wing) Common Middleware Services Framework is positioned as follows:

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*Kl4UWhR5yvrEdMy32mIlWw.jpeg"/>
</div>
<p style={{ textAlign: "center" }}>Fig 5: Winglang Middlware Layer</p>

In the diagram above, the [Winglang](https://github.com/winglang/wing) Middleware Layer, code name [Winglang](https://github.com/winglang/wing) MW, is positioned as an upper sub-layer of Common Middleware Services, built on the top of the [Winglang](https://github.com/winglang/wing) as a representative of the [Infrastructure-from-Code](https://medium.com/@asher-sterkin/ifc-2023-technology-landscape-6953ff9ab9e5) solution, which in turn is built on the top of the cloud-specific [SDK](https://medium.com/@asher-sterkin/ifc-2023-technology-landscape-6953ff9ab9e5) and [IaC](https://medium.com/@asher-sterkin/ifc-2023-technology-landscape-6953ff9ab9e5) solutions providing convenient access to the cloud Distribution Middleware.

From the feature set perspective, the [Winglang](https://github.com/winglang/wing) MW is expected

1. To be on par with leading middleware frameworks such
   1. [Middy](https://middy.js.org/) (TypeScript)
   2. [Power Tools for AWS Lambda](https://github.com/aws-powertools) ([Python](https://docs.powertools.aws.dev/lambda/python/latest/), [TypeScript](https://docs.powertools.aws.dev/lambda/typescript/latest/), [Java](https://docs.powertools.aws.dev/lambda/java/), and [.NET](https://docs.powertools.aws.dev/lambda/dotnet/))
   3. [Lambda Middleware](https://dbartholomae.github.io/lambda-middleware/)
2. In addition, to provide support for leading open standards such as
   1. [OpenID](https://openid.net/)
   2. [Open Telemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)
   3. [OAuth 2.0](https://oauth.net/2/)
   4. [Async API](https://www.asyncapi.com/en)
   5. [Cloud Events](https://cloudevents.io/)
3. To provide built-in support for cross-cut middleware specifications at different levels above individual cloud functions
4. To support run-time fine-tuning of individual feature parameters (e.g. logging level) without corresponding cloud resources redeployment

Different implementations of [Winglang](https://github.com/winglang/wing) MW will vary in efficiency, ease of use (e.g. middleware pipeline configuration), flexibility, and supplementary tooling such as automatic code generation.

At the current stage, any premature conversion towards a single solution will be detrimental to the [Winglang](https://github.com/winglang/wing) ecosystem evolution, and running multiple experiments in parallel would be more beneficial. Once certain middleware features prove themselves, they might be incorporated into the [Winglang](https://github.com/winglang/wing) core, but it’s advisable not to rush too fast.

For the same reason, I intentionally called this section _Directions_ rather than _Requirements_ or _Problem Statement_. I have only a general sense of the desirable direction to proceed. Making things too specific could lead to some serendipitous alternatives being missed. I can, however, specify some constraints, as follows:

1. **Do not count on advanced [Winglang](https://github.com/winglang/wing) features**, such as [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html), to come. Generics may significantly complicate the language syntax and too often are introduced before a clear understanding of how much sophistication is required. Also, at the early stages of exploration, the lack of Generics support could be compensated by switching to a general-purpose data type, such as [Json](https://www.winglang.io/docs/language-reference#114-json-type), or code generators, including the [“C” macros](https://gcc.gnu.org/onlinedocs/cpp/Macros.html).
2. **Stick with [Winglang](https://github.com/winglang/wing)** and switch to [TypeScript](https://www.winglang.io/docs/language-reference#521-typescript) for implementing low-level extensions only. As a new language, [Winglang](https://github.com/winglang/wing) lacks features taken for granted in mainstream languages and therefore requires some faith to get a fair chance to write as much code as possible, even if it is slightly less convenient. This is the only way for a new programming language to evolve.
3. **If the development of CLI tools is required, prefer TypeScript over other languages such as Python.** I already have the TypeScript toolchain installed on my desktop with all dependencies resolved. It’s always better to limit the number of moving parts in the system to the absolute minimum.
4. **Limit [Winglang](https://github.com/winglang/wing) middleware implementation to** a **single process** of a Cloud Function. Out-of-proc capabilities, such as [AWS Lambda Extensions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-extensions.html), can improve overall system performance, security, and reuse (see, for example, this [blog post](https://aws.amazon.com/blogs/compute/enhancing-runtime-security-and-governance-with-the-aws-lambda-runtime-api-proxy-extension/?advocacy_source=everyonesocial&trk=global_employee_advocacy&sc_channel=sm&es_id=70adde6d15)). However, they are not currently supported by [Winglang](https://github.com/winglang/wing) out of the box. Also, utilizing such advanced capabilities will increase the system's complexity while contributing little, if any, at the semantic level. Exploring this direction can be postponed to later stages.

# What’s Next?

This publication was completely devoted to clarifying the concept of [Middleware](https://en.wikipedia.org/wiki/Middleware), its position within the cloud software system stack, and defining a general direction for developing one or more [Winglang](https://github.com/winglang/wing) Middleware [Frameworks](https://en.wikipedia.org/wiki/Software_framework).

I plan to devote the next Part Two of this series to exploring different options for implementing the [Pipe-and-Filters Pattern](https://patterns.eecs.berkeley.edu/?page_id=19) in [Middleware](https://en.wikipedia.org/wiki/Middleware) and after that to start building individual utilities and corresponding filters one by one.

It’s a rare opportunity that one does not encounter every day to revise the generic software infrastructure elements from the first principles and to explore the most suitable ways of realizing these principles on the leading modern cloud platforms. If you are interested in taking part in this journey, drop me a line.
