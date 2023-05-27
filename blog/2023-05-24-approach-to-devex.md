---title: DevEx: What Actually Drives Productivity - How does Winglan'gs approach measure up?
description: Evaluation of Winglang's approach for enhancing the Developer Experience (DevEx) of cloud applications using principles presented in an academic paper.
authors: shaib
tags: [cloud-oriented programming, winglang, developer experience, DevEx]
hide_table_of_contents: true
---

> "A 2020 [McKinsey study](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/developer-velocity-how-software-excellence-fuels-business-performance) found that companies with better work environments for their developers achieved revenue growth four to five times greater than that of their competitors".

This quote is taken from an enlightening [article](https://queue.acm.org/detail.cfm?id=3595878) by researchers from DX, University of Victoria, and Microsoft, which I stumbled upon recently.

The article delves into the concept of Developer Experience (DevEx) and its profound influence on developer productivity.

As a developer, I am delighted to see that a leading consulting company is using empirical evidence to evagelize to companies that it is in their best interest to make my life easier :)

While we didn't know about this study when we started working on Winglang, we did instinctively realize that the existing cloud development experience is very frustrating and wanted to enhance it in order to unlock the cloud for developers. Elad dedicated an entire [blog post](https://docs.winglang.io/blog/2022/11/23/manifesto) to this issue.

Now, with a research paper that officially defines DevEx, I find it intriguing to evaluate Winglang's approach to improving DevEx for cloud apps through the prism of these structured definitions.
This is not an evaluation of whether we actually achieve our goals. Such an evanluation would have to be conducted on actual developers with a more mature version of Wing. But it is a status check to see in what ways we are attempting to improve DevEx and how these ways are related to those presented in the article.

I think it is valuable for us as the developers of Wing to hold such discussions in a structured way based on well defined criteria in the cited article, and I hope it will be an interesting read for readers of this post and that you will participate in the discussion with us.

<!--truncate-->

## DevEx as Defined in the Article

The authors argue that developer productivity isn't just about the end result or task completion time but a more comprehensive, developer-oriented approach that encompasses their experiences and attitudes towards their work.They present a framework that condenses the developer experience into three primary dimensions:

1. 1. **Feedback loops:** This term refers to the pace and quality of responses developers receive to their actions. Both feedback from development tools (such as code compilation or tests) and from pple (like code reviewers) are vital. Swift, concise feedback loops enable developers to finalize their work swiftly with minimal resistance, whereas sluggish feedback loops can lead to delays, exasperation, and disruptions. To enhance DevEx, organizations should aim to expedite feedback loops and optimize both development tools and human hand-off procedures.

2. **Cognitive load:** This concept covers the volume of mental processing required for a developer to execute a task. High cognitive load can stem from complicated tasks, unfamiliar frameworks, or inadequately documented code or systems, obstructing developers' capacity to deliver value. To augment DevEx, organizations should strive to decrease cognitive load by eradicating needless obstacles in the development process, creating well-structured code and documentation, and offering user-friendly, self-service tools.

3. **Flow state:** This is a mental zone of immersion in a task, where the individual experiences a sense of energized focus and enjoyment. Encountering a flow state at work can trigger increased productivity, innovation, and personal growth. Interruptions, delays, lack of autonomy, or unclear goals can obstruct a developer's capacity to achieve a flow state. To elevate DevEx, organizations should minimize disruptions, grant developers autonomy, and ensure they have opportunities to engage in fulfilling challenges.

## Winglang's Approach Against These Parameters

### Feedback Loops
Winglang comes with a local simulator and a visualization and debugging console that support instant hot reloading.These tools empower developers to iterate more swiftly with immediate feedback on code modifications, visualizing, interacting, and debugging their code locally via the Wing Console. By minimizing the delay in feedback, developers can promptly rectify errors and enhance their solutions.

### Cognitive Load
Winglang lightens developers’ cognitive load by representing abstract cloud resources as native language elements. This strategy diminishes the need for developers to manually control these resources or deeply understand numerous layers of the cloud stack. Instead, they can focus their efforts on crafting application code, while Winglang's compiler handles the cloud mechanics, including the automated generation of Identity and Access Management (IAM) policies.Winglang also introduces features such as implicit await for asynchronous calls, further alleviating developers' cognitive burden.### Flow StateWinglang keeps developers immersed in their tasks by:
1. **Minimizing Disruptions:** It offers an integrated development environment where both application and infrastructure code are composed in the same language and follow the same programming model. This reduces context switching, whether between languages, tools, or infra and application code. If different developers are handling infra and app code, it mitigates the context switches associated with communication between them (typically application developers and DevOps).
2. **Providing Autonomy:** Winglang handles cloud mechanics, enabling developers to focus more on the business logic of their applications and less on infrastructure. This lessens dependence on DevOps and boosts autonomy, stimulating a creative flow state.
3. **Fulfilling Challenges:** By abstracting cloud mechanics, developers can focus more on addressing business needs instead of writing glue logic or boilerplate code. This allows them to grapple with meaningful challenges, keeping them engaged and productive in their flow state.

## Conclusion
It is very fulffiling to see that something you felt intuitively holds against a more formal inspection.I tried to keep this post short, so I didn't dive too deeply into how Wing stacks up against each of the three parameters.You are welcome to check our [docs](https://docs.winglang.io) to learn more, or experience the experience in our [playground](https://play.winglang.io).
