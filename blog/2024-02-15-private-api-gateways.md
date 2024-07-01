---
title: Why are Private API Gateways so hard?
description: Exploring what private API gateways are and why they're used in the context of the serverless architecture landscape.
authors:
  - rybickic
tags: [private api gateway, secure api gateway, serverless api gateway, private api gateway example, private api gateway tutorial, api gateway vpc, private api gateway terraform, application gateway, private endpoint, winglang, wing cloud]
hide_table_of_contents: true
---


The landscape of serverless architectures is constantly evolving - and the patterns used by developers today range from [microservices](https://en.wikipedia.org/wiki/Microservices), to [hexagonal architectures](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)), to [multi-tier architectures](https://en.wikipedia.org/wiki/Multitier_architecture), to [event-based architectures](https://en.wikipedia.org/wiki/Event-driven_architecture) (EDAs). One of the most important challenges every development team considers when designing and building their system is [how well it secures their application](https://franklyspeaking.substack.com/p/frankly-speaking-52620-cloud-security).

In this post, we’re going to deep dive on the private API gateway pattern: including what a private API gateway entails, its distinct advantages, and why you or your team might opt for this route over other services.

Based on our team’s experience, we’ll be focusing on the capabilities available when building private API gateways on AWS using their managed [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) and [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) services. But many of the lessons will also apply to cloud applications built using Azure’s [API Management service](https://learn.microsoft.com/en-us/azure/api-management/private-endpoint) and other major cloud providers. 

## Understanding Private API Gateways

If we simplify what a private API gateway is, it's a secure means of exposing a set of APIs within a private network, typically established using a [Virtual Private Cloud](https://en.wikipedia.org/wiki/Virtual_private_cloud) (VPC). Let’s first understand each of these.

An API Gateway makes it easy for developers to create, publish, maintain, monitor, and secure large numbers of API endpoints at scale. The gateway provides a central point where you can manage [API throttling](https://www.tibco.com/glossary/what-is-api-throttling), [authorization](https://konghq.com/learning-center/api-gateway/api-gateway-authentication), [API versioning](https://www.postman.com/api-platform/api-versioning/), and monitoring configuration.

On the other hand, a Virtual Private Cloud (or VPC), is a mechanism for creating a logically isolated virtual networking environment. Such a virtual network parallels a network that you’d operate in your own data center, including subnets, IP addressing capabilities, routing tables, and gateways to connect to other networks.

When your API gateway is located within a VPC, you have a private API gateway. Unlike their public counterparts accessible over the internet, private API gateways are crafted to be accessed exclusively from within the specified network. This means only backend services and databases created within your organization can access the API endpoints.

## Why Choose a Private API Gateway?

Let's take a look at three common use cases.

### Improved security:

By confining your API within a private network, you minimize exposure to potential security threats originating from a public API over the internet. For the security conscious, VPCs provide a much saner starting point for securing your application since private compute resources can simply say “allow any traffic from our private network,” reducing the need to manually manage firewalls and IP tables. In this scenario, it doesn’t really matter what you’re building - you just don’t want the public internet messing around with it!

### Compliance:

Some compliance standards or organizational policies mandate the use of VPCs to ensure that sensitive data remains within controlled environments. For example, with regulations like [HIPAA](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html) in the United States, [deploying applications within VPCs is a common strategy](https://blog.scottlogic.com/2021/10/11/vpcs-aws.html) to ensure the confidentiality and security of patient data. In these situations, cloud architectures that are designed around API endpoint usage will benefit from being able to use private API gateways.

### Hybrid cloud environments:

For companies that operate in a [hybrid cloud environment](https://docs.aws.amazon.com/whitepapers/latest/public-sector-cloud-transformation/selecting-the-right-cloud-for-workloads-differences-between-public-private-and-hybrid.html) (a mix of public cloud and on-premises data centers), a private API gateway can manage and route traffic within the private network. This is essential for sensitive data that cannot be transferred to public clouds due to policy or regulatory reasons. Migrating applications to the cloud is made easier by the fact that modern cloud providers like AWS [allow application code running within VPCs to have secure access to the common services](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/networking-connecting-vpc.html) like S3, DynamoDB, and IAM - all routed through the backbone of Amazon’s networking infrastructure.

## Challenges

While setting up cloud applications in private networks has many security benefits, accessing a private API from external environments, such as during development or testing phases, can be cumbersome. [VPCs typically add complexity to serverless applications](https://medium.com/@robertcurran5635/dragging-serverless-web-apps-into-the-vpc-d97cabd47e79) by increasing the amount of infrastructure that needs to be managed through tools like Terraform and CloudFormation, and may require [setting up bastion hosts for debugging applications](https://dev.to/aws-builders/bastion-host-in-aws-vpc-2i63) in production.

Furthermore, establishing secure connections to any networks outside of the VPC may require setting up Virtual Private Networks (VPNs) or using services like Amazon Direct Connect, which introduces extra complexity.

## Overcoming it

In the [Wing Discord](https://t.winglang.io/discord) community, we’ve seen many developers share their advice and experiences building cloud applications of all shapes and sizes. Recently, we heard about a user’s positive experience building a cloud application with Wing that established API endpoints within their VPC through a private API Gateway. Inspired by their efforts, we extracted their solution into a template that makes it easy for anyone to turn their API gateway into a private one.

One of the biggest pains people have when using serverless is that they constantly have to wait for deployments to finish in order to test changes to their code. This is where Winglang and it's cloud simulator rocks - it allows you to develop your entire serverless application without having to deploy anything on the cloud, letting you iterate in milliseconds instead of minutes.

If you’re curious to learn more, check out our [tutorial](/docs/guides/private-api-gateway-aws) that walks you step-by-step through building a simple application with a private API gateway and deploy it to your own AWS account. If you have feedback or any other questions, let us know by dropping a comment in our [community discord](https://t.winglang.io/discord). Don’t be shy!
