# True Composable Templates

In the journey of software development, especially for cloud-based projects, templates are often
seen as the go-to solution due to their promise of speed and simplicity. This concept was central
to a discussion I had with a Product Manager who doesn't specialize in coding. I shared details
about my workshop project—a blend of React, Vite, WebSockets, and a dynamic counter—that received
positive feedback for its effectiveness and ease of setup during a workshop. The audience managed
to create a simple yet powerful setup that worked locally and could be deployed on AWS using
Terraform. I noted that achieving this without Wing would have taken me two weeks to reach the same
point. However, the Product Manager offered a perspective that led to deep reflection. He
acknowledged the appeal of my project but pointed out that its functionalities could potentially be
replicated using templates in any technology. His main argument focused on differentiation: if a
template can encapsulate all that Wing offers, then what truly sets Wing apart?

He elaborated that templates could be designed with a customization layer, allowing developers to
adjust them for specific needs, enabling any developer to adapt the template to their unique
project requirements.

### Why Are We Talking About Templates?

In today's platform engineering space, where companies are forming strong teams with the clear
mission to “empower developers for a self-service experience in ways that adhere to enterprise
concerns,” everything looks like a nail, and templates are the hammer. Whether they come in the
form of Terraform modules or a set of off-the-shelf repositories you can clone, templates are a
powerful tool with a very appealing time-to-value proposition. It's no wonder this product manager
inquired about Wing versus a template in any technology.

### Templates and Their Limits

While templates provide a starting point, their predefined structure can sometimes limit creativity
and innovation. They're great for quickly getting off the ground but may not always cater to the
nuanced needs of every project. The ability to customize a template introduces flexibility, but it
can also add complexity, requiring developers to navigate and manipulate the template's constraints
to suit their specific objectives.

### Template Composition

Wing stands out by embracing flexibility and composition from the ground up. It's not just about
having a framework or a set of functionalities; it's about how these elements interact and
complement each other. Wing goes beyond the traditional template model by emphasizing seamless
integration and adaptability. The system is designed to let developers piece together different
components like building blocks, ensuring they fit regardless of the project's complexity.

When we typically think about composition in programming languages, we think about a class composed
of members and inheritance. But in practice, a cloud system is not just the composition of
resources; it is also the code and usage patterns that stitch them together. The true composition
of a cloud system also includes the access patterns. The introduction of the "onLift" function
exemplifies Wing’s innovative approach, automating the permissions and configurations needed when a
cloud function interacts with other resources, like a bedrock model. With Wing, developers don’t
need to manually set up these connections or permissions. Instead, they can focus on building their
application’s unique features, knowing that Wing handles the underlying integrations smoothly.

### The Real Value of Using Wing

The conversation highlighted an important aspect of using templates — the potential for
customization to make them fit for any project. Yet, Wing's true value lies in its foundational
approach to building applications. It's designed for developers who want to go beyond the
limitations of templates, offering a platform where components not only fit together by design but
also adapt and evolve as the project grows. When a project grows, it moves outside the boundaries
of what we initially thought should be the template version. The project setup and architecture
need to allow developers to modify their architecture by enabling them to refactor and change
patterns in a way that fits the current business requirements.

## Conclusion

The Product Manager’s insights added an important dimension to the discussion about Wing versus
templates. While templates, even with customization options, offer a quick start, Wing provides a
deeper level of integration and flexibility. It fosters an environment where development is not
just about adapting a template to fit but about creating a tailored, efficient, and scalable
solution from the outset. Wing represents a shift towards more dynamic and adaptable cloud
development, focusing on innovation, scalability, and the seamless integration of diverse components.
