---
title: Understanding cloud primitives
id: cloud-primitives
slug: /cloud-primitives
keywords: [Wing contributors, contributors]
---

# Understanding Cloud Primitives

To build cloud applications, it’s crucial to understand cloud primitives—the essential building blocks that represent the core capabilities of cloud computing. These primitives act like the bricks in a wall, forming the foundation for scalable, reliable, and efficient applications.

In this section, we’ll introduce some of the most common cloud primitives and explore their roles in cloud-based systems. This understanding will be valuable as you dive deeper into building applications with Wing later in this guide.

---

## 🚀 **Functions**

Functions are a way to execute specific tasks in the cloud. Often referred to as "serverless functions" in cloud contexts, they enable you to run code without worrying about managing the underlying infrastructure. Functions are:
- **Event-driven**: Triggered by specific events like a file upload, API request, or database update.
- **Stateless**: Each function execution is isolated, with no inherent memory of previous runs.
- **Scalable**: Automatically scales to handle the number of incoming requests.

Functions are ideal for microservices, automation, and APIs.

---

## 🗄️ **Storage**

Cloud storage primitives provide a way to persist data securely and at scale. There are several types of storage designed for specific use cases:
- **Object Storage**: Used for storing files, images, videos, or backups. Examples include storing user-uploaded profile pictures or large datasets.
- **Database Services**: Primitives like managed SQL or NoSQL databases for structured or unstructured data.

---

## 🔄 **Queues**

Queues are essential for managing communication between components in distributed systems. They help decouple services by storing and delivering messages between producers (senders) and consumers (receivers). Key benefits include:
- **Asynchronous Processing**: Tasks can be completed at a later time, improving system responsiveness.
- **Scalability**: Multiple consumers can process messages concurrently.
- **Reliability**: Ensures messages are not lost even if the receiving service is temporarily unavailable.

---

## 📡 **APIs**

APIs are interfaces that allow different systems to communicate. They enable applications to interact with each other, often exchanging data or triggering actions. Key features of APIs include:

- **Request Handling**: Facilitating interactions between clients (such as web or mobile apps) and services.
- **Authentication**: Enforcing access controls to ensure secure communication.
- **Monitoring**: Tracking usage metrics and ensuring optimal performance.

---

## 🛠️ **Infrastructure as Code (IaC)**

While not a specific primitive, Infrastructure as Code is a vital concept for defining cloud primitives programmatically. With IaC, developers can:
- Define resources like functions, queues, and storage using configuration files.
- Reproduce environments consistently across teams and deployments.
- Version-control infrastructure alongside application code.

:::tip Why Choose Wing When We Already Have Infrastructure as Code Options?  
Wing takes a fresh approach to Infrastructure as Code by seamlessly integrating infrastructure and application logic into a single programming model.  
With this hands-on guide, you'll discover how Wing stands apart from traditional IaC frameworks.
:::

---

## 🔒 **Identity and Access Management (IAM)**

IAM primitives ensure that resources are accessed securely and only by authorized entities. Key elements include:
- **Users and Roles**: Represent individuals or services that access the resources.
- **Permissions**: Define who can perform specific actions on particular resources.
- **Policies**: Granular rules that enforce access control.


:::tip How Does Wing Handle Permissions?  
Wing simplifies permission management by analyzing your infrastructure and application logic. When deploying your application, Wing automatically determines and applies the necessary permissions.  

Need more control? Wing also allows you to customize permissions to fit your specific requirements.  
:::

---

## 🕸️ **Networking**

Networking primitives enable cloud resources to communicate with each other and the outside world. They include:
- **Virtual Private Clouds (VPCs)**: Isolated networks within the cloud for private resource communication.
- **Load Balancers**: Distribute incoming traffic across multiple services for high availability.
- **DNS Services**: Resolve domain names to IP addresses, making services accessible.

---

## Putting It All Together

By understanding and combining these cloud primitives, you can build cloud applications tailored to your specific needs. Whether you’re handling data, running services, or managing communication, these building blocks make it all possible.

In the next section, we’ll explore how to connect these primitives to create a complete cloud-based application. Ready to get hands-on? Let’s go!

