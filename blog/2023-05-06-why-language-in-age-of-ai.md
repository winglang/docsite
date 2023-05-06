---
title: "Why we're building a programming language for cloud development in the era of AI"
description: Why we're building a programming language for cloud development in the era of generative AI?
authors: 
  - shaiber
tags: [winglang, ai]
hide_table_of_contents: true
---

<h1>
As long as AI is our co-pilot and not an auto-pilot, we can collaborate with it much more effectively if we reduce our code base by 90-95% and iterate on it 100 times faster. AI can also greatly lower the barriers to adopting a new language.
</h1>

AI is increasingly integrated into our development processes, making developers more and more efficient.

Some people believe that the time when AI can replace human coders is near, others think it's very far. But there is no doubt that we are already in the middle of a gradual process in which AI writes more and more code, and humans are still in the loop - writing some code themselves, directing the AI to write other parts of it, reviewing the code and maintaining it.

If we can make it easier for both humans and AI to write good code more quickly, collaborate on it more efficiently and test it faster then we can improve the quality and speed of delivery of the applications we write.

## The Key: Reducing Cognitive Load and Accelerating Iteration
It doesn't matter if you're an AI or a human, if we reduce your cognitive load and allow you to iterate faster then you will write better code, more quickly.

What can be used to make these improvements:

### Working at a higher level of abstraction
It has the following benefits to both human and AI coders:
1. **Reduces cognitive load** by focusing on the business logic of the app instead of the implementation details. This allows developers to learn less and reduces the surface area for errors. The first is more important for human coders, but the latter is equally important to both because AI is fallible, as anyone who has witnessed AI hallucinated interfaces and disconnected code parts has witnessed.
2. **Accelerates iteration speed** by writing less code. Less code means less time to write it and it is also easier and faster to maintain and iterate on. This is also equally important for both AI and human coders. While it may not sound correct at first read, when you think about it, AI doesn't produce code in large chunks, but it too writes it one token at a time, very similar to how a human writes. The time it takes the AI to generate code is linearly corralled to the amount of code it writes. 
3. **Reduces AI’s limitations.** At least in the foreseeable future, AI is limited by the amount of code it can generate before it loses context. Therefore by writing less code, AI coders can create larger and more complex applications.
4. **Improves collaboration between the human and AI codes.** Having a smaller code base that is written at a higher level of abstraction would allow human developers to get into AI-generated code and to modify and maintain it much more quickly and easily.

### Faster Deployment and Testing
Today it can take many minutes to deploy and test cloud applications. Multiply this by many iteration cycles and there is much room for improvement.

Running tests locally is also not easy since it requires mocking the cloud around the tested component.

It is also not possible to use the same tests locally and in the cloud.

If we can write tests that would run both locally and in the cloud and be able to run them quickly it would vastly improve our iteration speeds, regardless of whether the code is written by an AI, a human or a collaboration between them.

I guess all of the above sounds good, but how do we make it happen?

## Enter Winglang
**A new programming language for cloud development that enables both human and AI developers to write cloud code at a higher level of abstraction, and comes with a local simulator that lets them test it super quickly.**

### How big of an improvement are we talking about?
90%-95% less code and a 100X increase in deployment and testing speeds in a development environment.

### Let’s see some code
Look at the below code example of a small app that uploads a file to a bucket using a cloud function.

This is the code in Wing:
<Wing code here>

As you can see, either a human or an AI coder that writes Wing code is working at a high level of abstraction, letting the wing compiler take care of the underlying cloud mechanics, such as IAM policies and networking (don't worry, it is customizable and extensible, so you don't lose control when needed).

BTW, the code can be compiled to any cloud provider, and its output is Terraform and Javascript, which can be deployed with existing tools.

Now let's take a look at the same code in the leading cloud development stack today - Terraform + JavaScript.
<Terraform code here>

As you can see, we have to write 15X more code and dive deeply into lower layers of the cloud stack.

You’re probably saying to yourself now that there are newer solutions against which Wing's gains are less big, or that the same results can be achieved through a library or a language extension. You can see how Wing stacks up against other solutions, as well as why it's a new language and not some other solution [here](https://docs.winglang.io/faq/why-a-language).

### Testing with Wing
Wing comes out of the box with a local simulator and a visualization and debugging console. 

These tools enable developers to work on their code with near instant hot-reloading and test cloud applications very easily without having to mock the cloud around them.

This is a short [video](https://www.youtube.com/watch?v=vHy1TM2JzUQ) of the experience. 

You can play with it yourself with zero friction in the [Wing Playground](https://play.winglang.io/). 

## Conclusion
Even though Wing introduces big improvements in cloud development, we are aware that migrating to a new language is a very big undertaking that is hard to justify in many cases.

We’ve gone to great lengths to make adopting the language as easy as possible with the following features:
Easy to learn because it is similar to other languages.
Works seamlessly with your existing stack and tools (especially deployment and management)
Mature ecosystem - import any NPM module or Terraform resource  into your code
Integrates into existing code bases - write runtime code in other languages and reference it with Wing
In addition, we believe that in  the era of AI, adopting a new language like Winglang is easier for humans as AI assists in writing code in unfamiliar languages and frameworks, and simplifies the migration of existing code to new languages. 

As we move toward a future where AI plays a more significant role in code development, the creation and adoption of languages like Winglang will ensure better collaboration, faster development, and higher-quality applications for both human and AI developers.

To get a glimpse at the future and experience wiring code in Wing and testing it instantly, you can visit our [playground](https://play.winglang.io/).