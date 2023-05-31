---
title: Evaluation of Winglang's approach to enhancing DevEx
description: Evaluation of Winglang's approach for enhancing the Developer Experience (DevEx) of coding cloud applications using principles presented in a cited academic paper.
authors: shaiber
tags: [cloud-oriented programming, Winglang, developer experience, DevEx]
hide_table_of_contents: true
---

> *"A 2020 [McKinsey study](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/developer-velocity-how-software-excellence-fuels-business-performance) found that companies with better work environments for their developers achieved revenue growth four to five times greater than that of their competitors."*

This quote is from an insightful [article](https://queue.acm.org/detail.cfm?id=3595878) I recently came across, authored by researchers from DX, the University of Victoria, and Microsoft.

The article delves into the concept of Developer Experience (DevEx) and its profound impact on developer productivity.

As a developer, I am delighted to see that a leading consulting firm is using empirical evidence to demonstrate to companies just how important improving my working conditions can be for them :)

As a co-creator of Winglang, which aims to enhance the DevEx of cloud applications, I am happy to find research-backed validation for what we [intuitively felt](https://docs.winglang.io/blog/2022/11/23/manifesto) when we embarked on our journey: that our success could boost productivity by unlocking the cloud for developers.

However thrilling it is to have my beliefs validated and to see powerful organizations promoting these ideas, that's not the focus of this post.

Instead, I want to focus on another aspect of the paper: its introduction of structured definitions of DevEx and methods for its evaluation.

I believe it's crucial for us, as developers of a language designed to enhance DevEx, to establish a framework for discussing our approach to improving DevEx. This becomes especially vital when our project is open-source, and we aim to involve the community in these discussions.

So, this post will examine Winglang's approach to improving DevEx for cloud apps, through the lens of the structured definitions given in the paper.

This isn't an evaluation of whether we have met our goals. To make that assessment, we'd need to conduct a study involving actual developers using a more mature version of Wing. 
Instead, it serves as a status check to understand how we are aiming to improve DevEx and how our approaches align with those outlined in the article.

I hope this post will spark your interest, and that you will join us in the subsequent discussion.

<!--truncate-->

## DevEx as defined in the paper

The authors present a framework that condenses the developer experience into three primary dimensions:

1. **Feedback loops:** This term refers to the pace and quality of responses developers receive to their actions. Both feedback from development tools (such as code compilation or tests) and people (like code reviewers) are vital. Swift, concise feedback loops enable developers to finalize their work swiftly with minimal resistance, whereas sluggish feedback loops can lead to delays, exasperation, and disruptions. To enhance DevEx, organizations should aim to expedite feedback loops and optimize both development tools and human hand-off procedures.

2. **Cognitive load:** This concept covers the volume of mental processing required for a developer to execute a task. High cognitive load can stem from complicated tasks, unfamiliar frameworks, having to master too many tools, or inadequately documented code or systems, obstructing developers' capacity to deliver value. To augment DevEx, organizations should strive to decrease cognitive load by eradicating needless obstacles in the development process, creating well-structured code and documentation, and offering user-friendly, self-service tools.

3. **Flow state:** This is a mental zone of immersion in a task, where the individual experiences a sense of energized focus and enjoyment. Encountering a flow state at work can trigger increased productivity, innovation, and personal growth. Interruptions, delays, lack of autonomy, or unclear goals can obstruct a developer's capacity to achieve a flow state. To elevate DevEx, organizations should minimize disruptions, grant developers autonomy, and ensure they have opportunities to engage in fulfilling challenges.

## Evaluating Winglang's DevEx implementation using the paper's parameters

Now that we have the dimensions by which to view DevEx, let's analyze Winglang's efforts according to them. Again, these are Winglang's attributes that are supposed to improve DevEx according to these dimensions. I'm not trying to evaluate whether these attributes do improve DevEx, but rather how they align with the three primary dimensions presented in the academic paper.

### Feedback loops
Winglang comes with a local simulator and a visualization and debugging console that support instant hot reloading. 
These tools empower developers to iterate more swiftly with immediate feedback on code modifications, visualizing, interacting, and debugging their code locally via the Wing Console. 
By minimizing the delay in feedback, developers can promptly rectify errors and enhance their solutions. 

This approach to improving feedback loops aligns with the first dimension identified in the academic paper. 
It supports more rapid feedback from tools and also from people since the simulator can be used to create fast and cheap to deploy preview environments to be sent for review by other people.

### Cognitive Load
Winglang aims to lighten developers’ cognitive load by representing abstract cloud resources as native language elements. 
This strategy diminishes the need for developers to manually control these resources or deeply understand numerous layers of the cloud stack. 
Instead, they can focus their efforts on crafting application code, while Winglang's compiler handles the cloud mechanics. For example, the automated generation of Identity and Access Management (IAM) policies.

Another key aspect of Winglang's approach to reducing cognitive load is its introduction of [inflights](https://docs.winglang.io/concepts/inflights). They allow developers to write distributed code that looks and feels almost like that of a monolith, with all the cognitive benefits that come with it: code that is easier to follow, test and debug.

Winglang also introduces features such as implicit await for asynchronous calls, further alleviating developers' cognitive burden. 

These cognitive load-reducing attributes seem to align well with the second dimension identified in the academic paper. 
The challenge is to make sure that the abstractions are not leaky on the one hand and that they don't oversimplify to the degree of diminishing control on the other hand. 
It's a tough one, and we are not there yet, although I feel like we're on the right path to get there. For example, by supporting import of any Terraform module directly, Wing doesn't restrict developers to using abstractions. There are also many ways to customize and extend Wing, including custom resources and [compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) to modify the Terraform output directly.

### Flow State
Winglang aims to keep developers immersed in their tasks by:

**Providing Autonomy:** Winglang handles cloud mechanics, enabling developers to focus more on the business logic of their applications and less on infrastructure.
Our goal is to reach a point where they can create entire applications in dev environments without needing much intervention from DevOps.
On the other hand, Winglang also aims to promote the autonomy of DevOps engineers. [Compiler plugins](https://docs.winglang.io/blog/2023/02/17/plugins) are a way for them to apply non-functional concerns to the application in the form of policies, without having to communicate with the application developers much or to know every resource being used by them.
 
If we succeed in making developers and DevOps engineers more autonomous, we will be able to reduce the number of context switches and hand-offs between them. This should help induce a flow state in both.

**Minimizing Disruptions:** In Winglang both application and infrastructure code are composed in the same way and using the same programming model and tools. 
This reduces context switching, whether between languages, tools, or infra and application code. 
If different developers are handling infra and app code, Winglang reduces the number of context switches associated with communication between them of the separation of concerns and increased autonomy for both disciplines described above. 

**Fulfilling Challenges:** By abstracting cloud mechanics, developers should be able to focus more on addressing business needs instead of writing glue logic or boilerplate code. This would allow them to grapple with meaningful challenges, keeping them engaged and productive in their flow state. 
This too is a big challenge, but I feel we're on the right path to make progress there :)

## Conclusion
It seems like we are attempting to add significant improvements in all three DevEx dimensions coined in the research paper. 
It is very fulfilling for me to see because it is nice to learn that something you felt intuitively holds against a more formal inspection. 

But attempting something is not enough. 
While it seems there could be potential in our approach, it is also evident that we face very big challenges. 
Apart from the obvious one of driving adoption of a new language, I believe our main challenge is our attempt at abstracting the cloud. 
We need to succeed in making the abstraction non-leaky, or mostly non-leaky, on the one hand, while allowing developers to maintain control when needed on the other hand. 
Unlike with single machines, this has not been attempted successfully in the cloud yet. 
I think that the other main area of innovation in Wing, the local simulation, is less challenging to get right, but still not trivial.

In both cases, even if we are successful, it remains to be seen how much of an impact on DevEx Winglang's innovations would make in the real world.
I can't wait to get to a point in the future when Wing is mature enough and we can make a proper study with real developers to measure the actual impact of our approach on their productivity, creativity and autonomy.
 
I hope this journey into Wing's approach to improving DevEx of coding cloud apps was enjoyable for you. 
I'm sure I speak on behalf of everyone on the team when I say that I'd love to get any feedback on our approach in general and our execution of it.

Please check our [docs](https://docs.winglang.io) to learn more or our [playground](https://play.winglang.io) to "experience the experience".
You are also welcome to [join our Slack](https://t.winglang.io/slack) and our DevEx-related discussions there.