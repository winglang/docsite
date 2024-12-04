---
title: Installation and setup
id: installation
slug: /Installation
keywords: [Wing contributors, contributors]
---

Now that we have some background on Wing and cloud computing, we are ready to create our first Wing application.

1. [Install Wing](#installing-wing)
2. [Setup Wing Project](#setup-your-wing-project)
3. [Creating Hello World API](#creating-a-hello-world-api)

## Installing Wing

First thing we need to do is install Wing on your computer. You can do this running the command below

```bash
npm install -g winglang
```

Once Wing has finished installing you can verify the installation with this command:

```bash
wing --version
```

Now you have Wing installed, let's build our first application.

## Setup your Wing project

Create an empty directory for your project:

```bash
mkdir hello-world-wing
cd hello-world-wing
```

Next we will use the [Wing CLI](/docs/api/cli#compile-test-and-run-wing-programs) to bootstrap our new project. Use the `new` command to create the project.

```bash
wing new empty
```

Running the command generates the following files in your new folder:

```bash
hello-world-wing/
├── main.w
├── package-lock.json
└── package.json
```

#### File descriptions
- **`main.w`**: The main file where your Wing application logic resides.
- **`package-lock.json`**: Automatically generated file that locks the versions of dependencies for consistent installs.
- **`package.json`**: Defines your project configuration, including dependencies and metadata.

Your `main.w` file will contain a very basic Wing application. 

```js
bring cloud;
bring expect;

// Cloud function to return hello world
let fn = new cloud.Function(inflight () => {
  return "hello, world";
});

// Testing your cloud function
test "fn returns hello" {
  expect.equal(fn.invoke(""), "hello, world");
}
```

This example shows how you can create a function and test the output of that function. 

In the next step, we will change this and add a new [API](/docs/guide/cloud-primitives#-apis) and [storage](/docs/guide/cloud-primitives#%EF%B8%8F-storage).

