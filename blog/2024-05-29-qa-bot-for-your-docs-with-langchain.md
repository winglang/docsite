---
title: "Build a QA Bot for your documentation with Langchain"
description: A ChatGPT client app built with Winglang and NextJS
authors:
  - nathantarbert
tags: [cloud-oriented, programming, winglang, platforms]
hide_table_of_contents: true
image: ../img/qa-bot-cover-art.png
---



## TL;DR

In this tutorial, we will build an AI-powered Q&A bot for your website documentation. 

- 🌐 Create a user-friendly Next.js app to accept questions and URLs

- 🔧 Set up a Wing backend to handle all the requests

- 💡 Incorporate Langchain for AI-driven answers by scraping and analyzing documentation using RAG

- 🔄 Complete the connection between the frontend input and AI-processed responses.

<div style={{ textAlign: "center" }}>
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ykw5f2sos4fdhj8akowt.gif"/>
</div>


## What is Wing?

[Wing](https://wing.cloud/redirect?utm_source=qa-bot-reddit&redirect=https%3A%2F%2Fwww.winglang.io%2Fblog%2F2024%2F05%2F29%2Fqa-bot-for-your-docs-with-langchain) is an open-source framework for the cloud. 

It allows you to create your application's infrastructure and code combined as a single unit and deploy them safely to your preferred cloud providers.

Wing gives you complete control over how your application's infrastructure is configured. In addition to its easy-to-learn [programming language](https://www.winglang.io/docs/language-reference), Wing also supports Typescript.

In this tutorial, we'll use TypeScript. So, don't worry—your JavaScript and React knowledge is more than enough to understand this tutorial.


![Wing Landing Page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u366v255drbwqmcoagrz.png)


---

## Building the frontend with Next.js

Here, you’ll create a simple form that accepts the documentation URL and the user’s question and then returns a response based on the data available on the website.

First, create a folder containing two sub-folders - `frontend` and `backend`. The `frontend` folder contains the Next.js app, and the `backend` folder is for Wing.

```bash
mkdir qa-bot && cd qa-bot
mkdir frontend backend
```

Within the **`frontend`** folder, create a Next.js project by running the following code snippet:

```bash
cd frontend
npx create-next-app ./
```


![Next App](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pyq8dnmmmplvzl7g41ir.png)



Copy the code snippet below into the `app/page.tsx` file to create the form that accepts the user’s question and the documentation URL:

```tsx
"use client";
import { useState } from "react";

export default function Home() {
	const [documentationURL, setDocumentationURL] = useState<string>("");
	const [question, setQuestion] = useState<string>("");
	const [disable, setDisable] = useState<boolean>(false);
	const [response, setResponse] = useState<string | null>(null);

	const handleUserQuery = async (e: React.FormEvent) => {
		e.preventDefault();
		setDisable(true);
		console.log({ question, documentationURL });
	};

	return (
		<main className='w-full md:px-8 px-3 py-8'>
			<h2 className='font-bold text-2xl mb-8 text-center text-blue-600'>
				Documentation Bot with Wing & LangChain
			</h2>

			<form onSubmit={handleUserQuery} className='mb-8'>
				<label className='block mb-2 text-sm text-gray-500'>Webpage URL</label>
				<input
					type='url'
					className='w-full mb-4 p-4 rounded-md border text-sm border-gray-300'
					placeholder='https://www.winglang.io/docs/concepts/why-wing'
					required
					value={documentationURL}
					onChange={(e) => setDocumentationURL(e.target.value)}
				/>

				<label className='block mb-2 text-sm text-gray-500'>
					Ask any questions related to the page URL above
				</label>
				<textarea
					rows={5}
					className='w-full mb-4 p-4 text-sm rounded-md border border-gray-300'
					placeholder='What is Winglang? OR Why should I use Winglang? OR How does Winglang work?'
					required
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
				/>

				<button
					type='submit'
					disabled={disable}
					className='bg-blue-500 text-white px-8 py-3 rounded'
				>
					{disable ? "Loading..." : "Ask Question"}
				</button>
			</form>

			{response && (
				<div className='bg-gray-100 w-full p-8 rounded-sm shadow-md'>
					<p className='text-gray-600'>{response}</p>
				</div>
			)}
		</main>
	);
}
```

The code snippet above displays a form that accepts the user’s question and the documentation URL, and logs them to the console for now.




![QA bot form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7b4w3tq0srua93gnk73n.png)


Perfect! 🎉You’ve completed the application's user interface. Next, let’s set up the Wing backend.

___

## How to set up Wing on your computer

Wing provides a CLI that enables you to perform various actions within your projects. 

It also provides [VSCode](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) and [IntelliJ](https://plugins.jetbrains.com/plugin/22353-wing) extensions that enhance the developer experience with features like syntax highlighting, compiler diagnostics, code completion and snippets, and many others.

Before we proceed, stop your Next.js development server for now and install the Winglang CLI by running the code snippet below in your terminal.

```bash
npm install -g winglang@latest
```

Run the following code snippet to ensure that the Winglang CLI is installed and working as expected:

```bash
wing -V
```

Next, navigate to the `backend` folder and create an empty Wing Typescript project. Ensure you select the `empty` template and Typescript as the language.


```bash
wing new

```

![Wing New](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ezy04zqvz9lura0d25dj.png)

Copy the code snippet below into the `backend/main.ts` file.


```tsx
import { cloud, inflight, lift, main } from "@wingcloud/framework";

main((root, test) => {
	const fn = new cloud.Function(
		root,
		"Function",
		inflight(async () => {
			return "hello, world";
		})
	);
});
```

The **`main()`** function serves as the entry point to Wing. 

It creates a cloud function and executes at compile time. The **`inflight`** function, on the other hand, runs at runtime and returns a `Hello, world!` text.

Start the Wing development server by running the code snippet below. It automatically opens the Wing Console in your browser at `http://localhost:3000`.

```bash
wing it
```




![Wing TS minimul console](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z1ejobkm0dq5akhut732.png)


You've successfully installed Wing on your computer.

---

## How to connect Wing to a Next.js app

From the previous sections, you've created the Next.js frontend app within the `frontend` folder and the Wing backend within the `backend` folder.

In this section, you'll learn how to communicate and send data back and forth between the Next.js app and the Winglang backend.

First, install the [Winglang React](https://github.com/winglang/winglibs/tree/main/react) library within the backend folder by running the code below:

```bash
npm install @winglibs/react
```

Next, update the `main.ts` file as shown below:

```tsx
import { main, cloud, inflight, lift } from "@wingcloud/framework";
import React from "@winglibs/react";

main((root, test) => {
	const api = new cloud.Api(root, "api", { cors: true })
	;

	//👇🏻 create an API route
	api.get(
		"/test",
		inflight(async () => {
			return {
				status: 200,
				body: "Hello world",
			};
		})
	);
	
	//👉🏻 placeholder for the POST request endpoint

	//👇🏻 connects to the Next.js project
	const react = new React.App(root, "react", { projectPath: "../frontend" });
	//👇🏻 an environment variable
	react.addEnvironment("api_url", api.url);
});
```

The code snippet above creates an API endpoint (`/test`) that accepts GET requests and returns a `Hello world` text. The `main` function also connects to the Next.js project and adds the `api_url` as an environment variable.

The API URL contained in the environment variable enables us to send requests to the Wing API route. Now, how do we retrieve the API URL within the Next.js app and make these requests?

Update the `RootLayout` component within the Next.js `app/layout.tsx` file as done below:

```tsx
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				{/** ---👇🏻  Adds this script tag 👇🏻 ---*/}
				<script src='./wing.js' defer />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
```

Re-build the Next.js project by running `npm run build`.

Finally, start the Wing development server. It automatically starts the Next.js server, which can be accessed at **`http://localhost:3001`** in your browser.


![Console-to-URL](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t7rkxw9bds97a0qzg5vh.gif)



You've successfully connected the Next.js to Wing. You can also access data within the environment variables using `window.wingEnv.<attribute_name>`.

![window.wingEnv](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0up5430jmxufmyeb9e4h.gif)


## Processing user's requests with LangChain and Wing

In this section, you'll learn how to send requests to Wing, process these requests with [LangChain and OpenA](https://js.langchain.com/docs/get_started/quickstart#llm-chain)I, and display the results on the Next.js frontend.

First, let's update the Next.js **`app/page.tsx`** file to retrieve the API URL and send user's data to a Wing API endpoint.

To do this, extend the JavaScript **`window`** object by adding the following code snippet at the top of the **`page.tsx`** file.

```tsx
"use client";
import { useState } from "react";
interface WingEnv {
	api_url: string;
}
declare global {
	interface Window {
		wingEnv: WingEnv;
	}
}
```

Next, update the `handleUserQuery` function to send a POST request containing the user's question and website's URL to a Wing API endpoint.

```tsx
//👇🏻 sends data to the api url
const [response, setResponse] = useState<string | null>(null);

	const handleUserQuery = async (e: React.FormEvent) => {
		e.preventDefault();
		setDisable(true);
		try {
			const request = await fetch(`${window.wingEnv.api_url}/api`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question, pageURL: documentationURL }),
			});
			const response = await request.text();
			setResponse(response);
			setDisable(false);
		} catch (err) {
			console.error(err);
			setDisable(false);
		}
	};
```

Before you create the Wing endpoint that accepts the POST request, install the following packages within the `backend` folder:

```tsx
npm install @langchain/community @langchain/openai langchain cheerio
```

[Cheerio](https://js.langchain.com/v0.2/docs/integrations/document_loaders/web_loaders/web_cheerio/) enables us to scrape the software documentation webpage, while the [LangChain packages](https://js.langchain.com/v0.1/docs/get_started/quickstart/) allow us to access its various functionalities.

The LangChain OpenAI integration package uses the OpenAI language model; therefore, you'll need a valid API key. You can get yours from the [OpenAI Developer's Platform](https://platform.openai.com/api-keys).


![Langchain](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/omg4o524oklrssso5rqc.png)

Next, let’s create the `/api` endpoint that handle incoming requests.

The endpoint will:

- accept the questions and documentation URLs from the Next.js application,
- load the documentation page using [LangChain document loaders](https://js.langchain.com/v0.1/docs/modules/data_connection/document_loaders/),
- split the retrieved documents into chunks,
- transform the chunked documents and save them within a [LangChain vector store](https://js.langchain.com/v0.1/docs/modules/data_connection/vectorstores/),
- and create a [retriever function](https://js.langchain.com/v0.1/docs/modules/data_connection/) that retrieves the documents from the vector store.

First, import the following into the `main.ts` file:

```tsx
import { main, cloud, inflight, lift } from "@wingcloud/framework";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import React from "@winglibs/react";
```

Add the code snippet below within the `main()` function to create the `/api` endpoint:

```tsx
	api.post(
		"/api",
		inflight(async (ctx, request) => {
			//👇🏻 accept user inputs from Next.js
			const { question, pageURL } = JSON.parse(request.body!);

			//👇🏻 initialize OpenAI Chat for LLM interactions
			const chatModel = new ChatOpenAI({
				apiKey: "<YOUR_OPENAI_API_KEY>",
				model: "gpt-3.5-turbo-1106",
			});
			//👇🏻 initialize OpenAI Embeddings for Vector Store data transformation
			const embeddings = new OpenAIEmbeddings({
				apiKey: "<YOUR_OPENAI_API_KEY>",
			});

			//👇🏻 creates a text splitter function that splits the OpenAI result chunk size
			const splitter = new RecursiveCharacterTextSplitter({
				chunkSize: 200, //👉🏻 characters per chunk
				chunkOverlap: 20,
			});

			//👇🏻 creates a document loader, loads, and scraps the page
			const loader = new CheerioWebBaseLoader(pageURL);
			const docs = await loader.load();

			//👇🏻 splits the document into chunks 
			const splitDocs = await splitter.splitDocuments(docs);

			//👇🏻 creates a Vector store containing the split documents
			const vectorStore = await MemoryVectorStore.fromDocuments(
				splitDocs,
				embeddings //👉🏻 transforms the data to the Vector Store format
			);

			//👇🏻 creates a document retriever that retrieves results that answers the user's questions
			const retriever = vectorStore.asRetriever({
				k: 1, //👉🏻  number of documents to retrieve (default is 2)
			});

			//👇🏻 creates a prompt template for the request
			const prompt = ChatPromptTemplate.fromTemplate(`
				Answer this question.
				Context: {context}
				Question: {input}
				`);
			
			//👇🏻 creates a chain containing the OpenAI chatModel and prompt
			const chain = await createStuffDocumentsChain({
				llm: chatModel,
				prompt: prompt,
			});

			//👇🏻 creates a retrieval chain that combines the documents and the retriever function
			const retrievalChain = await createRetrievalChain({
				combineDocsChain: chain,
				retriever,
			});

			//👇🏻 invokes the retrieval Chain and returns the user's answer
			const response = await retrievalChain.invoke({
				input: `${question}`,
			});

			if (response) {
				return {
					status: 200,
					body: response.answer,
				};
			}

			return undefined;
		})
	);
```

The API endpoint accepts the user’s question and the page URL from the Next.js application, initialises [`ChatOpenAI`](https://js.langchain.com/v0.2/docs/integrations/chat/openai/) and [`OpenAIEmbeddings`](https://js.langchain.com/v0.2/docs/integrations/text_embedding/openai/), loads the documentation page, and retrieves the answers to the user’s query in the form of documents. 

Then, splits the documents into chunks, saves the chunks in the `MemoryVectorStore`, and enables us to fetch answers to the question using [LangChain retrievers](https://js.langchain.com/v0.1/docs/modules/data_connection/).

From the code snippet above, the OpenAI API key is entered directly into the code; this could lead to security breaches, making the API key accessible to attackers. To prevent this data leak, Winglang allows you to save private keys and credentials in variables called `secrets`.

When you create a secret, Wing saves this data in a `.env` file, ensuring it is secured and accessible.

Update the `main()` function to fetch the OpenAI API key from the Wing Secret.

```tsx
main((root, test) => {
	const api = new cloud.Api(root, "api", { cors: true });
	//👇🏻 creates the secret variable
	const secret = new cloud.Secret(root, "OpenAPISecret", {
		name: "open-ai-key",
	});

	api.post(
		"/api",
		lift({ secret })
			.grant({ secret: ["value"] })
			.inflight(async (ctx, request) => {
				const apiKey = await ctx.secret.value();

				const chatModel = new ChatOpenAI({
					apiKey,
					model: "gpt-3.5-turbo-1106",
				});
				
				const embeddings = new OpenAIEmbeddings({
					apiKey,
				});
				
				//👉🏻 other code snippets & configurations
	);

	const react = new React.App(root, "react", { projectPath: "../frontend" });
	react.addEnvironment("api_url", api.url);
});
```

- From the code snippet above,
    - The `secret` variable declares a name for the secret (OpenAI API key).
    - The [`lift().grant()`](https://www.winglang.io/docs/typescript/inflights#permissions) grants the API endpoint access to the secret value stored in the Wing Secret.
    - The [`inflight()`](https://www.winglang.io/docs/typescript/inflights) function accepts the context and request object as parameters, makes a request to LangChain, and returns the result.
    - Then, you can access the `apiKey` using the `ctx.secret.value()` function.

Finally, save the OpenAI API key as a secret by running this command in your terminal.





![Wing Secrets](https://www.winglang.io/assets/images/qa-bot-wing-secrets-883db5e81515894ae280d77b7f72bb25.gif)

Great, now our secrets are stored and we can interact with our application. Let's take a look at it in action!

Here is a brief demo:




![QA bot demo 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ropklqge2xzpibl29vye.gif)


------

Let's dig a little bit deeper into the Winglang docs to see what data our AI bot can extract.


![QA bot demo 2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hnmf6n6mszc6go0uiw1v.gif)




---

## Wrapping It Up

So far, we have gone over the following:

- What is Wing?
- How to use Wing and query data using Langchain,
- How to connect Wing to a Next.js application,
- How to send data between a Next.js frontend and a Wing backend.

>[Wing](https://github.com/winglang/wing) aims to bring back your creative flow and close the gap between imagination and creation. Another great advantage of Wing is that it is open-source. Therefore, if you are looking forward to building distributed systems that leverage cloud services or contribute to the future of cloud development, [Wing](https://github.com/winglang/wing) is your best choice.

Feel free to contribute to the [GitHub repository,](https://github.com/winglang/wing) and [share your thoughts](https://t.winglang.io/discord) with the team and the large community of developrs.

The source code for this tutorial is available [here](https://github.com/NathanTarbert/wing-langchain-nextjs).

Thank you for reading! 🎉
