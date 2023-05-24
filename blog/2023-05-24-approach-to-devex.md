---
title: Unlocking Productivity: The Winglang Approach to Boosting Developer Experience
description: Dive into how Winglang enhances the Developer Experience (DevEx) of cloud applications through instant feedback, reduced cognitive load, and maintaining developer flow.
authors: shaib
tags: [cloud-oriented programming, winglang, developer experience, DevEx]
hide_table_of_contents: true
---

> A 2020 [McKinsey study](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/developer-velocity-how-software-excellence-fuels-business-performance) found that companies with better work environments for their developers achieved revenue growth four to five times greater than that of their competitors.

This quote is taken from an enlightening [article](https://queue.acm.org/detail.cfm?id=3595878) by researchers from DX, University of Victoria, and Microsoft, which I stumbled upon recently.

The article delves into the concept of Developer Experience (DevEx) and its profound influence on developer productivity.

From the quote above, it is clear that DevEx is not just crucial for developers but also profoundly influences the bottom lines of the organizations they work for, primarily through enhanced productivity.

While we didn't have the knowledge of this study when we started the development of Winglang, as developers, we instinctively realized that the existing cloud development experience was very frustrating. In fact, Elad dedicated an entire [blog post](https://docs.winglang.io/blog/2022/11/23/manifesto) to this issue.

As Elad's post explains, Winglang was conceived as a solution to these challenges, intending to enhance the development experience of cloud applications.

Now, with a research paper that officially defines DevEx, I found it intriguing to evaluate how Winglang delivers on its promise when examined through the prism of these structured definitions.

<!--truncate-->

## DevEx as Defined in the Article

The authors argue that developer productivity isn't just about the end result or task completion time but a more comprehensive, developer-oriented approach that encompasses their experiences and attitudes towards their work.

They present a framework that condenses the developer experience into three primary dimensions:

1. **Feedback loops:** This term refers to the pace and quality of responses developers receive to their actions. Both feedback from development tools (such as code compilation or tests) and from people (like code reviewers) are vital. Swift, concise feedback loops enable developers to finalize their work swiftly with minimal resistance, whereas sluggish feedback loops can lead to delays, exasperation, and disruptions. To enhance DevEx, organizations should aim to expedite feedback loops and optimize both development tools and human hand-off procedures.

2. **Cognitive load:** This concept covers the volume of mental processing required for a developer to execute a task. High cognitive load can stem from complicated tasks, unfamiliar frameworks, or inadequately documented code or systems, obstructing developers' capacity to deliver value. To augment DevEx, organizations should strive to decrease cognitive load by eradicating needless obstacles in the development process, creating well-structured code and documentation, and offering user-friendly, self-service tools.

3. **Flow state:** This is a mental zone of immersion in a task, where the individual experiences a sense of energized focus and enjoyment. Encountering a flow state at work can trigger increased productivity, innovation, and personal growth. Interruptions, delays, lack of autonomy, or unclear goals can obstruct a developer's capacity to achieve a flow state. To elevate DevEx, organizations should minimize disruptions, grant developers autonomy, and ensure they have opportunities to engage in fulfilling challenges.

## Winglang's Performance Against These Parameters

### Feedback Loops
Winglang comes with a local simulator and a visualization and debugging console that support instant hot reloading.
These tools empower developers to iterate more swiftly with immediate feedback on code modifications, visualizing, interacting, and debugging their code locally via the Wing Console. 

By minimizing the delay in feedback, developers can promptly rectify errors and enhance their solutions.

### Cognitive Load
Winglang lightens developers’ cognitive load by representing abstract cloud resources as native language elements. This strategy diminishes the need for developers to manually control these resources or deeply understand numerous layers of the cloud stack. Instead, they can focus their efforts on crafting application code, while Winglang's compiler handles the cloud mechanics, including the automated generation of Identity and Access Management (IAM) policies.

Winglang also introduces features such as implicit await for asynchronous calls, further alleviating developers' cognitive burden.

### Flow State
Winglang keeps developers immersed in their tasks by:
1. **Minimizing Disruptions:** It offers an integrated development environment where both application and infrastructure code are composed in the same language and follow the same programming model. This reduces context switching, whether between languages, tools, or infra and application code. If different developers are handling infra and app code, it mitigates the context switches associated with communication between them (typically application developers and DevOps).
2. **Providing Autonomy:** Winglang handles cloud mechanics, enabling developers to focus more on the business logic of their applications and less on infrastructure. This lessens dependence on DevOps and boosts autonomy, stimulating a creative flow state.
3. **Fulfilling Challenges:** By abstracting cloud mechanics, developers can focus more on addressing business needs instead of writing glue logic or boilerplate code. This allows them to grapple with meaningful challenges, keeping them engaged and productive in their flow state.