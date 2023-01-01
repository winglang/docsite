---
title: Cloud, why so difficult? 🤷‍♀️
description: A manifesto for cloud-oriented programming
image: https://uploads-ssl.webflow.com/63720940a94e098b4e2a542b/637e2d5495f59f7654160773_Social%20thumbnail.png
authors: eladb
tags: [cloud-oriented programming, winglang]
hide_table_of_contents: true
---

> A manifesto for cloud-oriented programming.

Don't get me wrong, I love the cloud! It has empowered me to build amazing
things, and completely changed the way I use software to innovate and solve
problems.

It's the "*new computer*", the ultimate computer, the "*computerless computer*".
It can elastically scale, it's always up, it exists everywhere, it can do
anything. It's boundless. It's definitely here to stay.

But holy crap, there is no way this is how we are going to be building
applications for the cloud in the next decade. As the cloud evolved from "I
don't want servers under my desk" to "my app needs 30 different managed services
to perform its tasks", we kind of lost track of what a great developer
experience looks like.

<!--truncate-->

Building applications for the cloud sometimes feels like spilling my kids' bag
of unused Lego blocks all over the living room floor, and trying to build a
castle. After going through torn up play cards, scary Barbie-doll heads, and
leaking dead batteries, you read the instructions the millionth time, only to
realize you ended up building basically the same thing you've built last time.

Sorting Lego blocks is fun! It passes the time with the kiddos. It even feeds my
OCD… But hell, this is not how I want to build professional software!

*Let me try to describe what me and my developer friends are struggling with.*

### I want to focus on creating value for my users

When I build professional software, I want most of my time to be spent within
the *functional* domain of my application, instead of *non-functional* mechanics
of the platform I use.

It doesn't make sense that every time I want to execute code inside an AWS
Lambda function, I have to understand that it needs to be bundled with
tree-shaken dependencies, uploaded as a zip file to S3 and deployed through
Terraform. Or that in order to be able to publish a message to SNS, my IAM
policy must have a statement that allows the `sns:Publish` action on the topic's
ARN. *And does every developer need to understand what ARNs are at all?*

All that stuff doesn't have anything to do with the value I am trying to create
for my users. It's pure mechanics. **Can we get rid of it?**

### I want to be independent

One of the most frustrating and flow killing situations for me as a developer is
when I have to stop and wait for someone or something in order to continue.

It's like gliding happily in the air, enjoying the view, beautiful music in the
background, and suddenly, *BAM!* A concrete wall.

This concrete wall takes many shapes and sizes when you build applications for
the cloud. It's the DevOps person with an endless ticket queue; it's the IAM
policy that needs to be updated; it's the deployment failure that only the
external part-time consultant knows how to debug; It's the endless backlog of
missing knobs and APIs in the internal platform that we hoped will change
everything.

These barriers are frustrating because they force me to switch context, to apply
"temporary" security policies and to invent ugly hacks that I don't want to talk
about. It's a broken world.

I want to be independent. I want to be able to get things done, to stay in the
flow. I want to improve the world one commit at a time, and move on to the next
thing *after* I am finished. I want that dopamine rush of completing a task, not
the shameful feeling of yet another unfinished thread.

### I want instant feedback

I said I want independence, but don't mistake that for a belief that I write
perfect code. Which is why I want to write code with a pencil, not with a pen.

Some developers can spend a full day coding without even invoking their
compiler, and at the end of the day, they compile and deploy, and it just works.

I admire them, but I am not that type of developer. No sir. For me it's about
iterations, iterations, iterations. I start small, sketch with a light pencil,
take a look, erase a bunch of stuff, draw a thicker line, take a step back,
squint, draw more and erase more, and take another look, *rinse and repeat*.

This is why, for me, the single most important thing is iteration speed. The
sooner I can run my application and test it, the faster I can go back and
iterate. This is where my flow is.

When I started programming, I used Borland C++. It used to take about 100ms to
compile and run a program on an IBM PC AT machine (TURBO ON). **An average
iteration cycle in the cloud takes minutes. Minutes! Sometimes dozens of
minutes!**

Here's how an iteration looks like in the cloud today: I make a change to my
code; then I need to compile it; deploy it to my test account; find my way
around the management console to actually trigger it; wait for it to run and go
search for the logs on another service. Then I realize there is an error
response that tells me that I'm stupid, because how come I didn't know that I
have to pass in Accept-Content: application/json, because otherwise I get some
weird result called "XML" that I have no idea what to do with (just kidding, XML
is great, no really). Now all over again...

So "write unit tests", you say, in a patronizing attempt to justify the current
reality. "Great developers write unit tests". OK! So now I need to take my code,
which makes about 20 external API calls, and somehow mock out the API responses
by copying and pasting them from outdated documentation, only to figure out that
my requests are rejected because I am missing some implicit action in my IAM
security statement. We've all been there.

