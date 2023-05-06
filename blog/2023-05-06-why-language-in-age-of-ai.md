---
title: "Why We're Building a Programming Language for Cloud Development in the AI Era"
description: Discover why we're building a programming language for cloud development in the era of generative AI.
authors: 
  - shaiber
tags: [winglang, ai]
hide_table_of_contents: true
---

# As long as AI is our co-pilot and not an auto-pilot, we can enhance collaboration with it by reducing our code base by 90-95% and testing it 100x faster. AI also eases adopting new languages.

As AI becomes an increasingly integral part of our development processes, it enhances developers' efficiency and capabilities. 

Some predict that it will eventually replace human coders, while others believe that day is still far off. In the meantime, we're experiencing a gradual shift where AI writes more code, and humans maintain their vital roles — writing some code, directing AI to write other parts, reviewing the code, debugging and maintaining it.

If we can make it easier for both humans and AI to write good code more quickly, collaborate efficiently, and test it faster, we can improve the quality and speed of our application delivery.

## The Key: Reducing Cognitive Load and Accelerating Iteration

Whether you're an AI or a human developer, reducing cognitive load and iterating faster will result in better applications developed more quickly.

So, what can be done to make these improvements?

### Working at a Higher Level of Abstraction

Utilizing a higher level of abstraction offers the following benefits for both human and AI coders:

1. **Reduces cognitive load** by focusing on the app's business logic instead of implementation details, enabling developers to learn less and minimizing the potential for errors. The first point is more critical for human coders, while the second is equally important for both, as AI can make mistakes like hallucinating interfaces and generating disconnected code parts.
2. **Accelerates iteration speed** by writing less code, reducing the time it takes to write and maintain it. While it may not sound intuitive, it is equally important for both human and AI as AI generates code one token at a time, similar to how a human writes.
3. **Reduces AI’s limitations.** AI is limited by the amount of code it can generate before losing context. Writing less code enables AI coders to create larger and more complex applications.
4. **Improves collaboration between human and AI coders.** A smaller code base written at a higher level of abstraction allows human developers to modify and maintain AI-generated code more quickly and easily.

### Faster Deployment and Testing

Currently, deploying and testing cloud applications can take several minutes. Multiply this by numerous iteration cycles, and there's significant room for improvement.

Running tests locally is also challenging, as it requires mocking the cloud environment around the tested component.

Moreover, it's impossible to use the same tests locally and in the cloud.

By writing tests that can run both locally and in the cloud, and executing them quickly, we can vastly improve iteration speeds, regardless of whether the code is written by an AI, a human, or a collaboration between them.

So, how can we make this happen?

## Introducing Winglang

**Winglang is a new programming language for cloud development that enables both human and AI developers to write cloud code at a higher level of abstraction, and comes with a local simulator that lets them test it super quickly.**

### Quantifying the Improvement

We're talking about a 90%-95% reduction in code and a 100X increase in testing speeds.

### Let's See Some Code

Here's an example of a small app that uploads a file to a bucket using a cloud function.

This is the code in Wing:
<Wing code here>

As you can see, either a human or an AI coder that writes Wing code is working at a high level of abstraction, letting the Wing compiler take care of the underlying cloud mechanics, such as IAM policies and networking (don't worry, it is customizable and extensible, so you don't lose control when needed).

By the way, the code can be compiled to any cloud provider, and its output is Terraform and JavaScript, which can be deployed with existing tools.

Now let's take a look at the same code in the leading cloud development stack today - Terraform + JavaScript.
<Terraform code here>

As you can see, we have to write 15X more code and dive deeply into lower layers of the cloud stack.

You might be wondering if there are newer solutions against which Wing's gains are less significant, or if the same results can be achieved through a library or a language extension. You can see how Wing compares to other solutions and why it's a new language rather than some another solution [here](https://docs.winglang.io/faq/why-a-language).

### Testing with Wing

Wing comes out of the box with a local simulator and a visualization and debugging console.

These tools enable developers to work on their code with near-instant hot-reloading and test cloud applications very easily without having to mock the cloud around them.

This is a short [video](https://www.youtube.com/watch?v=vHy1TM2JzUQ) of the experience.

You can play with it yourself with zero friction in the [Wing Playground](https://play.winglang.io/).

## Conclusion

Although Wing introduces significant improvements in cloud development, we understand that migrating to a new language is a substantial undertaking that may be hard to justify in many cases.

We’ve gone to great lengths to make adopting the language as easy as possible with the following features:

- Easy to learn because it is similar to other languages.
- Works seamlessly with your existing stack and tools (especially deployment and management).
- Mature ecosystem - import any NPM module or Terraform resource into your code.
- Integrates into existing code bases - write runtime code in other languages and reference it with Wing.

Furthermore, we believe that in the era of AI, adopting a new language like Winglang is easier for humans as AI assists in writing code in unfamiliar languages and frameworks and simplifies the migration of existing code to new languages.

As we move toward a future where AI plays a more significant role in code development, the creation and adoption of languages like Winglang will ensure better collaboration, faster development, and higher-quality applications for both human and AI developers.

To get a glimpse of the future and experience writing code in Wing and testing it instantly, you can visit our [playground](https://play.winglang.io/).