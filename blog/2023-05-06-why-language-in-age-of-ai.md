---
title: "Why We're Building a Programming Language for Cloud Development in the AI Era"
description: Why we're building a programming language for cloud development in the era of generative AI?
authors: 
  - shaiber
tags: [winglang, ai]
hide_table_of_contents: true
---

# As long as AI is our co-pilot and not an auto-pilot, we can collaborate with it much more effectively if we reduce our code base by 90-95% and iterate on it 100 times faster. AI can also greatly lower the barriers to adopting a new language.

AI is becoming increasingly integrated into our development processes, enhancing developers' efficiency.

While some believe AI will soon replace human coders, others think it's far off. Regardless, we're in the midst of a gradual process where AI writes more and more code, and humans continue to play a vital role — writing some code, directing AI to write other parts, reviewing the code, and maintaining it.

If we can make it easier for both humans and AI to write good code more quickly, collaborate efficiently, and test it faster, we can improve the quality and speed of delivery of our applications.

## The Key: Reducing Cognitive Load and Accelerating Iteration

Whether you're an AI or a human, reducing cognitive load and iterating faster will result in better apps that are developed more quickly.

What can be used to make these improvements?
### Working at a Higher Level of Abstraction

It has the following benefits for both human and AI coders:

1. **Reduces cognitive load** by focusing on the app's business logic instead of implementation details, enabling developers to learn less and minimizing the potential for errors. The first point is more critical for human coders, while the latter is equally important for both, as AI can make mistakes like hallucinating interfaces and generating disconnected code parts.
2. **Accelerates iteration speed** by writing less code. Less code means it takes less time to write, maintain, and iterate. This is equally important for both AI and human coders. Although it may not seem intuitive, AI generates code one token at a time, similar to how a human writes. The time it takes the AI to generate code is linearly correlated to the amount of code it writes.
3. **Reduces AI’s limitations.** In the foreseeable future, AI is limited by the amount of code it can generate before losing context. Writing less code enables AI coders to create larger and more complex applications.
4. **Improves collaboration between human and AI codes.** A smaller code base written at a higher level of abstraction allows human developers to modify and maintain AI-generated code more quickly and easily.

### Faster Deployment and Testing

Currently, deploying and testing cloud applications can take several minutes. Multiply this by numerous iteration cycles, and there's significant room for improvement.

Running tests locally is also challenging, as it requires mocking the cloud environment around the tested component.

Moreover, it's impossible to use the same tests locally and in the cloud.

By writing tests that can run both locally and in the cloud, and executing them quickly, we can vastly improve iteration speeds, regardless of whether the code is written by an AI, a human, or a collaboration between them.

So, how can we make this happen?

## Enter Winglang

**A new programming language for cloud development that enables both human and AI developers to write cloud code at a higher level of abstraction, and comes with a local simulator that lets them test it super quickly.**

### How Big of an Improvement Are We Talking About?

90%-95% less code and a 100X increase in deployment and testing speeds in a development environment.

### Let's See Some Code

Here's an example of a small app that uploads a file to a bucket using a cloud function.

This is the code in Wing:
<Wing code here>

As you can see, either a human or an AI coder that writes Wing code is working at a high level of abstraction, letting the Wing compiler take care of the underlying cloud mechanics, such as IAM policies and networking (don't worry, it is customizable and extensible, so you don't lose control when needed).

BTW, the code can be compiled to any cloud provider, and its output is Terraform and JavaScript, which can be deployed with existing tools.

Now let's take a look at the same code in the leading cloud development stack today - Terraform + JavaScript.
<Terraform code here>

As you can see, we have to write 15X more code and dive deeply into lower layers of the cloud stack.

You’re probably saying to yourself now that there are newer solutions against which Wing's gains are less big, or that the same results can be achieved through a library or a language extension. You can see how Wing stacks up against other solutions, as well as why it's a new language and not some other solution [here](https://docs.winglang.io/faq/why-a-language).

### Testing with Wing

Wing comes out of the box with a local simulator and a visualization and debugging console.

These tools enable developers to work on their code with near-instant hot-reloading and test cloud applications very easily without having to mock the cloud around them.

This is a short [video](https://www.youtube.com/watch?v=vHy1TM2JzUQ) of the experience.

You can play with it yourself with zero friction in the [Wing Playground](https://play.winglang.io/).

## Conclusion

Even though Wing introduces big improvements in cloud development, we are aware that migrating to a new language is a very big undertaking that is hard to justify in many cases.

We’ve gone to great lengths to make adopting the language as easy as possible with the following features:

- Easy to learn because it is similar to other languages.
- Works seamlessly with your existing stack and tools (especially deployment and management)
- Mature ecosystem - import any NPM module or Terraform resource  into your code
- Integrates into existing code bases - write runtime code in other languages and reference it with Wing

In addition, we believe that in the era of AI, adopting a new language like Winglang is easier for humans as AI assists in writing code in unfamiliar languages and frameworks, and simplifies the migration of existing code to new languages.

As we move toward a future where AI plays a more significant role in code development, the creation and adoption of languages like Winglang will ensure better collaboration, faster development, and higher-quality applications for both human and AI developers.

To get a glimpse at the future and experience wiring code in Wing and testing it instantly, you can visit our [playground](https://play.winglang.io/).