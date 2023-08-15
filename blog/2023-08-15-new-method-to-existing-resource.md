---
title: Adding a new method to an existing resource
description: 
authors: 
  - revitalb
tags: [cloud-oriented programming, winglang, community]
hide_table_of_contents: true
---
 
When working with Wing, extending the functionality of existing resources is basic operation, as Wing supports multiple clouds. This guide will walk you through the process of adding a method to an existing resource, using the example of adding a method to a cloud resource within the simulator.

## Step 1: Understanding the Resource Specification

Before we dive into the implementation, it's crucial to understand the specification of the resource you'll be working with. You can find in the [Wing spec](https://www.winglang.io/docs/standard-library/cloud/bucket) the method signature, return type, and arguments.

## Step 2: Adding cloud-agnostic Interfaces and Abstract Classes

To add a method to an existing resource, you'll need to modify the implementation files of the resource. Navigate to the `wingsdk/src/cloud` folder. The `cloud` folder contains cloud-agnostic code, ensuring that implementations are not tied to any specific cloud provider. Here, you'll find an abstract class or interface that defines the high-level abstraction for all cloud resources.
Under the `cloud` folder, navigate to *resource*.ts, this file houses the cloud-agnostic implementation. This is where you will add your 
new method using TypeScript, of course.
When adding the new method, it's essential to provide clear comments and documentation to help others understand its purpose and functionality. You can also make use of code suggestions from **co-pilot** to ensure your comments are comprehensive.


## Step 3: Updating Cloud-Specific Implementations

Since **Wing** supports multiple cloud providers, you'll need to implement the new method for each provider. These implementations are found in folders like `target-awscdk`, `target-sim`, `target-tf-aws`, etc. In these folders, you'll find cloud-specific implementation files.
For instance, if you're adding the method to the simulator, navigate to the  `target-sim` folder. Another important concept that will determine which file will be changed, is whether the method is an inflight method or a preflight one. To learn more about preflight and inflight concepts, refer to the following [article](https://www.winglang.io/docs/concepts/inflights).
Subsequently, if adding an inflight method, you should make adjustments in the `resource.inflight.ts` file; otherwise, in the `resource.ts` file. This is where the specialized implementation for the cloud provider is located.


## Step 4: Writing Tests

Quality assurance is vital when adding new functionality. Inside the project's `test` folder, you'll find tests for each cloud provider. Locate the relevant provider's `resource.test.ts` file and add tests for the new method you've implemented. This ensures that your method works as expected and maintains functionality across different cloud environments.

## Step 5: Auto generate documentation

After completing the coding and testing processes, it's essential to ensure that our documentation aligns with the newly incorporated API. Execute the command `pnpm turbo build` to integrate the added comments into the build procedure. This will allow the comments associated with these modifications to be automatically utilized for generating documentation within our [API-Reference section](https://www.winglang.io/docs/standard-library/std/api-reference).


For a comprehensive example of how to incorporate a new method, feel free to explore this (example)[https://github.com/winglang/wing/pull/1160] on how to extend the `Queue` resource with the `Purge()` method. Additionally, you can gain insights from a brief video that illustrates the changes made to the files:

<iframe width="560" height="315" src="https://www.youtube.com/embed/y0jG_YKjxPk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

we would love your feedback and suggestions on [Wing Slack](https://t.winglang.io/slack).

Happy coding!

