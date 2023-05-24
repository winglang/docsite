---
title: Unlocking Productivity: Winglang's Approach to Developer Experience
description: Exploring how Winglang elevates the DevEx of cloud apps through instant feedback, reduced cognitive load, and keeping developers in their flow.
authors: shaib
tags: [cloud-oriented programming, winglang, developer experience, DevEx]
hide_table_of_contents: true
---

> A 2020 [McKinsey study](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/developer-velocity-how-software-excellence-fuels-business-performance) found that companies with better work environments for their developers achieved revenue growth four to five times greater than that of their competitors.

This quote is taken from a very interesting [article](https://queue.acm.org/detail.cfm?id=3595878) by a group of researchers from DX, University of Victoria and Microsoft, that I recently came accross.

It discusses the concept of Developer Experience (DevEx) and how it impacts developer productivity. 

As you can see from the above quote, DevEx is not just important for developers, but it greately impacts the the bottom lines of the companies that employ them through increased productivity.

While we were not aware of this study when we started building Winglang, we did intuitively understand, as developers, that the current developemnt experience in the cloud is very frustrating, in fact Elad wrote an entire [blog post](https://docs.winglang.io/blog/2022/11/23/manifesto) about it.

Winglang was born to help solve these frustrations with the aim to improve development experience of cloud applications.

Now that we have a research papaper that formally defines what DevEx is, I thought it would be interesting to see how Wing lives up to its promise when looking at it through the lens of these structured definitions.

<!--truncate-->

## How the article defines DevEx

The authors argue that it's not just the output or time to complete tasks that define developer productivity, but a more holistic, developer-centric approach that includes their experiences and feelings towards their work.

They present a framework that distills developer experience into three core dimensions:

1. **Feedback loops:** This refers to the speed and quality of responses to actions performed by developers. Both the feedback from development tools (like code compilation or tests) and from people (like code reviewers) are crucial. Short, fast feedback loops enable developers to complete their work quickly with minimal friction, while slow feedback loops can lead to delays, frustration, and interruptions. To improve DevEx, organizations should strive to shorten feedback loops and optimize both development tools and human hand-off processes.

2. **Cognitive load:** This encompasses the amount of mental processing required for a developer to perform a task. High cognitive load can arise from complex tasks, unfamiliar frameworks, or poorly documented code or systems, and it impedes developers' ability to deliver value. To improve DevEx, organizations should aim to reduce cognitive load by eliminating unnecessary hurdles in the development process, creating well-organized code and documentation, and providing easy-to-use, self-service tools.

3. **Flow state:** This is a mental state of immersion in a task, where the person feels an energized focus and enjoyment. Experiencing flow state at work can lead to higher productivity, innovation, and employee development. Interruptions and delays can hinder a developer's ability to experience flow state, as can lack of autonomy or unclear goals. To improve DevEx, organizations should minimize disruptions, provide developers with autonomy, and ensure that they have opportunities to work on fulfilling challenges.

## How Wing stacks up

### Feedback Loops
Winglang comes with a local simulator and a visualization and debugging console that support instant hot reloading. They allow developers to iterate faster with instant feedback on code changes, visualizing, interacting, and debugging their code locally using the Wing Console. 

By reducing the time to feedback, developers can quickly correct mistakes and improve their solutions.

### Cognitive Load
Winglang reduces developers’ cognitive load by treating abstract cloud resources as native language primitives. This approach minimizes the need for developers to manually manage these resources and deeply understand many layers of the cloud stack. Instead, they can focus on writing application code, while Winglang's compiler takes care of cloud mechanics, including the automatic generation of Identity and Access Management (IAM) policies.

Winglang also introduces features like implicit await for asynchronous calls, further reducing the cognitive load for developers.

### Flow State
Winglang keeps developers immersed in their tasks by:

1. **Minimizing Disruptions:** It provides an integrated development environment where both application and infrastructure code are in the same language and under the same programming model. This reduces context switching, whether it's between languages, tools, or between working on infra and application code. In case the same developer is not working on both the infra and app code, it reduces the context switches associated with communicating between the different developers responsible for the different parts (usually application developers and DevOps).

2. **Providing Autonomy:** Winglang handles cloud mechanics complexities, letting developers focus more on their application and less on infrastructure. This reduces reliance on DevOps and enhances autonomy, fueling a creative flow state.

3. **Fulfilling Challenges:** By abstracting cloud mechanics, developers can focus more on business needs instead of writing glue logic or boilerplate code. This allows them to tackle meaningful challenges, keeping them engaged and productive in their flow state.

