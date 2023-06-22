---
title: "On the salient features of Winglang: a personal perspective"
authors: 
  - rybickic
tags: [cloud-oriented programming, language design, compilers, inflight, cloud services, immutability]
hide_table_of_contents: true
---

In the ever-evolving realm of programming languages, where academia and industry have continuously pushed the boundaries of software design, a new player has emerged: Wing.
As a programming languages enthusiast and self-proclaimed nerd, I couldn't help but be drawn to the challenge of helping build this language that embraces the unique challenges and possibilities of cloud computing (while acknowledging the complexity of the real world).

From my perspective, Winglang is a system that aims to bridge the gap between cloud infrastructure configuration and computational logic.
With its two-phased execution model, Wing encourages developers to think holistically about cloud applications, weaving together the configuration of cloud resources and the code that operates within them.
It's a language that has its roots in the collective wisdom of the programming community, shaped by feedback and collaboration, drawing inspiration from both academic research and real-world industry practices.

In this blog post, I'll share with you the most salient features of Wing that have sparked my enthusiasm so far.
From the concept of cloud services as first-class citizens to its design principle of immutability by default, Wing has introduced both novel and familiar approaches to enhance developer productivity and mitigate common pitfalls in large-scale systems.

Now, before I dive into the features that make Wing distinctive, it's important to note that the language is still in its alpha stage.
This means that it's a work in progress, subject to change as the community continues to shape its future.
Several capabilities aren't implemented yet, so I've marked them with an asterisk (*) - and many of the capabilities that are implemented can still change.

There's also a second caveat, which is that a language is only one piece of the puzzle.
In order to fully realize the benefits of a cloud-oriented language, we think it's necessary to build a robust ecosystem of tools and libraries that support all aspects of the development process.
I think Wing's [standard library] and [development console] will be key parts of this story, but I'm also excited to see what the community will build and how it will shape the future of Wing.

So, join me as we take a tour of some of Winglang's most distinctive design choices!

## Two-phased execution model

Wing’s programming model is built around the idea that cloud applications are defined by both the configuration of cloud resources and the computational logic which executes inside these resources. These two facades are modeled through the notion of `preflight` and `inflight` scopes. The top-level of a program defines a `preflight` scope, and the `inflight` keyword is used to define blocks of code that may be combined, packaged, and executed later on various compute platforms. Inflight functions are able to naturally interact with resources which are defined outside of it, and invoke runtime operations on them. Inflight functions are also asynchronous by default, allowing them to be invoked concurrently.

## Cloud services as first-class citizens

Wing models the notion of cloud resources and services through a class-based data model where all class objects are named and organized into an in-memory tree. This ensures every object can be assigned an application-unique address or "path" that is deterministic across compilations - a common prerequisite for generating reusable cloud infrastructure configuration. Polymorphic classes can be written which are concretized into different implementations depending on the target cloud platform.*

## Metaprogramming capabilities

At the most basic level, the Wing compiler can synthesize any file or directory structure. When used for creating cloud applications, these files are typically a set of infrastructure definitions (such as CloudFormation, Terraform or Kubernetes manifests), Dockerfiles, function code bundles, deployment workflows, and any other artifacts that are needed in order to deliver this application to the cloud.

## Immutability by default

Unexpected mutations are a common source of programmer error in large-scale systems, especially when sharing data across abstraction boundaries. A language-level guarantee that state cannot change offers opportunities for caching and runtime optimizations. To that end, each of Wing’s collection types (`Array`, `Set`, `Map`) has a mutable variant (`MutArray`, `MutSet`, `MutMap`). In addition, variables cannot be reassigned to unless it is opted into with the `var` keyword.

## No null pointers

The initialization state of every variable in Wing can be determined by its type, and every variable must be initialized before it can be used. A common use of null in other languages, to represent an empty state or sentinel value, is subsumed by the language’s more general-purpose `Optional` type, and a selection of syntaxes for easily manipulating `Optional`-typed values.

## Interop with TypeScript/JavaScript

To avoid building an entire language ecosystem from scratch, Wing assumes a JavaScript-based runtime environment, both for dynamically generating configuration files and as the default way to run inflight application code. This makes it straightforward to reuse code from [npm]'s ecosystem of 3M+ packages, and to “escape hatch” into the underlying JavaScript runtime environment for cases where Wing’s abstractions are not sufficient.

[npm]: https://www.npmjs.com/

## JSON as a first-class type

JSON is one of the most widely used protocols for sending and receiving information between internet services due to its simplicity and human-readability. As the lingua franca of the cloud, Wing includes it as a built-in data type, with `Json` and `MutJson` variants. Some of the features enabled by the JSON type to make life easier for developers are schema validation and the ability to parse JSON values into well-typed structs with compiler support.*

## Local type inference

To save some quantity of programmer key-pressing, Wing supports local type inference: signatures of functions and classes always require type annotation, but within the body of a function, many variables can be declared without any annotations, and Wing will infer the variable’s type from its initialization or its usage.

## Object-oriented development

Classes and interfaces are the primary abstraction mechanisms for both composing data and behavior together, and for sharing APIs between different projects or Wing libraries. While OO has gotten a bad rap in various circles due to some languages compelling the use of verbose design patterns, Wing learns from its predecessors to provide an expressive development experience that does not impose excessive boilerplate or incidental complexity.

## Library-author friendly*

All structures defined by the user, such as classes, interfaces, enums, structs, methods, and properties, are private for sharing across module boundaries unless explicitly declared public. The language toolchain contains utilities for comparing the API surface of versions of libraries, and automatically detecting type-level breaking changes to public APIs for enforcing semver compatibility.

## Algebraic data types

Wing contains the usual assortment of algebraic types from functional languages, like function types, tuples*, disjoint union types*, and structs. Algebraic types can be easily destructured into their components, and can be pattern-matched using the switch/match keyword.*

## Generic code*

Wing supports a number of forms of parametric polymorphism, such as classes, iterators, and functions parameterized by other types.

---

If you're curious to learn more or to see examples of real Wing code, check out the [Winglang website](https://winglang.io/) and its [documentation](https://docs.winglang.io/), and join the [Wing Slack](https://t.winglang.io/slack) to get involved in the community.
