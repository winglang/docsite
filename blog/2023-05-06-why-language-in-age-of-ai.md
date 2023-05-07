---
title: "Why We're Building a Programming Language for Cloud Development in the AI Era"
description: Discover why we're building a programming language for cloud development when some believe that AI will soon replace developers.
authors: 
  - shaiber
tags: [winglang, ai]
hide_table_of_contents: true
---

## Abstract
As long as AI serves as a co-pilot rather than an auto-pilot, there's room for a language that facilitates effective collaboration between humans and AI. This can be achieved by reducing cognitive load and enabling rapid testing, significantly cutting iteration times. Moreover, AI simplifies the adoption of new languages.

<!--truncate-->
## Introduction
Why am I investing time and effort in the development of a new programming language (for humans) today, when AI is rapidly advancing and taking over more coding tasks?

I often encounter this question in various forms:

1. Won't AI eventually write machine code directly, rendering programming languages obsolete?
2. Can a new language introduce features or capabilities that AI cannot achieve using existing languages? (e.g., why create a cloud-portable language when AI can write code for a specific cloud and then rewrite it for another?).
3. Is it worthwhile to create tools for developers who might soon be replaced by AI?

Firstly, I must admit that I cannot predict the pace of AI advancement. Reputable experts hold [differing opinions](https://fortune.com/2022/06/03/elon-musk-artificial-intelligence-agi-tesla-500k-bet/) on when, or if, AI will replace human developers.

However, even if AI does eventually replace human developers, it may not necessarily write machine code directly. Why would an AI choose to re-invent the wheel for each app by writing machine code directly when it can rely on proven abstraction layers and compilers, allowing it to efficiently focus on the unique aspects of the business it serves? By building on existing work and focusing on smaller, simpler tasks, the AI can yield faster, higher-quality results.

Having covered the more distant future, I now want to focus on the more immediate future in the remainder of this post.

I believe that, given human limitations and psychology, change will likely be gradual despite AI's rapid progress, leading to a significant transitional period with humans remaining in the loop. For instance, it's hard to imagine organizations not desiring a human to be accountable for the AI's output. That human would be very reluctant to let the AI do its work in a way that the human cannot understand, modify, and maintain. Think about it, would you let ChatGPT write a professional article for your peers, in your name, in a language you don't speak? Would you publish it without being able to read it? Probably not..
Similarly, would an engineering manager release a mission-critical app to production knowing that it was written by AI in a way that would make it hard for humans to step in if something goes wrong?

Additionally, while it is true that AI is an equalizer between tools to some degree, it still doesn't completely solve the problem. Let's take the cloud portability example from above: even if the AI can port my code between clouds, I still want to be able to read and modify it. As a result, I must become an expert in all these clouds at the level of abstraction the AI used. If a new language allows it to write at a higher level of abstraction, it will be easier for me to understand and modify it too.

Therefore, I believe that for the foreseeable future there is room for tools that make it easier for both humans and AI to write quality code swiftly, collaborate effectively, and test more rapidly. Such tools will allow us to enhance the quality and speed of our application delivery.

## The Key: Reducing Cognitive Load and Accelerating Iteration

Whether you're an AI or a human developer, reducing complexity and iterating faster will result in better applications developed more quickly.

So, what can be done to make these improvements?

### Working at a Higher Level of Abstraction

Utilizing a higher level of abstraction offers the following benefits for both human and AI coders:

1. **Reduces cognitive load for human developers** by focusing on the app's business logic instead of implementation details. This enables developers to concentrate on a smaller problem (e.g., instructing a car to turn right, rather than teaching it how to do so), deal with fewer levels of the stack, write less code, and minimize the surface area for errors.
2. **Reduces cognitive load for AI**. This concept may need further clarification. AI systems come pre-trained with knowledge of all levels of the stack, so knowing less is not a significant advantage. Focusing on a smaller problem is also not as beneficial as it would be for a human, because as long as the AI knows how to instruct the car to turn, it shouldn't have an issue teaching it how to do so instead of just telling it to turn. But it's still advantageous, as explained above, since it reduces the problem surface, allowing the AI to generate the code faster and at a higher quality. However, allowing the AI to write less code and reducing the chance for it to make mistakes is highly beneficial, as AI is far from infallible. Anyone who has witnessed it hallucinate interfaces or generate disconnected code can attest to this. Furthermore, AI is constrained by the amount of code it can generate before losing context. So writing less code enables AI coders to create larger and more complex parts of applications.
3. **Accelerates iteration speed** because it requires writing less code, reducing the time it takes to write and maintain it. While it might not seem intuitive, this is equally important for both human and AI coders, as AI generates code one token at a time, similar to how a human writes.
4. **Improves collaboration between human and AI coders.** A smaller code base written at a higher level of abstraction allows human developers to understand, modify, and maintain AI-generated code more quickly and easily, resulting in higher quality code that is developed faster.

### Faster Deployment and Testing

Currently, deploying and testing cloud applications can take several minutes. Multiply this by numerous iteration cycles, and there's significant room for improvement.

Running tests locally is also challenging, as it requires mocking the cloud environment around the tested component.

Moreover, it's impossible to use the same tests locally and in the cloud.

By writing tests that can run both locally and in the cloud, and executing them quickly, we can vastly improve iteration speeds, regardless of whether the code is written by an AI, a human, or a collaboration between them.

So, how can we make this happen?

## Introducing Winglang

**Winglang is a new programming language for cloud development that enables both human and AI developers to write cloud code at a higher level of abstraction, and comes with a local simulator that lets them test it super quickly.**

### Quantifying the Improvement

As we'll demonstrate below, we're talking about a 90%-95% reduction in code and orders of magnitude increase in testing speeds.

### Let's See Some Code

Here's an example of a small app that uploads a file to a bucket (think AWS S3, Azure Blob Storage, or GCP Bucket) using a cloud function (AWS Lambda, Azure Function, or GCP Cloud Function).

This is the code in Wing:

```ts
bring cloud;

let bucket = new cloud.Bucket();
        
new cloud.Function(inflight () => {
  bucket.put("hello.txt", "world!");
});
```

As you can see, either a human or an AI coder that writes Wing code is working at a high level of abstraction, letting the Wing compiler take care of the underlying cloud mechanics, such as IAM policies and networking (don't worry, it is [customizable](https://docs.winglang.io/blog/2023/02/17/plugins) and extensible, so you don't lose control when needed). 

Unlike human and AI coders, the compiler cannot make mistakes. It is also faster, deterministic, and doesn't lose context after a while. So the more work we delegate to it over either human or even AI the better.

By the way, the code can be compiled to any cloud provider, and its output is Terraform and JavaScript, which can be deployed with existing tools.

Now let's take a look at the same code in one of the leading cloud development stacks today - Terraform + JavaScript.

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

As you can see, the Wing code is 7 lines long, while the Terraform and JavaScript code is 122 lines, or ±17X more code. Not only that, it dives deeply into lower layers of the cloud stack.

You might be wondering if there are newer solutions against which Wing's gains are less significant, or if the same results can be achieved through a library or a language extension. You can see how Wing compares to other solutions and why it's a new language rather than some another solution [here](https://docs.winglang.io/faq/why-a-language).

### Testing with Wing

Wing comes out of the box with a local simulator and a visualization and debugging console.

These tools enable developers to work on their code with near-instant hot-reloading and test cloud applications very easily without having to mock the cloud around them.

In the example of our very simple app above, deploying to any cloud provider in order to run tests would take close to a minute, whereas with the Wing Simulator it takes less than a second - or 2 orders of magnitudes less. Moreover, with Wing, you can write tests without mocking the cloud and run the same ones on the simulator and in the cloud.

This is a short [video](https://www.youtube.com/watch?v=vHy1TM2JzUQ) of the experience.

You can get a first-hand sense of it in the [Wing Playground](https://play.winglang.io/).

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