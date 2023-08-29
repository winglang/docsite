---
title: Adding purge & aproxSize to the queue resource
description: 
authors: 
  - revitalb
tags: [cloud-oriented programming, winglang, community]
hide_table_of_contents: true
---
 
I love working with the Wing community, and one of my favorite ways to engage is by publishing good first issues which serve as approachable gateways for newcomers to get involved in developing Wing! Recently, I was looking for an issue that could serve as a friendly introduction to Wing's various layers, without being overly complex! Adding a new method to a resource seemed to be a perfect match for these criteria. I posted, as a good first issue, the implementation of the `Queue.Purge` method, and within just 5 minutes I decided to take on the task myself. This felt like the perfect opportunity to dive into the heart of Wing's mechanics and explore how things work behind the scenes.

## Getting Started

Before diving into implementation, it was crucial for me to go through the specifications of the resource I was about to work on. I found all the necessary details in the [Wing spec](https://www.winglang.io/docs/standard-library/cloud/bucket), outlining the method's signature, return type, and arguments. 

## Adding Cloud-Agnostic Interfaces

To add a method to an existing resource, I needed to modify the implementation files of the resource that are located in `wingsdk/src/cloud` folder. The `cloud` folder contains cloud-agnostic code, ensuring that implementations are not tied to any specific cloud provider.
Under the `cloud` folder, I navigated to `queue.ts` file that contains the cloud-agnostic implementation, added the relevant methods as well as comments and documentations using code suggestions from **co-pilot**!

## Cloud-Specific Implementations

Wing's support for multiple cloud providers means that each new method must be implemented for every supported provider. Now it's time to change folders like `target-awscdk`, `target-sim`, and others, each contain cloud-specific implementation files. 
Let me give you an example, for cloud provider `target-sim`, I set the length of the `mesages` array to zero:

```js
public async purge(): Promise<void> {
     return this.context.withTrace({
       message: `Purge ().`,
       activity: async () => {
         this.messages.length = 0;
       }
     }
}
```
While for the `tf-aws` implementation, I implemented the following:
```js
public async purge(): Promise<void> {
     const command = new PurgeQueueCommand({
       QueueUrl: this.queueUrl,
     });
     await this.client.send(command);
}
```

I adjusted the code in `queue.inflight.ts` as `Purge` method is part of the inflight API. As you can see, these implementations tailored to different cloud providers were where the real magic happened.

## Ensuring Quality: Writing Tests

No new functionality is complete without testing right? So I located the appropriate provider's `queue.test.ts` and reallized that `Purge` cannot be tested unless I have a way to get the size of the `Queue`. So I went back to step #1 and added `Queue.approxSize` as well:
For cloud provider `target-sim`:

```js
 public async approxSize(): Promise<number> {
     return this.context.withTrace({
       message: `ApproxSize ().`,
       activity: async () => {
         return this.messages.length;
       },
     });
}
```
While for the `tf-aws` implementation:
```js
public async purge(): Promise<void> {
     return this.context.withTrace({
       message: `Purge ().`,
       activity: async () => {
         this.messages.length = 0;
       }
     }
}
```

## Seamlessly Integrating Documentation

With coding and testing behind me, the final step was to align the documentation with the newly introduced API. By executing the `pnpm turbo build` command, I integrated my comments into the documentation build process. This ensured that the documentation accurately reflected the changes I'd made and would be readily accessible in the API-Reference section.

## A Glimpse into the Journey

For the actual code, feel free to explore this (example)[https://github.com/winglang/wing/pull/1160]. Additionally, you can gain insights from a brief video that illustrates the changes made to the files:

<iframe width="560" height="315" src="https://www.youtube.com/embed/y0jG_YKjxPk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

we would love your feedback and suggestions on [Wing Slack](https://t.winglang.io/slack).

Let's Connect!
