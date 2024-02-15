---
title: Building a Private API Gateway in AWS with Winglang
description: A step by step guid to build a private API Gateway in an AWS VPC with Winglang
authors:
  - skorfmann
  - hasanaburayyan
tags: [aws, api-gateway, vpc]
hide_table_of_contents: false
---

This tutorial is a guide for creating a [secure](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html) [API Gateway](https://aws.amazon.com/api-gateway/) inside an AWS Virtual Private Cloud (VPC) using Winglang. A private API Gateway in AWS is used when you need to expose APIs that are only accessible within your Virtual Private Cloud (VPC) or through specific endpoints that you define. This setup is essential for internal or private applications where security and controlled access are crucial.

Wing currently supports two programming languages: TypeScript and [Winglang](https://winglang.io). For the purposes of this tutorial, we'll use Winglang.

Let's start by installing the Wing CLI (you'll need Node.js >= 20.x installed):

```bash
npm i -g winglang
```

You can check the CLI version like this:

```bash
wing --version
0.57.22
```

> Before we get going it would be great if you joined the awesome people hanging out on the [Wing slack](https://t.winglang.io/slack).


Ok, now that we have the Wing CLI installed, let's create a new project using the `private-api` quickstart:

```bash
$ mkdir my-api
$ cd my-api
$ wing new private-api
```

Let's check out what we now have in our project directory:

```bash
my-api/
├── main.w
├── wing.toml
├── package-lock.json
└── package.json
```

If we look at the `main.w` file, we'll see:

```jsx
bring cloud;
bring http;

/**
 * The example below is a simple note-taking app.
 * It uses a cloud.Bucket to store notes and a cloud.Api to expose a RESTful interface.
 * 
 * The api has two endpoints:
 * - GET /note?name=NAME to get a note by name
 * - PUT /note/:NAME to save a note by name
 * 
 * The app also includes two cloud.Functions to consume the api.
 * - Consumer-PUT reads a string like: `NAME:NOTE` and calls the api to save it.
 * - Consumer-GET reads a string like: `NAME` and calls the api to get the note.
 * 
 * These consumer functions are not required for the app to work, but since our api is private, they are useful for testing.
 * As an example, if you deploy this app to AWS, you can use the AWS CLI to invoke these functions
 * by running the following commands, you can test the api:
 * `aws lambda invoke --cli-binary-format raw-in-base64-out --function-name <function-name> --payload "\"n1:this is my note\"" response.json`
 * `cat response.json`
 * 
 * And retrieve the note:
 * `aws lambda invoke --cli-binary-format raw-in-base64-out --function-name <function-name> --payload "\"n1\"" response.json`
 * `cat response.json`
 *
 * If you have not made changes to this template you can find your function names in AWS using the following command:
 * `aws lambda list-functions --query "Functions[?starts_with(FunctionName, 'Consumer')].FunctionName"`
 */
let noteBucket = new cloud.Bucket();

let api = new cloud.Api();

api.get("/note", inflight (request) => {
  let noteName = request.query.get("name"); 
  let note = noteBucket.get(noteName);

  return {
    status: 200,
    body: note
  };
});

api.put("/note/:name", inflight (request) => {
  let note = request.body;
  let noteName = request.vars.get("name");

  if (note == "") {
    return {
      status: 400,
      body: "note is required"
    };
  }

  noteBucket.put(noteName, note ?? "");

  return {
    status: 200,
    body: "note: {noteName} saved!"
  };
});

// Consumer functions (not required for the app to work, but useful for testing)
new cloud.Function(inflight (event: str?) => {
  if let event = event {
    let parts = event.split(":");
    let name = parts.at(0);
    let note = parts.at(1);

    let response = http.put("{api.url}/note/{name}", {
      body: "{note}"
    });
    return response.body;
  }

  return "event is required `NAME:NOTE`";
}) as "Consumer-PUT";

new cloud.Function(inflight (event: str?) => {
  if let event = event {
    return http.get("{api.url}/note?name={event}").body;
  }

  return "event is required `NAME`";
}) as "Consumer-GET";
```

You'll notice, there's nothing in this Wing code that implies that the API needs to be inside the VPC. This is because in Wing, this type of configuration happens at that *platform level* and not at the *application level*.

Your platform configuration happens inside `wing.toml`:

```toml
[ tf-aws ]
# vpc can be set to "new" or "existing"
vpc = "new"
# vpc_lambda will ensure that lambda functions are created within the vpc on the private subnet
vpc_lambda = true
# vpc_api_gateway will ensure that the api gateway is created within the vpc on the private subnet
vpc_api_gateway = true
# The following parameters will be required if using "existing" vpc
# vpc_id = "vpc-123xyz"
# private_subnet_id = "subnet-123xyz"
# public_subnet_id = "subnet-123xyz"
```

This `wing.toml` file sets configuration options for the `tf-aws` platform. The quickstart configures the platform to create a new VPC for this app and put Amazon API Gateways and AWS Lambda functions inside that VPC.

> Built-in Wing platforms such as tf-aws support certain common configuration options (such as private APIs). If you need additional customization, you can always create your own custom platforms and have complete control over how your app is deployed to the cloud.
>

Before we deploy our app to AWS, let's first check it out in the Wing Simulator:

```bash
wing it
```

> If this is the first time you are running the Wing Simulator on your machine, you'll need to sign up with your GitHub credentials so that you can later on setup your app for Wing Previews and use cloud-based development tools like webhook forwarding and app sharing.
>

Once the Wing Simulator is running, you'll be able to see your API endpoint, invoke it and see the response.

Next, let's deploy this to the cloud:

> Make sure to have [Terraform](https://developer.hashicorp.com/terraform/install) installed. The `terraform init` step is only required for the initial deployment.

```
wing compile -t tf-aws
terraform -chdir=./target/main.tfaws init
terraform -chdir=./target/main.tfaws apply -auto-approve
```

This command will compile and deploy your Wing application to the AWS account configured in your environment. You'll notice that it will create a new VPC for you with all the desired setup.

But what if I wanted to deploy my app into an existing VPC? It's very common for a VPC to be shared across multiple applications. This can be done by editing your `wing.toml` file like this:

```toml
[tf-aws]
vpc = "existing"
vpc_id = "vpc-288494x"
private_subnet_id =  "subnet-a112"
public_subnet_id = "subnet-a2x1"
vpc_apigateway = true
vpc_lambda = true
```

That's it, by setting `vpc` to `existing` and by adding the relevant private subnets Wing won't create a new VPC but rather add the application resources to an existing VPC in your account.