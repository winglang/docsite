---
title: "Wing, Vite and React"
subtitle: "Learn how to deploy your react application using Wing."
type: 
  - "pattern"
platform:
  - "awscdk"
  - "tf-aws"
  - "sim"
language:
  - "wing"
githubURL: "https://github.com/winglang/examples/tree/main/examples/react-website"  
coverImage: "https://github.com/winglang/wing/assets/598796/e6e5e8d9-52fc-4fdf-a600-ba00271b6ef6"
resources:
  - label: "Run application locally with the Wing simulator"
    href: "/docs/platforms/sim"
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
---

# Hello world

This is an awesome page of how we do things around here.

```js
bring vite;
bring cloud;

let api = new cloud.Api(cors: true);

new vite.Vite(
  root: "../frontend",
  publicEnv: {
    TITLE: "Wing + Vite + React",
    API_URL: api.url
  }
);    
```