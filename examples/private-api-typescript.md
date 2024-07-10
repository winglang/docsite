---
title: "HTTP API with Basic Auth"
subtitle: "Building a HTTP API with Basic Auth"
type: 
  - "guide"
  - "pattern"
platform:
  - "awscdk"
  - "tf-aws"
  - "sim"
language:
  - "typescript"
githubURL: "https://github.com/winglang/examples/tree/main/examples/api-basic-auth"
coverImage: "https://github.com/winglang/examples/raw/main/examples/api-basic-auth/diagram.png"
resources:
  - label: "Wing HTTP module"
    href: "/docs/standard-library/cloud/api"
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