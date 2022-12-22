---
title: Winglang on Hacker News
description: Why the hell are we building a programming language?
authors:
  - name: Shai Ber
    title: Co-Founder & VP R&D at Monada
    url: https://github.com/ShaiBer
    image_url: https://avatars.githubusercontent.com/u/1729376?v=4
  - name: Elad Ben-Israel
    title: Co-Founder & CEO at Monada
    url: https://github.com/eladb
    image_url: https://avatars.githubusercontent.com/u/598796?v=4
tags: [cloud-oriented programming, winglang, hacker news, faq]
hide_table_of_contents: true
---

**December 19, 4:51pm, Monada's offices in Tel-Aviv**. A few of us are wrapping
up a brainstorm to discuss wacky ideas for the first ever episode of our
upcoming late night Twitch series "The Wingly Update, name TBD". Tune-in to
watch our first show on December 25, 3:30pm EST

A Slack ping is heard from various devices... 30 seconds later, someone from the
other room runs inside and says "did you see Slack?". People pull their phones.
A message from our very own [@MarkMcCulloh](https://github.com/MarkMcCulloh):

![](./mark.png)

*Yikes!* Someone posted Wing on [Hacker News], and we were ***not*** really
prepared... Our GitHub repository is still private, we are working on adding
content to our [website](https://winglang.io) that explains what Wing is and why
we are building it, we are in early (early!) alpha. Our little baby is not even
vaccinated, let alone ready to handle the brutal real-world that is Hacker News
on its own.

[Hacker News]: https://news.ycombinator.com/item?id=34051325

So... After 8 hours at the top 10 spots of Hacker News, 11K new visitors to our
cute little home page, about 300 new alpha subscribers, lots of deep,
interesting and thoughtful comments, as well as a few snarky, conspiratorial
remarks, we'd like to take the opportunity to address some of the common
questions and thoughts.

### Why is this a language? Couldn't you build this as a library?

Cloud applications are distributed systems, composed by integrating
infrastructure resources together with business logic. Cloud developers need a
way to treat both infrastructure ***and*** code as first-class citizens in order
to effectively leverage the full power of the cloud. This is something that
cannot be achieved with mainstream programming languages, which are designed
with the assumption that all code runs inside a single machine.

Our experience building the CDK showed us that using the full power of a
programming language is a force-multiplier for capturing the complexity of
infrastructure required to build real-world cloud applications. However,
solutions like the CDK fall short when it comes to the integration between
infrastructure and application logic, leading to friction and boilerplate.

That's why we believe that a new programming language is necessary if we want to
democratize cloud-oriented programming. We need a language that allows us to
define both infrastructure and code in the same place and interact naturally
across these boundaries. Wing is designed to be easy to learn and approachable,
with first-class interoperability with the JavaScript, Terraform, and CDK
ecosystems. It is shipped with a local cloud simulator, which can be easily
extended to support any cloud service you need in your app either through a
local simulation or by proxing to a remote service. It doesn't have any runtime
footprint, and we are building a best-in-class, "batteries included", toolchain.

Our mission is to create the best developer experience for the cloud, and we
refuse to compromise. We believe that this programming paradigm has matured and
that we will be building applications for the cloud in the foreseeable future.
We need a solid foundation for cloud programming, and we want to use tools that
deeply understand the cloud.

> https://news.ycombinator.com/item?id=34051472




We didn't take the decision to build a new language lightly. We know that
adopting a new language is a major barrier, and we are doing everything we can
to reduce it. Wing is designed to be easy to learn, approachable and familiar.
It will have first-class interoperability with the JavaScript, Terraform and CDK
ecosystems. It compiles to JS and Terraform and doesn't have any runtime
footprint, and we are creating a best-in-class "batteries included" toolchain
for it.

Our mission is to create the best developer experience for the cloud. We believe
that this programming paradigm ([cloud-oriented programming]) has matured, and
that we are going to be building applications for the cloud in the foreseeable
future. We need a solid foundation for cloud programming, and we want to use
tools that deeply understand the cloud. We refuse to compromise.

[cloud-oriented programming]: https://docs.winglang.io/blog/2022/11/23/manifesto 

#### Infrastructure *and* code instead of infrastructure *or* code

All mainstream languages are designed with a fundamental assumption that all
code runs inside a single machine. Some languages have a way to express ideas
like asynchronous programming


---

We believe that in order to be able to capture the full and magnificent power of
the cloud, we need fully fledged programming language tools both for
infrastructure *and* for code.

We don't need to convince anyone that we need programming languages to write
business logic, right? But do we need the a programming language for
infrastructure? **We believe the answer is yes.**

Our experience [building the CDK] proves that being able to use the full power
of a programming language is a force-multiplier for capturing the ever-growing
complexity of the infrastructure required to build real-world cloud
applications. We saw that teams that use the CDK were able to leverage the cloud
much more effectively and to its full extent.



As responsibilities shift from application code to infrastructure, so does the
coupling between them *increases*. This is where we believe solutions like the
CDK fall short. Working in isolation on either infrastructure or application
logic means the glue between them becomes friction and boilerplate. Our
[previous post] describes why we believe this is a major source of pain in cloud
development today.

[previous post]: https://docs.winglang.io/blog/2022/11/23/manifesto 











So if we accept the fact that cloud applications today are essentially
distributed systems that are composed from many tightly-integrated
infrastructure resources and application code, and that we need the full
power of programming to be able to express all aspects of these systems,


















So we are looking for a solution that will allow us to define both
infrastructure *and* code in the same language, and interact naturally across
these boundaries. We want both to be first-class citizens of the codebase, and
that's something we can't achieve with existing programming languages because
these aspects of the application operate at completely different dimensions.























complexity was transferred from the application code (which was able to ) to infrastructure
services
 
The value of the cloud is to transfer responsibilities from application code to
managed services. In its early days, it was basically about hosting VMs in
someone else's data center. As the cloud evolved, and the SaaS industry emerged,
more responsibilities could be handed off to managed services (still weirdly
called "infrastructure"). This allowed teams to deliver more reliable, scalable
and robust solutions and much faster.

This process moved complexity from my application code to the architecture. And
as this architectural complexity grew, we needed more powerful techniques to
model and manage these resources. A new technology stack had started to evolve
to support this complexity: at its base we see how infrastructure-as-code
deployment engines such as Terraform, Pulumi, CloudFormation and Kubernetes
improved our ability to streamline the ongoing provisioning of all these
resources. The next layer was what we



We call
this "cloud-oriented programming". In our [previous post], we described the
current state of cloud development, and how shifting to this new paradigm can
address the friction and remove the barriers for widespread adoption of the
cloud by developers.







There are beautiful solutions that prioritize one over the other (infra-as-code
=> infra-as-software => infra-from-annotations => infra-from-code), but 

but they will
always be limited to certain use cases.






 of these aspects, we would
have to compromise on the other because existing languages are intrinsically not
designed to be able to express programs that run in two different










The TL;DR is that we've realized it won't be possible to create a developer
experience that treats both cloud infrastructure and application code as
first-class citizens using an existing programming languages.




#### What is the cloud?

Before we dive into the language question, let's first tend to a deeper and
perhaps philosophical question: *What is the cloud?* Why is it useful? Where is
its value?


[previous post]: https://docs.winglang.io/blog/2022/11/23/manifesto

#### Infrastructure *and* code?

In my last 5 years at Amazon Web Services, I've been working on the AWS CDK. The CDK basically makes 


Almost all existing languages/compilers take a fundamental assumption that the
entire program runs inside a single machine. This is, in our view, the impedance
mismatch of cloud development today. This is where we believe language
innovation can dramatically reduce the cognitive load and barrier to entry for
building and delivering cloud applications that fully take advantage of the
cloud.




Inflight functions and resources are only the first step. Think
first-class support for things like defining and consuming API endpoints,
writing distributed workflows, emitting metrics, raising alarms and other things
you would expect from your friendly neighborhood cloud programming language.













Let's take a look at a seemingly trivial example:

```js
bring cloud;

let bucket = new cloud.Bucket(); // <-- infrastructure
let who = "world";

new cloud.Function(inflight () => {
  bucket.put("hello", who);     // <-- code
});
```

The output of this 







Another way to think of cloud-oriented programming is that there are two
first-class citizens in the mix: infrastructure *and* code. We want both to be
recognized by the compiler and interacted with naturally.





1. Defining infrastructure should be a first-class experience.
2. Runtime code is distributed, and executed on a diverse set of compute
   platforms such as VMs, containers, edge, FaaS, workflows, etc.

Solutions like the [AWS CDK] or [Pulumi] are focused on #1 - they allow
developers to define infrastructure through software. But then they
turn runtime code into a 

And we want these two to naturally interact with each other.


One of the most important and novel concepts of Wing is what we call [inflight
functions]. You think of them as [async functions] that are executed on a remote
system, but can still interact with the resources around them.

[inflight functions]: https://docs.winglang.io/concepts/inflights

It's an `async` function that can be executed on a remote system, such as inside
a container fleet or on a FaaS. Inflight functions can interact naturally with
cloud resources around them (by simply calling inflight methods on the resources
e.g. `bucket.put()`). The compiler analyses these interactions and inverts the
control over to the resources to take care of the mechanics like wiring
deployment information, synthesizing security policies and anything else that
can be deduced from this high level intent.

Defining the cloud architecture of the app and being able to naturally crossing
these distributed boundaries is the essence of what we call "cloud-oriented
programming", and where we think a lot of the friction and pain of the cloud
comes from today: every time I need to interact with "The Cloud", I leave the
safety and comfort of my compiler, and I am out in the wild having to understand
all the mechanics and layers involved.



We didn't take the decision to create a new language lightly. We obviously
understand it is a major and ambitious undertaking. We took a hard look at
existing solutions that try to introduce this new paradigm into existing
languages using SDKs, annotations, custom runtimes or compiler extensions.

Eventually, we came to the realization that all popular existing languages
have two fundamental assumptions:

1. All code run inside a single machine
2. The output of the compiler is an executable

Those two assumptions are baked deeply into the semantics of the language and
how the compiler works.




### PULUMI

Wing:

```ts
let next = counter.inc();
let key = "file-${next}.txt";
```


Pulumi:

```ts
let next = counter.inc();
let key = pulumi.interopolate`file-${next}.txt`;
```


the conclusion that each of them ends up making
compromises that we feel hurt the DX too much - enough to justify the hassle of
creating a language and migrating to it. The overall conclusion we came to is
that when such solutions are built over Wing instead of any existing language,
they will offer an even better DX than the one they offer today.





We understand that
the barrier for adopting a new language is high. Developers need to learn
some new syntax, migrate or interop with existing code, 


1. Learn it
2. Interop existing code with it
3. Migrate existing code to it
4. Develop an ecosystem for it
5. Integrating it with toolchains for deployment and management


 











###################

Why a language? 

This is why conventional wisdom dictates that you only create a new language to solve something that cannot be solved in any other way.
In our case that something is to introduce a new programming paradigm that is not supported by existing languages:

PARADIGM HERE

We didn't take the decision to create a language lightly, but took a hard look at existing solutions that try to introduce this paradigm by "forcing" existing languages to support it (through SDKs, annotations, runtimes, language extensions etc.).
We came to the conclusion that each of them ends up making compromises that we feel hurt the DX too much - enough to justify the hassle of creating a language and migrating to it. Expect to find more details of our analysis of each one in a future blog post.
But the overall conclusion we came to is that when such solutions are built over Wing instead of on any existing language, they will offer an even better DX than the one they offer today.

Still, we are very conscious of the difficulties to migrate to a new language, and have tried to ease them as much as possible:
1. Learning curve - We've designed he language to be very familiar and easy to learn to anyone coming from any C based language
2. Interop existing code with it - You can use existing CDK constructs with Wing, you can also interop with Functions in a language. 
3. Migrate existing code to it - At first you'll be able to write Wing code for new parts of a system and have them play well together with the rest of it. Later, we will also introduce tools to convert existing code (both infra and runtime) to Wing
4. Develop an ecosystem for it - Wing supports the NPM ecosystem, and you can use any NPM module in it
5. Integrating it with toolchains for deployment and management - We shift left by compiling to TF and JS, so all the downstream tools stay the same


####################


I suppose you could say the same about Terraform using HCL - but that makes extensive use of it being declarative, which is so unusual that they'd be picking an obscure probably-new-to-the-user language anyway. This just looks.. JS-ish, a bit like anything really.

> I suppose I'm asking what are the language features that make Wing great for 'cloud', any `new Bucket()` etc. aside?

> If you look at its 'design tenets', the only ones that are about the language not the SDK are just saying 'be good/familiar like other languages'... Ok so why not be another language? https://docs.winglang.io/reference/spec#02-design-tenets

https://news.ycombinator.com/item?id=34051497

> I may have only looked too quickly, but the cloud-ness of this looks like more of a library thing than something requiring first class language support.
On the language side, it would be helpful to have a comparison with other async-first runtimes (js, go) in order to understand how/whether the fundamentals here differ.

https://news.ycombinator.com/item?id=34052839

> I don't get it. Why we need a new language, when an Module for a language would do the job too?
NIH-Syndrom? Why not just simply pre compile it to specific language modules?

https://news.ycombinator.com/item?id=34052594

> The example appears to be valid Javascript. I’m not saying it doesn’t look interesting or useful. But, “Why not Javascript?”

https://news.ycombinator.com/item?id=34051910

> I like the idea of creating languages that capture a specific problem really well and making them easier to reason about. At a glance, I couldn't understand why this language makes anything in the cloud easier to do. The front page should focus on what the language does better than others. From what I can tell by going deeper into the docs, the selling points are a unified API for cloud resources across different vendors, inflight functions, and the simulator. Hopefully this language continues to grow and becomes compelling enough to use instead of just TypeScript (which seems to be its closest relative)

https://news.ycombinator.com/item?id=34051478

> Why a new programming language instead of, for example, a cloud oriented Python library.

https://news.ycombinator.com/item?id=34052005

> what makes it a cloud language? what is cloud language even?




#### [Pulumi can do this in TS](https://news.ycombinator.com/item?id=34051558)
>On the other hand the example on the landing page looks very close to what I can do with Pulumi (in Typescript) already.

#### [Shuttle can do this in Rust](https://news.ycombinator.com/item?id=34051943)
>For us, we've chosen to stick with a robust and performant programming language which is increasing in popularity and has enough meta-programming capabilities to make this 'infrastructure from code' paradigm feel natural - the framework blends in well with the language. The advantages of this for us is that users of the language experience a very small learning curve and they can also use incredible Rust libraries off-the-shelf. We can also piggy-back off the Rust compiler and ecosystem to provide an A-class developer experience (those compiler errors are amazing).

#### [Klotho can do this in JS](https://news.ycombinator.com/item?id=34054683)
>I'm one of the founders of Klotho (https://klo.dev), and we're in the camp of expanding existing programming languages with cloud native building blocks. We’re building Klotho in that spirit.

#### [We can improve existing tools to get the desired DX](https://news.ycombinator.com/item?id=34053394)
>This is one of the more sophisticated and cool of the "Self Provisioning Runtime" concepts that have emerged in the last few years (https://swyx.io/self-provisioning-runtime). Some of the others: - https://www.pulumi.com/docs/tutorials/cloudfx/ - https://www.serverless.com/cloud - https://www.shuttle.rs/ - https://encore.dev
>In general, while it's clear that somehow cloud complexity needs to be abstracted away from developers, I don't think it makes sense that new programming languages or frameworks are necessary to do this well. It makes migration of existing apps and backwards compatibility with the existing software ecosystem too challenging.

>At Coherence (withcoherence.com - I'm a cofounder), we believe that a new category anchored by tools like replit, AWS CodeCatalyst, and our products is the solution to this problem, because it does not have the same issues. Instead, it offers best-in-class versions of the same workflows and toolchains that teams are using now, while radically reducing the investment required to get there.

>It's an exciting time in the DevOps world!


#### [Can easily be done with an SDK](https://news.ycombinator.com/item?id=34052817)
>Everything in the demo code could easily be implemented as a Python or JavaScript API.

#### [What new paradigm does the language bring?](https://news.ycombinator.com/item?id=34051478)
> Is there a specific programming paradigm that this language brings to the table?



#### Answer


### Abstractions are hard

https://news.ycombinator.com/item?id=34052400

> This feels like inventing a technology for the sake of it and then trying to fit a problem to it.
> Abstracting over cloud resources is inherently very leaky. Yeah, S3 compliant buckets work, but that's the simplest example possible. Even then, if you're working at scale, you still need to keep in mind features like (AWS) Intelligent Tiering, GET/POST/PUT costs, cross-region costs. This can be the difference between a 15k and 150k bill, you don't want to abstract over it. What's the point of a cloud language if I have to care about the specifics if I'm doing something at scale with it? I can just keep using Java or Python and the respective SDKs.
> I don't want to write all of my stack in a cloud programming language. Especially one that is completely new and not cross-compatible with any other language. This isn't just a small thing -- it's a complete dealbreaker. There's no tools, no libraries. It's been a decade since Nim has started development and look at its progress now with so much interest behind it. Creating PLs and compilers follows the 80/20% rule.. it will take mountains of work to even make the compiler truly optimized and usable, and that's a basic prerequisite.
> The cloud simulator is cool.. but there's already localstack which will simulate AWS services much more faithfully. If you don't have faithful simulation (and you can't do that for every cloud service), you can't use the simulation for anything besides playing around anyway. In which case, why not have a dev/testing environment and kill two birds with one stone? There's no point to unit testing cloud things, that's basically all integration testing anyway. You can unit test the code that interfaces with the cloud using the same language-specific tools that have always been used.

https://news.ycombinator.com/item?id=34054067

> But after having looked into the abstraction that Winglang, and other "infrastructure-from-code" providers have come up with, I'm admittedly very skeptical. As other have mentioned, cloud primitives are almost by nature a leaky abstraction with many bells and whistles to be tuned. So I'm not sure it is a good idea, or feasible in a complex production application, to build on these very high level primitives such as cloud.Queue without limiting yourself to the lowest common denominator of features. But perhaps this issue is solvable by creating a nicer SDK.

https://news.ycombinator.com/item?id=34051462

> Software stacks keep becoming so unnecessarily complex. I suspect this approach will hide more stack details and therefore promote even more pico-services madness.

https://news.ycombinator.com/item?id=34051473

> Love a powerful abstraction. This creates equal feelings of "wow how easy" and "oh no the $$$".

https://news.ycombinator.com/item?id=34053478

> My main problem with uniform solutions like this (or Shuttle) is that they are losing one of the main strengths of distributed systems: the abiility to mix and match different technologies and platforms (both for development and deployment) in the same system.


#### Shai's Response

[Wing team member here] We also believe that creating good, non-leaky abstractions is hard, but we feel that the cloud has matured to a point where the basic services have enough in common with each other to allow us to successfully abstract their _functional_ parts. We do not abstract away the non-functional ones.
It is true that you would get more benefits from Wing as you write more of your code in it and give the compiler more visibility into your code. But you are not required to write everything in Wing, and there is interop to other languages. Since the language compiles to TF and JS at the moment, you can import JS libraries to use in your code and take advantage of the huge JS ecosystem.

The cloud simulator is not meant to simulate the cloud, including its non-functional concerns - you have local stack for that indeed. The idea of the simulator is to give you the most light weight and fastest way to test the functional aspects of your code while you develop it. You definitely need to further test it with local stack and/or the cloud.



### Zero ecosystem

https://news.ycombinator.com/item?id=34051526

>New languages == zero ecosystem—no third-party libraries, community discussion (e.g. StackOverflow), real-world repositories, etc.
>A brand new language thus must be extremely compelling at a syntactical level to make it worth leaving behind existing ecosystems. The new language’s syntax must provide capabilities that are impossible to implement in any other commonly used language. Otherwise, just implement the core language functionality using the syntax of another established language.

>I just don’t see why that couldn’t be done here. Everything in the demo code could easily be implemented as a Python or JavaScript API.

Chris's answer:
>Bootstrapping a language ecosystem is a challenge we know we needed to face from day 1. To avoid starting from scratch, we're designing the language to compile to JavaScript as an intermediate format so that we can add native syntaxes for users to import JavaScript/TypeScript libraries and leverage that existing ecosystem. Our type systems are not the same, but we're trying to make sure users can still be productive and that things "make sense" out of the box, in case you want to import libraries like axios, express, etc.

>We are also designing it to interoperate with the existing ecosystem of "CDK" libraries (https://constructs.dev/) that tens of thousands of developers have already been using to write abstractions for cloud resources based on Terraform, CloudFormation, and Kubernetes.

#### [New language is a deal breaker](https://news.ycombinator.com/item?id=34052742)

> I don't want to write all of my stack in a cloud programming language. Especially one that is completely new and not cross-compatible with any other language. This isn't just a small thing -- it's a complete dealbreaker. There's no tools, no libraries. It's been a decade since Nim has started development and look at its progress now with so much interest behind it. Creating PLs and compilers follows the 80/20% rule.. it will take mountains of work to even make the compiler truly optimized and usable, and that's a basic prerequisite.

>> Shai: [Wing team member here] Wing compiles to JS + Terraform, so all your downstream tools function as they did before

> Ah, that’s an important detail since it makes it a lot easier to fit into an existing pipeline then.
How’s the escape hatch if you need Terraform features which Wing doesn’t already support?

>> Shai: We're still working on it. You are welcome to join our GitHub and help influence what shape it will take. Additionally, you can create your own resource, or a target for a resource if you find the one that comes with the standard library lacking.

> I am of a similar mind... I will say the work that Cloudflare, Deno and a handful of others have done has been really interesting/compelling. I mean, if you don't like TS/JS, there's still WASM as an option. Similarly I think WASM target frameworks will become very interesting in terms of cloud scaling apps in the longer term.

https://news.ycombinator.com/item?id=34054067

What bothers me the most is having to to write code in a completely new language, that kind of treats runtime code as a second class citizen to be embedded in a configuration oriented language that looks like Typescript with some magic added in. Imo, this is far too much friction and risk vs. the benefit that could come from something like this over using your language of choice along with CDK.



### Why is the repository still private?

https://news.ycombinator.com/item?id=34052207

> None of the links to the Github repositories for the language resolve. I checked the link for the compiler [1], the SDK [2], and the VSCode extension [3], and all of them 404. Seems like the repositories are all still private, which is odd, given that the page claims

### There isn't really a problem

https://news.ycombinator.com/item?id=34051645

> Seems like a reasonable effort and we probably need more of this kind of stuff. But still I think the industry should focus more on educating developers to prevent them from introducing mostly unnecessary accidental complexity to today's typical apps rather than inventing new layers to manage it.


https://news.ycombinator.com/item?id=34051591

> The example on the homepage is a good example of why I don't think I'd find this useful. Using Node or Go or whatever to create a file in an S3 bucket based on an incremented value from DynamoDB isn't that hard. The code necessary is maybe a few tens of lines using the official libraries. Actually setting up all the infrastructure to get it to work, with monitored quotas to check things won't fall over, with properly secured IAM profiles, etc is where the all of the pain lies for me.

> This seems to fall into a common trap of making hard things easier at the cost of making easy things harder.

### Bring cloud

https://news.ycombinator.com/item?id=34051594

> What’s the point of “bring cloud”?

> Going to assume "cloud" is the package/module and "bring" is similar to something like "import" etc. so it's probably because "cloud" in this case is a module/package that you need to import to use, so the language itself isn't actually cloud-oriented, but rather the standard framework (if you can call it that) is cloud-oriented.


### The Good Things

https://news.ycombinator.com/item?id=34054067

> I'm still rooting for Wing, and hoping they can figure out these issues, because the problem they are solving is a massive one. I think Winglang has the potential to do for cloud, what Rust did for memory safety by doing smart things at compile time and enforcing policies that could easily be missed by developers. For example, automatically deriving least privilege and minimal permissions for all infrastructure could be a great way to improve security out of the box.

https://news.ycombinator.com/item?id=34054752

> Great works! Seeing the demo in the front page really makes me think of the cloud architecture as a whole may just be an operating system out of itself.
Heck, I once even thought of comparing microservices to microkernel in OS design and that might actually some make sense over time and time again.

https://news.ycombinator.com/item?id=34052499

> its worth noting that the creator of Wing is Elad Ben-Israel - formerly the creator of AWS CDK which has by all accounts been quite popular in the AWS Infra-as-Code world. I kind of view Wing as "CDK++" - if CDK was such a success in flexibily defining and testing infrastructure, what could you do if you further merged in in your language?
> i have no stake in Wing but it is a good example of the Self Provisioning Runtime thesis (https://swyx.io/self-provisioning-runtime)

https://news.ycombinator.com/item?id=34056121

> That animation on the home page is sick af
Good to know that even if the language fails we can still have a job designing landing pages :)

https://news.ycombinator.com/item?id=34052231 

> Interesting. Reminds me of Pulumi that uses Python/Js to define cloud resources. The differentiator is the simulator, that could be a huge advantage - you could test your terraform and app with a single tool. No need for terratest and local lambda sim with AWS SAM.

https://news.ycombinator.com/item?id=34053585

> The team is top notch (of CDK fame) found a non-trivial bug was assigned and fixed in 30 min. In general joy to interact with. Very strong focus on dev. experience. After a very subpar experience of building a very large enterprise project using AWS serverless stack Wing is the first thing that gives me hope that things can be way better.
