---
title: "Why We're Building a Programming Language for Cloud Development in the AI Era"
description: Discover why we're building a programming language for cloud development in the era of generative AI.
authors: 
  - shaiber
tags: [winglang, ai]
hide_table_of_contents: true
---

# As long as AI is our co-pilot and not an auto-pilot, we can enhance collaboration with it by reducing our code base by 90-95% and testing it 100x faster. AI also eases adopting new languages.

As AI becomes an increasingly integral part of our development processes, it enhances developers' efficiency and capabilities. 

Some predict that it will eventually replace human coders, while others believe that day is still far off. In the meantime, we're experiencing a gradual shift where AI writes more code, and humans maintain their vital roles — writing some code, directing AI to write other parts, reviewing the code, debugging and maintaining it.

If we can make it easier for both humans and AI to write good code more quickly, collaborate efficiently, and test it faster, we can improve the quality and speed of our application delivery.

## The Key: Reducing Cognitive Load and Accelerating Iteration

Whether you're an AI or a human developer, reducing cognitive load and iterating faster will result in better applications developed more quickly.

So, what can be done to make these improvements?

### Working at a Higher Level of Abstraction

Utilizing a higher level of abstraction offers the following benefits for both human and AI coders:

1. **Reduces cognitive load for human developers** by focusing on the app's business logic instead of implementation details. This enables developers to concentrate on a smaller problem (e.g., instructing a car to turn right, rather than teaching it how to do so), deal with fewer levels of the stack, write less code, and minimize the surface area for errors.
2. **Reduces cognitive load for AI**. This concept may need further clarification. AI systems come pre-trained with knowledge of all levels of the stack, so knowing less is not a significant advantage. Focusing on a smaller problem is also not a substantial benefit because, as long as the AI knows how to instruct the car to turn, it shouldn't have an issue teaching it how to do so instead of just telling it to turn. However, allowing the AI to write less code and reducing the chance for it to make mistakes is highly beneficial, as AI is far from infallible. Anyone who has witnessed it hallucinate interfaces or generate disconnected code can attest to this. Furthermore, AI is constrained by the amount of code it can generate before losing context. So writing less code enables AI coders to create larger and more complex parts of applications.
3. **Accelerates iteration speed** because it requires writing less code, reducing the time it takes to write and maintain it. While it might not seem intuitive, this is equally important for both human and AI coders, as AI generates code one token at a time, similar to how a human writes.
4. **Improves collaboration between human and AI coders.** A smaller code base written at a higher level of abstraction allows human developers to understand, modify and maintain AI-generated code more quickly and easily, resulting in higher quality code that is developed faster.

### Faster Deployment and Testing

Currently, deploying and testing cloud applications can take several minutes. Multiply this by numerous iteration cycles, and there's significant room for improvement.

Running tests locally is also challenging, as it requires mocking the cloud environment around the tested component.

Moreover, it's impossible to use the same tests locally and in the cloud.

By writing tests that can run both locally and in the cloud, and executing them quickly, we can vastly improve iteration speeds, regardless of whether the code is written by an AI, a human, or a collaboration between them.

So, how can we make this happen?

## Introducing Winglang

**Winglang is a new programming language for cloud development that enables both human and AI developers to write cloud code at a higher level of abstraction, and comes with a local simulator that lets them test it super quickly.**

### Quantifying the Improvement

We're talking about a 90%-95% reduction in code and a 100X increase in testing speeds.

### Let's See Some Code

Here's an example of a small app that uploads a file to a bucket using a cloud function.

This is the code in Wing:

```ts
bring cloud;

let bucket = new cloud.Bucket();
        
new cloud.Function(inflight () => {
  bucket.put("hello.txt", "world!");
});
```

As you can see, either a human or an AI coder that writes Wing code is working at a high level of abstraction, letting the Wing compiler take care of the underlying cloud mechanics, such as IAM policies and networking (don't worry, it is [customizable](https://docs.winglang.io/blog/2023/02/17/plugins) and extensible, so you don't lose control when needed). 

Unlike human and AI coders, the compiler cannot make mistakes. It is also faster, deterministic and doesn't lose context after a while. So the more work we delegate to it over either human or even AI the better.

By the way, the code can be compiled to any cloud provider, and its output is Terraform and JavaScript, which can be deployed with existing tools.

Now let's take a look at the same code in the leading cloud development stack today - Terraform + JavaScript.

`main.tf`:

```js
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

locals {
  lambda_function_name = "upload_hello_txt_lambda"
}

resource "aws_s3_bucket" "this" {
  bucket = "my-s3-bucket"
  acl    = "private"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "index.js"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "this" {
  function_name = local.lambda_function_name
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  filename      = data.archive_file.lambda_zip.output_path
  timeout       = 10

  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.this.bucket
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Action = [
          "s3:PutObject"
        ]
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.this.arn}/*"
      }
    ]
  })
}

output "bucket_name" {
  value = aws_s3_bucket.this.bucket
}

output "lambda_function_name" {
  value = aws_lambda_function.this.function_name
}
```

`index.js`:

```js
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;
  const key = 'hello.txt';
  const content = 'Hello world!';

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: content,
  };

  try {
    await S3.putObject(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify('File uploaded successfully.'),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error uploading the file.'),
    };
  }
};
```

As you can see, we have to write 17X more code and dive deeply into lower layers of the cloud stack.

You might be wondering if there are newer solutions against which Wing's gains are less significant, or if the same results can be achieved through a library or a language extension. You can see how Wing compares to other solutions and why it's a new language rather than some another solution [here](https://docs.winglang.io/faq/why-a-language).

### Testing with Wing

Wing comes out of the box with a local simulator and a visualization and debugging console.

These tools enable developers to work on their code with near-instant hot-reloading and test cloud applications very easily without having to mock the cloud around them.

This is a short [video](https://www.youtube.com/watch?v=vHy1TM2JzUQ) of the experience.

You can play with it yourself with zero friction in the [Wing Playground](https://play.winglang.io/).

## Conclusion

Although Wing introduces significant improvements in cloud development, we understand that migrating to a new language is a substantial undertaking that may be hard to justify in many cases.

We’ve gone to great lengths to make adopting the language as easy as possible with the following features:

- Easy to learn because it is similar to other languages.
- Works seamlessly with your existing stack and tools (especially deployment and management).
- Mature ecosystem - import any NPM module or Terraform resource into your code.
- Integrates into existing code bases - write runtime code in other languages and reference it with Wing.

Furthermore, we believe that in the era of AI, adopting a new language like Winglang is easier for humans as AI assists in writing code in unfamiliar languages and frameworks and simplifies the migration of existing code to new languages.

As we move toward a future where AI plays a more significant role in code development, the creation and adoption of languages like Winglang will ensure better collaboration, faster development, and higher-quality applications for both human and AI developers.

To get a glimpse of the future and experience writing code in Wing and testing it instantly, you can visit our [playground](https://play.winglang.io/).