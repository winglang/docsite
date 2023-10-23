---
title: "Wingly In Depth: Exploring the evolution of DevOps- A conversation with Adam Jacob"
authors: 
  - dcahana2
tags: [wingly, winglang, interview,recap]
hide_table_of_contents: true
---


<iframe width="560" height="315" src="https://www.youtube.com/embed/H7bd7TghWoo?si=HMxAS8gHrWsQh4Pb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<!--truncate-->
## Exploring the evolution of DevOps: A conversation with Adam Jacob

In this Wingly update, Elad and Shai sit down with Adam Jacob, CEO and Co-Founder of [System Initiative](https://www.systeminit.com/). <br />

This blog post summarizes their enlightening discussion on the shared vision, challenges, and the organic evolution of design processes in the industry. <br /> <br />

### A career journey that follows the Internet's evolution

Growing up, Adam was hooked on bulletin boards, an early form of the Internet. By the time he was eight, he had one of his own. 

His early passion evolved into a role as a systems administrator, with a keen focus on operations as the Internet developed. While many were diving into app creation and online communities, Adam thought more holistically, always drawn to the technology that powers other technology. 
This commitment to understanding the foundations is clear in his work at Chef and System Initiative, where he crafts software for the people who create digital infrastructures.

### Bridging the divide between software engineering and DevOps

From Adam's perspective, the distinction between software engineering and what's now labeled as “DevOps” is artificial. For example, he recalls the days of wrestling with the notoriously intricate configurations of Sendmail, an email routing software. 

Mastering its complex syntax was as challenging as learning programming in C. This challenges the preconceived notion: Which of these tasks qualifies as “programming”?
According to Adam, the industry historically placed an artificial divide between system administrators and software developers, often placing the latter on a pedestal. <br />
In fact, both groups are essentially programmers, with their primary difference lying in the languages they use and the problems they tackle. It was this very realization that drove him to develop tools for systems experts. 

From Elad’s POV, while all elements in this space are fundamentally software, different layers and roles tackle varying problem domains. Developers focused on building applications predominantly engage with the business's problem domain. 
In contrast, those who work on infrastructure, operations, or the platform side grapple with a distinct set of issues, however, both groups, regardless of their domain, are integral in the larger software ecosystem.


### Reassessing the DevOps paradigm: The shortcomings

Adam believes that the DevOps industry's initial focus may have been somewhat misaligned. 
In the early days of DevOps, there was an overwhelming emphasis on automation, with the goal being to enhance collaboration between application developers and operations teams.
While the tools developed during this phase were commendable, the outcomes in larger enterprises were often less than satisfactory. Many individuals sensed something was amiss but struggled to pinpoint the actual problem.
At the core of this dilemma is a systemic issue. The initial efforts concentrated on bringing application developers and operational experts closer, emphasizing their collaboration. However, the industry primarily automated the existing process rather than reinventing it. 
For instance, a primary collaborative point in many DevOps workflows is the pull request review – a reactive process that assesses work done instead of actively collaborating on it.
So the issues aren’t so much about specific technologies, but rather how the whole workflow has been structured. 

### Reassessing the DevOps paradigm: The solution

The answer lies in reassessing and redesigning the workflow to achieve better outcomes, which is something that both Wing and System Initiative are doing.
In essence, to rectify the systemic problems plaguing the DevOps realm, Adam believes it's imperative to reinvent the system modeling approach. 

#### The core challenges: Feedback loops and inference
The two principal challenges are feedback loops and inference:
- Firstly, it's about the duration it takes to determine if a specific action is correct or erroneous
- Secondly, there's the issue of whether a configuration is universally wrong or if it's only problematic in a specific environment
  
### System Initiative's approach: Simulating real-time feedback 
To address the feedback loop challenge, System Initiative created a high-fidelity simulator. 
This simulator allows users to model potential outcomes and establish applicable rules. Instead of actual implementation, if the model is precise enough, it can instantly notify users if they're on the right track or if their approach adheres to set policies.

### Managing configuration inference 
The repetitive nature of configuration across various layers of the stack is something that often leads to inconsistencies, inefficiencies, and increased potential for errors in the deployment process. 
For example, determining the port an application operates on. The value and syntax for this can differ widely across platforms, from Docker to Kubernetes and Azure. 
System Initiative tackles this by visualizing the simulation as a complex graph with numerous layers. At each point, a function runs to generate a value, and this value is consistently updated, translated, and inferred across various platforms. This approach not only ensures configuration correctness but also dynamically derives the accurate code for any given domain.

### Tracking real-world resource states 
Another integral feature of System Initiative is its ability to monitor the actual state of the resources in use. This is crucial because sometimes definitions can be concrete (like managing an EC2 instance) or abstract (defining an 'application'). System Initiative models all these entities. When there's a mismatch between the model and the resource, the platform notifies users, allowing them to either reconcile the differences or adjust the model accordingly.

### The System Initiative persona
The initial target audience for System Initiative is innovative DevOps engineers, who are already showing some serious enthusiasm for the tool's potential to revolutionize their workflow and the broader infrastructure management landscape.
System Initiative also recently open-sourced the software, which is available under the Apache license and it will always remain so.
Adam also paints a future where System Initiative isn't just limited to DevOps engineers. As the software evolves, its vast data modeling capabilities will extend its utility across various roles in the software development lifecycle. 
What will vary is the interface. For instance, while a DevOps engineer might be more invested in the infrastructure aspects, an application developer's focus might lean towards deployment, test coverage, and other application-centric details. 
As time progresses, the System Initiative interface will adapt and diversify to cater to the needs of these different personas.

### Embracing commonalities in DevOps evolution
It's evident that both System Initiative and Wing are converging toward a shared vision in how they address the architectural complexities of modern cloud applications. Both tools aim to provide an abstract model of cloud applications, where each node interrelates with others and has associated code that defines its behavior. This approach allows for higher-level abstractions by combining multiple resources.

What's intriguing is that despite these tools being developed independently, their underlying principles echo similar sentiments. This isn't mere coincidence but a reflection of shared challenges and insights from the industry's history. 
When it comes to the realm of problem-solving in DevOps, there are finite threads to pull, and pulling the same threads often leads to analogous solutions.

Moreover, the journey of creating DevOps tools has become a collaborative conversation among peers, where learning is mutual. This dialogue across the industry, with stalwarts like Joe from Pulumi or Mark Burgess, reflects a rich tapestry of ideas and insights that contribute to shaping the future of DevOps.

However, beyond the technological affinities, there's also the cultural aspect to consider. With multiple solutions emerging in the DevOps space, fostering collaboration and mutual respect among diverse communities is critical. The rapport among creators trickles down to their user communities, setting the tone for open, kind, and constructive discussions about divergent views or approaches.

By recognizing that engineers have varied preferences and cognitive styles, it's important to offer diverse interfaces while also finding common ground. As the dialogue closes, there's a consensus on the significance of community-building and mutual respect. Such a nurturing ecosystem can accelerate innovation, making the DevOps world richer, more integrated, and ultimately beneficial for its end-users.









