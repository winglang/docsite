---
slug: cloudlove
title: "Gotta love the cloud ❤️"
description: The cloud is amazing, but sometimes it feels like a pile of crap.
authors: [eladb]
tags: [cloud, rant, pain, devx, winglang, wing]
hide_table_of_contents: true
---

Don't get me wrong, I love the cloud. It has empowered me to build amazing
things, and completely changed the way I use software to innovate and solve
problems.

I consider it to be one of the most significant paradigm shifts in
general-purpose software engineering, at least since I've started programming
(and it was quite a long time ago).

It's the "new computer", the ultimate computer, the *computerless computer*. It
can scale infinitely, it's always up, it exists everywhere, it can do anything.
It's boundless. It's definitely here to stay (even after we've exhausted all
possible applications of web3 ;-)).

But holy crap, there is no way this is how we are going to be building
applications for the cloud in the next decade. As the cloud evolved from *"I
don't want servers under my desk"* to *"my app needs 30 different managed
services to perform its tasks"*, we kind of lost track of what a great developer
experience looks like.

Building applications for the cloud sometimes feels like spilling my kids' bag
of unused Lego blocks all over the living room floor, and trying to build a
castle. After going through torn up play cards, scary Barbie-doll heads, and
leaking dead batteries, you gotta sort through dozens of mysteriously sticky
types of pieces and read the instructions the millionth time, only to realize
you ended up building basically the same thing you've built last time.

Sorting Lego blocks is fun! It passes the time with the kiddos. It feeds my
OCD... But hell, this is not how I want to build professional software!

Let me try to describe what me and my cloud builder friends are struggling with.

### I want to focus on creating value for my users

When I build professional software, I want to focus on creating value for my
users, not on tinkering with technology. I want most of my time to be spent
within the functional domain of my application, not the non-functional mechanics
of the platform I use.

I realize it is important for me as a developer, or any developer, to understand
how my tech stack works, but I want to be able to decide how deep I dig under
the hood.

It doesn't mean that in order to run some code inside a Lambda function, I must
understand exactly how my code is bundled with tree-shaken dependencies and
uploaded as a zip file into an Amazon S3 bucket, so that the Lambda service will
be able to find it, as it is being deployed through my copy-and-pasted Terraform
state. Or that in order to be able to upload a file to a bucket, my IAM policy
must allow "s3:GetAcl" on its ARN, and does every developer need to understand
what ARNs are at all?

All that stuff doesn't have anything to do with the value I am trying to create
for my users. It's pure mechanics. Can we get rid of it?

If you think about it, we've managed to get rid of most of the mechanics when we
write code whoich targets "normal" computers. For example, When I want to write
a file in Node.js or Java or Python, I am not expected to know which operating
system I am running on, or how files are laid out on disk. I have an API, I call
it, and it does what it says. It's that simple! When I need to use an in-memory
dictionary in my code, I am not expected to understand exactly how the hash of
the keys is calculated, or how much memory space is required in advance.

That's what I want from my cloud, that's how I'd like to use this "new
computer". I want to be able to effectively and safely use it without having to
constantly tinker with its underlying mechanics. Is this too much to ask for?

### I want to be independent

One of the most frustrating and flow-killing situations for me as a developer or
any developer is when someone is blocking me from doing my magic. It feels like
I am gliding happily in the fresh air, enjoying the view with beautiful music
playing in the background, and suddenly, BOOM! I bump into a concrete wall.

This concrete wall takes many shapes and sizes when you build applications for
the cloud. It's the DevOps person with an endless ticket queue; it's the IAM
policy that needs to be updated and deployed; it's the deployment failure that
only the external part-time consultant knows how to debug; It's the endless
backlog of missing knobs and APIs in our new internal cloud platform…

These barriers are frustrating because they force me to switch context, to yank
my brain to something else. To get this thing to work with a "temporary"
security policy, or to go and implement my own version of a distributed cache,
rather than waiting a week for my DevOps team to provision one. This is a broken
world.