**To be honest, give me the developer experience of the 90s**. I want to make a
change, and I want to be able to test this change either interactively or
through a unit test within milliseconds, and I want to do this while sitting in
an airplane with no WiFi, okay? (we didn't have WiFi in the 90s).

### So this is just a rant?

Hell no! I am a programmer. I sometimes feel like I've been writing software
since birth. I've been doing it in socially perilous times, when being a
computer geek was not cool.

What I have always loved about being a developer is that if I was not happy with
my tools, I could make my own. Building tools is in our DNA, after all - humans
have been building tools for over a million years.

And I am not happy with my tools.

In March 2022, I joined forces with [Shai Ber], a good friend and a former
Microsoft colleague, and we founded [Monada] with the mission to ***unlock the
cloud for developers***. We've assembled an incredible crew of beautiful geeks
that share our passion for developer experience and open-source, and started our
journey to empower developers (i.e. ourselves) to solve these fundamental
problems.

[Shai Ber]: https://www.linkedin.com/in/shai-ber-245b1226/
[Monada]: https://monada.co/

### Compilers to the rescue

So how are we going to solve all of these problems at once? **We are building a
programming language for the cloud.**

"*A programming language!?*," you ask. "*Doesn't the world have enough
programming languages?*," "*Isn't it really hard to write a compiler?*," "*What
are the chances that developers will want to learn a whole new language?*,"
"*Why can't you hack into an existing language toolchain, squint your eyes tight
enough and call it a day?*"

I am not one to build programming languages on a whim. In fact, I've spent the
last five years building the [AWS CDK], which is a *multi-language library* that
addresses some of the challenges I am talking about by allowing developers to
define cloud infrastructure using their favorite programming language.

[AWS CDK]: https://aws.amazon.com/cdk/

To "meet developers where they are" is a beautiful tenet of AWS, and of the CDK,
and inspired us to create awesome technology such as [JSII] and [constructs].

[JSII]: https://github.com/aws/jsii
[constructs]: https://github.com/aws/constructs

***But sometimes, "where they are" is not a good enough model for creating the
desired experience.***

Defining infrastructure with code does enable us to create a higher-level of
abstraction, but as long as my application code needs to interact with this
infrastructure, the abstraction becomes too [leaky]. I'm yanked back down to
having to understand more than I need to, and I have to be an expert in things
like IAM, VPC, ALB, EBS and basically more TLAs than I would ever want to keep
in my head.

[leaky]: https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/

The languages we use today are all designed around the idea that *the computer
is a single machine*. They've reached the point in which they are able to offer
us solid abstractions over these machines. They abstract away the CPU, memory,
file system, process management and networking. As a developer, I don't have to
care how a file is laid out on disk, or even how much memory I need for my hash
map. I simply write `readFile()` or `new Dictionary()` and go about my day. Yes,
it's not a bad idea for me to have some sense of what's happening under the
hood, but I am not forced to.

Most of these languages also offer me type-safety. When I call a function with
the wrong number of arguments, I get yelled at by my compiler. I don't have to
wait until my application is running only to realize I forget an argument, or
passed in the wrong type.

**In the cloud, I'm on my own**. Every time my code needs to interact with a cloud
resource or a service - and that's happening more and more as the industry
evolves - I have to leave the comfort and safety of my programming language. I
must jump outside the boundaries of the machine and into the wild wild west of
the internet, and my compiler is none the wiser.

And suddenly, it's almost painfully obvious where all the pain came from. Cloud
applications today are simply a patchwork of disconnected pieces. I have a
compiler for my infrastructure, another for my functions, another for my
containers, another for my [CI/CD pipelines]. Each one takes its job super
seriously, and keeps me safe and happy inside each of these machines, but my
application is not running on a single machine anymore, my application is
running on the cloud.

[CI/CD pipelines]: https://dagger.io/

***The cloud is the computer.***

### Wing, a cloud-oriented programming language

When new programming paradigms emerge, it takes languages time to catch up. I
used to love building object-oriented code in C, but it was a leaky abstraction.
I had to understand how objects are laid out in memory, how [V-tables] work, and
remember to pass the object as the first argument for each function. When
programming languages started to support object-oriented concepts as first-class
citizens, this paradigm was democratized, and today most developers don't even
know what V-tables are, and the world keeps spinning.

[V-tables]: https://en.wikipedia.org/wiki/Virtual_method_table

**Wing**, or ***winglang*** if you want to be cute about it, has all the good stuff you
would expect from a modern, object-oriented, strongly-typed and general-purpose
language, but it also includes a few additional primitives designed to support
the distributed and service-based nature of the cloud as first-class citizens.

### Apply for early access if you dare

I can't be more excited to share that after six months of development, we are
finally ready to invite some folks to check it out. It's absolutely and
definitely not ready for real usage. We have a long way to go, but we feel we've
got enough of the architectural framework and design in place, so it's not just
a wild idea by a group of nostalgic programmers.

Go to https://winglang.io to request alpha access.