---
title: Frequently Asked Questions
id: faq
keywords: [faq]
---

We get a lot of questions about Wing. We're collecting them here and answering them for everyone to know.


## Why a new language?

We get this one a lot. I mean,a LOT! There are a few reasons we decided to write a new language for Wing:

* All popular general purpose languages are designed to be run on a single machine. The cloud is not a single machine. 
There is a friction there that we'd never be able to overcome and a new language built from the ground up to be
cloud-focused was the best way forward. By owning the language from day one we can always drive towards the best 
possible developer experience without being constrained by existing language features.
* We can build a lot of intelligence into the compiler. While a lot of this could probably be done through clever
libraries and existing language features, there was always that 'yeah but what about ___' we could imagine that we'd
spend tons of time to solve, which means we're working around existing language barriers instead of building value.

## Won't polycons be the lowest common denominator? What if I want to take advantage of cloud-specific services?

There is a lot of common functionality across clouds. Everybody has about the same functional definition of a queue, 
blob (file) storage, and functions. These will be standard resources that you can use regardless of which cloud provider
you're targeting.

However, we recognize that you aren't going to just build applications that are cloud-agnostic, and you'll want to 
build applications that take advantage of unique services each cloud provider has created. To that end, you'll be able
to use cloud-specific resources (like [AWS Step Functions](https://aws.amazon.com/step-functions/)). For example:

```wing
bring cloud;
bring aws;

new cloud.Bucket();
new aws.StepFunctions.StateMachine();
```

You'll also be able to import any standard [CDK for Terraform](https://developer.hashicorp.com/terraform/cdktf) resource. 
We have an open [issue](https://github.com/winglang/wing/issues/489) where we talk about this and what it will mean for 
the developer.

## Why are you using Terraform?

We think of the provisioning engine (Terraform, CFN, Pulumi, Kubernetes (!)…) as the instruction set of the cloud. 
It’s a choice we want to give users, and we are designing our toolchain to be pluggable in that respect. 
We chose Terraform as our first instruction set because it has a vast and open-source ecosystem of providers, which 
means that any Terraform resource is supported by Wing out of the box. But contrary to the AWS CDK, the toolchain is 
not tightly coupled to TF. 

To complete the analogy, we think about the cloud provider (AWS, GCP, Azure) as the operating system.
So, similar to traditional compilers where you specify a pair (instruction set, os) like x86-macOS or arm64-linux, in Wing you will be specifying tf-aws or cfn-aws or tf-gcp, etc.

## Where can I go to get help with writing Wing code?

We have multiple places you can go to get help.

* Our [Slack Server](https://join.slack.com/t/winglang/shared_invite/zt-1iz1u4p6p-BYhXrxU6LKWhuV1Sun82UQ)
* [StackOverflow](https://stackoverflow.com/questions/ask?tags=winglang), using the `winglang` tag.
* Our [YouTube](https://www.youtube.com/@winglangio) channel has a growing list of content to help.
* Our [TwitchTV](https://www.twitch.tv/winglangio0) channel has interviews and office hours.

## Isn't this just another Infrastructure-from-code solution?

No! We aim to be much more, providing a more end-to-end solution for the developer experience. The primary goal of Wing
is to increase the [inner loop](https://www.getambassador.io/docs/telepresence/latest/concepts/devloop) velocity. The
inner loop is defined as:

> The inner dev loop is where the individual developer codes and tests, and once the developer pushes their code to
> version control, the outer dev loop is triggered. 

Traditionally this inner loop experience has been very slow with cloud development. With the cloud heavily introducing
managed services for common application functions (like your database, your api endpoints, queue services, etc.) testing
has required a cloud account with these managed services running. While there have been attempts to replicated and 
emulate these services locally, they often fall short of the real services. So, developers have restored to unit testing
certain aspects to the best degree possible, but ultimately still need a 'dev account' they can deploy code to in a sandbox
environment to do end-to-end testing.

Up until now, this inner loop for cloud developers has been upwards of minutes for any minor change. A developer has to:
* Make the code change
* Deploy the code change (this is the part that can take minutes, depending on your IaC of choice)
* Test the change

This is far too slow. If we're going to be productive we have to shorten that inner loop back to what it was when
everything ran on a single machine. 

Wing is more than just simplifying your infrastructure definitions, it's also about unifying your development experience
like it used to be back when everything ran on single machines. We do that through three main points:

* A language that is purpose-built for cloud development.
* An SDK which does the infrastructure "wiring" for you.
* A console which allows you to see and simulate your cloud resources locally, so you don't have to deploy to test.

We firmly believe that Wing will provide the best experience for developing applications for the cloud that 
no infrastructure-from-code solution can match. You can read the 
[blog](https://medium.com/@hackingonstuff/cloud-why-so-difficult-%EF%B8%8F-4e9ef1446a64) from our founder 
[Elad](https://www.linkedin.com/in/hackingonstuff/) to learn more.