I want to be independent. I want to be able to get things done. To improve the
world one commit at a time, and move on to the next thing *after* I am finished.
I want that dopamine rush of completing a task, not the shameful feeling of yet
another unfinished thread.  And though I say "I" I mean "we."

### I want instant feedback

I said I want independence, but don't mistake that for a belief that I write
perfect code. I want to write code with a pencil, not with a pen.

Some developers can spend a full day writing code without even compiling it, and
at the end of the day, deploy it to the cloud and it just works.

I admire them, but I am not that type of developer. No sir. For me it's about
iterations, iterations, iterations. I start small, sketch with a light pencil,
take a look, erase a bunch of stuff, draw a thicker line, take a step back,
squint, draw more and erase more, and take another look, rinse and repeat.

This is why, for me, the single most important thing is to be able to iterate
quickly. The sooner I can run my application and test it, the faster I can go
back and iterate. This is where my flow is. I am the chef that constantly tastes
their recipes and tweaks them to perfection, rather than waking up one morning
and baking the perfect cake.

When I started programming, I used Borland C++. It used to take about 100ms to
compile and run a program on an IBM PC AT machine (granted, with TURBO on).

An average iteration cycle in the cloud takes minutes. **Minutes! Sometimes
dozens of minutes!**

Here's how an iteration looks like in the cloud today: I make a change to my
code, then I need to compile it, deploy it to my test account, find my way
around the management console to actually trigger it, wait for it to run and
find the logs. Then, I see the error returned from the service API call that
tells me I am stupid, because how come I didn't know that I have to pass in
`Accept-Content: application/json`, because otherwise I get something called
"XML" (just kidding, XML is great, no really). Rinse and repeat.

So "write unit tests", you say, in a patronizing attempt to justify the current
reality. "Great developers write unit tests". OK, so now I need to take my code,
which makes about 20 external API calls, and somehow mock out the API responses
by copying and pasting them from outdated documentation, only to figure out that
my requests are rejected because I am missing some implicit action in my IAM
security statement. We've all been there.

I want the developer experience of the 90s: I want to make a change, and I want
to be able to test this change either interactively or through a unit test
within milliseconds, and I want to do this while sitting in an airplane with no
WiFi, okay?

### So this is just a rant?

Hell no! We are humans. We are tool builders.

I am a programmer. I sometimes feel like I've been writing software since birth.
I've been doing it in socially perilous times, when being a computer geek was
not cool, and writing software was a quirky weird hobby.

What I have LOVED perhaps most about being a developer is that if I am not happy
with my tools, I can build my own tools. Building tools is in our DNA, after all
– humans have been building tools for over a million years. We've always tried
to find a better way.

Throughout my career, I've always been that annoying teammate who made the
entire team use their prototype experimental build tool, only to realize it
doesn't even run on Windows.

In 2017, the stars finally aligned and one of these annoying prototypes turned
out to be really useful, and building developer tools became my day job as I had
the privilege and incredible pleasure to build the AWS CDK.

I'm crazy proud of what we accomplished, but because I live in pencil not pen,
it's time to move on.

In March, 2022, I joined forces with Shai, a good friend and a former Microsoft
colleague, and we founded Monada, with a simple mission: to unlock the cloud for
developers. To empower them to use this "new computer" to its full potential.

So, no, this is not just a rant. We are going to take our best shot at making
the cloud not only the best platform, but also the most enjoyable and productive
way to build software.

The cloud has already changed the world despite the programming burdens that
have handcuffed it, and imprisoned developers.  The cloud has helped accelerate
the development of vaccines, enabled businesses to start in weeks not years,
gifted citizens the ability to interact in new ways with their governments, and
given enterprises the ability to operate out of the darkness.

Imagine what it can do when developers – who determine its future – are fully
freed.

And please don't tell me the solution is Kubernetes.
