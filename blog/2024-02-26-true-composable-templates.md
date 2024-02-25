---
title: True Composable Templates
description: Contemplating on a discussion with another PM who challenged Wing's value proposition versus templates
authors:
  - eyalk
tags: [platform engineering, templates, terraform modules, winglang, wing cloud]
image: https://github.com/winglang/docsite/assets/1727147/7c395c6f-9cf2-43c6-b4b1-6a5ba4d058bb
hide_table_of_contents: true
---

![Composable Templates](https://github.com/winglang/docsite/assets/1727147/7c395c6f-9cf2-43c6-b4b1-6a5ba4d058bb)


# True Composable Templates

In the journey of software development, particularly for cloud-based projects, templates often 
seem like the go-to solution for their promise of speed and simplicity. This notion was at the 
forefront of a conversation I had with a Product Manager who doesn’t delve into coding. I had 
shared with him about my workshop project, a blend of React, Vite, WebSockets, and a dynamic 
counter, which had garnered positive attention for its effectiveness and ease of setup during 
a workshop. I told him that the audience was able to create a simple but powerful setup that 
worked locally and was deployable on AWS using terraform. I noted that if I would have tried to 
achieve this without Wing, it would have taken me two weeks to get to the same point. However, 
the Product Manager offered a perspective that prompted deep reflection. He acknowledged the 
appeal of my project but pointed out that its functionalities could potentially be replicated 
using templates in any technology. The main point of his argument was about differentiation: if 
a template can encapsulate all that Wing offers, then what truly sets Wing apart? He didn’t stop 
there. He added that templates could be designed with a layer of customization, allowing 
developers to tweak them for specific needs. This layer would enable any developer to adapt the 
template to their unique project requirements.

#### Why are we talking about Templates?

In today's platform engineering space, where companies are creating strong teams with a clear 
mission to “empower developers for self service experience in ways that adhere to the enterprise 
concern” everything looks like a nail and templates are hammer. Whether they come in a form of 
terraform modules, or a set of off the shelf repos you can clone. I would even go far and observe 
teams using solutions like Render.com where you pick up a templatized starter project and start 
working with it. Templates are a very powerful tool with a very appealing time to value, no wonder 
this product manager asked about Wing vs a template on any technology.

#### Templates and Their Limits

While templates offer a starting point, their predefined structure can sometimes box in creativity 
and innovation. They’re great for getting off the ground quickly but may not always cater to the 
nuanced needs of every project. The ability to customize a template does introduce flexibility, 
but this can also introduce complexity, requiring developers to navigate and manipulate the 
template's constraints to suit their specific objectives.

#### Template Composition

Wing stands out by embracing flexibility and composition from the ground up. It’s not just about 
having a framework or a set of functionalities; it’s about how these elements interact and 
complement each other. Wing goes beyond the traditional template model by emphasizing seamless 
integration and adaptability. The system is designed to let developers piece together different 
components like building blocks, ensuring they fit regardless of the project's complexity.

When we normally think about composition in programming language we think about a class being 
composed of members and inheritance. But in practice a cloud system is not just the composition of 
resources, it is also the code and usage patterns that stitches them together. The fact that our 
cloud system is composed of an AWS Bedrock Model and a Lambda Function is just part of this 
composition. In order for a system to be described (using IaC) the components composition must 
consist of which resources are actually calling who. The true composition of a cloud system is also 
the access patterns. The introduction of the "onLift" function exemplifies Wing’s innovative 
approach. This feature automates the permissions and configurations needed when a cloud function 
interacts with other resources, like a bedrock model. With Wing, developers don’t need to manually 
set up these connections or permissions. Instead, they can focus on building their application’s 
unique features, knowing that Wing handles the underlying integrations smoothly.

```ts
class BedrockModel {
 pub onLift(host: std.IInflightHost, ops: Array<str>) {
    if let lambda = aws.Function.from(host) {
      lambda.addPolicyStatements({
        actions: ["bedrock:InvokeModel"],
        effect: aws.Effect.ALLOW,
        resources: [
          "arn:aws:bedrock:*::foundation-model/{this.modelId}"
        ]
      });
    }
  }
}
```

This code snippet illustrates how Wing enables developers to concentrate on what their code is meant to do, 
rather than getting entangled in the operational details. 
It’s about ensuring all parts of the application can communicate and operate without the developer needing to intervene manually. 
In the above example the developer of the bedrock resource, doesn’t know of the callee that is going to use it. 
It does know what is required in order to use itself with other resources. 
The system identified this indirect composition of resource and call the onLift method of the Bedrock model with the callee as the host.

#### The Real Value of Using Wing
The conversation highlighted an important aspect of using templates — the potential for customization to make them fit for any project. 
Yet, Wing's true value lies in its foundational approach to building applications. 
It's designed for developers who want to go beyond the limitations of templates, 
offering a platform where components not only fit together by design but also adapt and evolve as the project grows. 
When a project grows, they grow outside the boundaries of what we initially thought should be the template version, 
the project setup and architecture needs to allow developers to modify their architecture by allowing developers to refactor and change patterns in the way that fits the current business requirements.

## Conclusion
The Product Manager’s insights brought an important dimension to the discussion about Wing versus templates. 
While templates, even with customization options, offer a quick start, Wing provides a deeper level of integration and flexibility. 
It fosters an environment where development is not just about adapting a template to fit but about creating a tailored, 
efficient, and scalable solution from the outset. 
Wing represents a shift towards more dynamic and adaptable cloud development, 
where the focus is on innovation, scalability, and the seamless integration of diverse components.
