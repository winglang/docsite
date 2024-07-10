---
title: "Basic API"
subtitle: "Develop a basic API with Wing and deploy to AWS"
type: 
  - "pattern"
platforms:
  - "awscdk"
  - "tf-aws"
  - "sim"
language:
  - "wing"
githubURL: "https://github.com/winglang/examples/tree/main/examples/react-website"  
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