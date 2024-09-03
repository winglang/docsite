---
title: GitHub
id: github
sidebar_label: GitHub
description:  A wing library to work with GitHub Probot
keywords: [winglib, Wing library]
---
# github

A Wing library for working with [GitHub Probot](https://github.com/probot/probot)


## Prerequisites

* [winglang](https://winglang.io).
* [Install ngrok](https://ngrok.com/docs/getting-started/)


## Installation

`sh
npm i @winglibs/github
`

## Usage

This following application is a simple GitHub application that listens to created and reopened 
pull requests, look for any `*.md` files that where changed and replace their content with their 
uppercase version. 

* It requires a GitHub application
* Configured secrets 

In order to start you need to create a GitHub application:

### Create a GitHub App

1. Goto https://github.com/settings/apps
2. Click "New GitHub App" and complete form
3. GitHub App Name
4. Homepage URL: e.g. https://winglang.io
5. Webhook:
   1. Active: ✅
   2. URL: http://this-will-change-automatically.com
   3. Webhook secret: "this-is-a-bad-secret"
6. Permissions -> Repository permissions:
   1. Contents: Read and write 
   2. Pull requests: Read and write
7. Subscribe to events
   1. Pull request
   2. Push
8. Save
9. Notice the app id and save it 
10. Generate & download a private key for the app 

### `main.w`

When running on the simulator, the Webhook URL will automatically update on every simulator run.

```js
bring util;
bring cloud;
bring github;
bring fs;

let uppercaseAllMarkdownFiles = inflight (ctx) => {
  let repo = ctx.payload.repository;

  // find all changed mdfiles by comparing the commits of the PR
  let compare = ctx.octokit.repos.compareCommits(
    owner: repo.owner.login,
    repo: repo.name,
    base: ctx.payload.pull_request.base.sha,
    head: ctx.payload.pull_request.head.sha,
  );

  let mdFiles = MutMap<str>{};
  for commit in compare.data.commits {
    let commitContent = ctx.octokit.repos.getCommit(
      owner: repo.owner.login,
      repo: repo.name,
      ref: ctx.payload.pull_request.head.ref,
    );
    if let files = commitContent.data.files {
      for file in files {
        if file.filename.endsWith(".md") &&
         (file.status == "modified" || file.status == "added" || file.status == "changed") {
          mdFiles.set(file.filename, file.sha);
        }
      }
    }
  }

  // list over mdfiles and update them
  for filename in mdFiles.keys() {
    let contents = ctx.octokit.repos.getContent(
      owner: repo.owner.login,
      repo: repo.name,
      path: filename,
      ref: ctx.payload.pull_request.head.sha
    );
    
    let fileContents = util.base64Decode("{contents.data.content}");
      
    ctx.octokit.repos.createOrUpdateFileContents(
      owner: repo.owner.login,
      repo: repo.name,
      branch: ctx.payload.pull_request.head.ref,
      sha: contents.data.sha,
      path: filename,
      message: "uppercase {filename}",
      content: util.base64Encode(fileContents.uppercase())
    );    
  }
};

class SimpleCredentialsSupplier impl github.IProbotAppCredentialsSupplier {
   
   pub inflight getId(): str {
    return "app id";
   }

   pub inflight getWebhookSecret(): str {
    return "this-is-a-bad-secret";
   }

   pub inflight getPrivateKey(): str {
    return fs.readFile("/path/to/private-key.pem");
   }
}

let credentialsSupplier = new SimpleCredentialsSupplier();
let markdown = new github.ProbotApp(
  credentialsSupplier: credentialsSupplier,
  onPullRequestOpened: handler,
  onPullRequestReopened: handler
);
```

## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/github.ProbotApp">ProbotApp</a>
  - <a href="#@winglibs/github.utils.LowkeysMap">utils.LowkeysMap</a>
  - <a href="#@winglibs/github.simutils.Port">simutils.Port</a>
  - <a href="#@winglibs/github.simutils.Service">simutils.Service</a>
  - <a href="#@winglibs/github.probot.ProbotAdapter">probot.ProbotAdapter</a>
  - <a href="#@winglibs/github.ngrok.Ngrok">ngrok.Ngrok</a>
- **Interfaces**
  - <a href="#@winglibs/github.IProbotAppCredentialsSupplier">IProbotAppCredentialsSupplier</a>
  - <a href="#@winglibs/github.simutils.Process">simutils.Process</a>
  - <a href="#@winglibs/github.probot.IProbotAuth">probot.IProbotAuth</a>
  - <a href="#@winglibs/github.probot.IProbotWebhooks">probot.IProbotWebhooks</a>
  - <a href="#@winglibs/github.probot.IProbotAppCredentialsSupplier">probot.IProbotAppCredentialsSupplier</a>
- **Structs**
  - <a href="#@winglibs/github.ProbotAppProps">ProbotAppProps</a>
  - <a href="#@winglibs/github.simutils.ServiceProps">simutils.ServiceProps</a>
  - <a href="#@winglibs/github.probot.Context">probot.Context</a>
  - <a href="#@winglibs/github.probot.ProbotInstance">probot.ProbotInstance</a>
  - <a href="#@winglibs/github.probot.PullRequestClosedContext">probot.PullRequestClosedContext</a>
  - <a href="#@winglibs/github.probot.PullRequestContext">probot.PullRequestContext</a>
  - <a href="#@winglibs/github.probot.PullRequestOpenedContext">probot.PullRequestOpenedContext</a>
  - <a href="#@winglibs/github.probot.PullRequestSyncContext">probot.PullRequestSyncContext</a>
  - <a href="#@winglibs/github.probot.PushContext">probot.PushContext</a>
  - <a href="#@winglibs/github.probot.VerifyAndReceieveProps">probot.VerifyAndReceieveProps</a>
  - <a href="#@winglibs/github.probot.CreateAdapterOptions">probot.CreateAdapterOptions</a>
  - <a href="#@winglibs/github.probot.ProbotAdapterProps">probot.ProbotAdapterProps</a>
  - <a href="#@winglibs/github.octokit.CompareCommitsProps">octokit.CompareCommitsProps</a>
  - <a href="#@winglibs/github.octokit.CompareCommitsResponse">octokit.CompareCommitsResponse</a>
  - <a href="#@winglibs/github.octokit.CompareCommitsResponseCommit">octokit.CompareCommitsResponseCommit</a>
  - <a href="#@winglibs/github.octokit.CompareCommitsResponseData">octokit.CompareCommitsResponseData</a>
  - <a href="#@winglibs/github.octokit.CompareCommitsResponseFile">octokit.CompareCommitsResponseFile</a>
  - <a href="#@winglibs/github.octokit.GetCommitProps">octokit.GetCommitProps</a>
  - <a href="#@winglibs/github.octokit.GetCommitResponse">octokit.GetCommitResponse</a>
  - <a href="#@winglibs/github.octokit.GetCommitResponseData">octokit.GetCommitResponseData</a>
  - <a href="#@winglibs/github.octokit.GetCommitResponseFile">octokit.GetCommitResponseFile</a>
  - <a href="#@winglibs/github.octokit.GetContentProps">octokit.GetContentProps</a>
  - <a href="#@winglibs/github.octokit.GetContentResponse">octokit.GetContentResponse</a>
  - <a href="#@winglibs/github.octokit.GetContentResponseData">octokit.GetContentResponseData</a>
  - <a href="#@winglibs/github.octokit.ListReposResponse">octokit.ListReposResponse</a>
  - <a href="#@winglibs/github.octokit.OctoKit">octokit.OctoKit</a>
  - <a href="#@winglibs/github.ngrok.NgrokProps">ngrok.NgrokProps</a>

<h3 id="@winglibs/github.ProbotApp">ProbotApp (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ProbotAppProps): ProbotApp
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight createGithubAppJwt(appId: str, privateKey: str): str</code> | *No description* |
| <code>onPullRequestOpened(handler: inflight (PullRequestOpenedContext): void): void</code> | *No description* |
| <code>onPullRequestReopened(handler: inflight (PullRequestOpenedContext): void): void</code> | *No description* |
| <code>inflight updateWebhookUrl(url: str): void</code> | *No description* |

<h3 id="@winglibs/github.utils.LowkeysMap">utils.LowkeysMap (inflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): LowkeysMap
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight fromMap(map: Map<str>): Map<str></code> | *No description* |

<h3 id="@winglibs/github.simutils.Port">simutils.Port (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): Port
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>port</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/github.simutils.Service">simutils.Service (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(command: str, args: Array<str>, props: ServiceProps): Service
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/github.probot.ProbotAdapter">probot.ProbotAdapter (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ProbotAdapterProps): ProbotAdapter
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight auth(installationId: num): OctoKit</code> | *No description* |
| <code>static inflight createProbotAdapter(options: CreateAdapterOptions): ProbotInstance</code> | *No description* |
| <code>inflight handlePullRequstClosed(handler: inflight (PullRequestClosedContext): void): void</code> | *No description* |
| <code>inflight handlePullRequstOpened(handler: inflight (PullRequestOpenedContext): void): void</code> | *No description* |
| <code>inflight handlePullRequstReopened(handler: inflight (PullRequestOpenedContext): void): void</code> | *No description* |
| <code>inflight handlePullRequstSync(handler: inflight (PullRequestSyncContext): void): void</code> | *No description* |
| <code>inflight handlePush(handler: inflight (PushContext): void): void</code> | *No description* |
| <code>inflight verifyAndReceive(props: VerifyAndReceieveProps): void</code> | *No description* |

<h3 id="@winglibs/github.ngrok.Ngrok">ngrok.Ngrok (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: NgrokProps): Ngrok
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/github.IProbotAppCredentialsSupplier">IProbotAppCredentialsSupplier (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight getId(): str</code> | *No description* |
| <code>inflight getPrivateKey(): str</code> | *No description* |
| <code>inflight getWebhookSecret(): str</code> | *No description* |

<h3 id="@winglibs/github.simutils.Process">simutils.Process (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight kill(): void</code> | *No description* |

<h3 id="@winglibs/github.probot.IProbotAuth">probot.IProbotAuth (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight call(instance: ProbotInstance, installationId: num): OctoKit</code> | *No description* |

<h3 id="@winglibs/github.probot.IProbotWebhooks">probot.IProbotWebhooks (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight on(name: str, handler: inflight (): void): void</code> | *No description* |
| <code>inflight verifyAndReceive(props: VerifyAndReceieveProps): void</code> | *No description* |

<h3 id="@winglibs/github.probot.IProbotAppCredentialsSupplier">probot.IProbotAppCredentialsSupplier (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight getId(): str</code> | *No description* |
| <code>inflight getPrivateKey(): str</code> | *No description* |
| <code>inflight getWebhookSecret(): str</code> | *No description* |

<h3 id="@winglibs/github.ProbotAppProps">ProbotAppProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>credentialsSupplier</code> | <code>IProbotAppCredentialsSupplier</code> | *No description* |

<h3 id="@winglibs/github.simutils.ServiceProps">simutils.ServiceProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>cwd</code> | <code>str?</code> | *No description* |
| <code>env</code> | <code>Map<str>?</code> | *No description* |

<h3 id="@winglibs/github.probot.Context">probot.Context (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>octokit</code> | <code>OctoKit</code> | *No description* |

<h3 id="@winglibs/github.probot.ProbotInstance">probot.ProbotInstance (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>auth</code> | <code>IProbotAuth</code> | *No description* |
| <code>webhooks</code> | <code>IProbotWebhooks</code> | *No description* |

<h3 id="@winglibs/github.probot.PullRequestClosedContext">probot.PullRequestClosedContext (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>octokit</code> | <code>OctoKit</code> | *No description* |
| <code>payload</code> | <code>PullRequestPayload</code> | *No description* |

<h3 id="@winglibs/github.probot.PullRequestContext">probot.PullRequestContext (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>octokit</code> | <code>OctoKit</code> | *No description* |
| <code>payload</code> | <code>PullRequestPayload</code> | *No description* |

<h3 id="@winglibs/github.probot.PullRequestOpenedContext">probot.PullRequestOpenedContext (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>octokit</code> | <code>OctoKit</code> | *No description* |
| <code>payload</code> | <code>PullRequestPayload</code> | *No description* |

<h3 id="@winglibs/github.probot.PullRequestSyncContext">probot.PullRequestSyncContext (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>octokit</code> | <code>OctoKit</code> | *No description* |
| <code>payload</code> | <code>PullRequestPayload</code> | *No description* |

<h3 id="@winglibs/github.probot.PushContext">probot.PushContext (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>octokit</code> | <code>OctoKit</code> | *No description* |
| <code>payload</code> | <code>PushPayload</code> | *No description* |

<h3 id="@winglibs/github.probot.VerifyAndReceieveProps">probot.VerifyAndReceieveProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | *No description* |
| <code>name</code> | <code>str</code> | *No description* |
| <code>payload</code> | <code>str</code> | *No description* |
| <code>signature</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.probot.CreateAdapterOptions">probot.CreateAdapterOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>appId</code> | <code>str</code> | *No description* |
| <code>privateKey</code> | <code>str</code> | *No description* |
| <code>webhookSecret</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.probot.ProbotAdapterProps">probot.ProbotAdapterProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>credentialsSupplier</code> | <code>IProbotAppCredentialsSupplier</code> | *No description* |

<h3 id="@winglibs/github.octokit.CompareCommitsProps">octokit.CompareCommitsProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>base</code> | <code>str</code> | *No description* |
| <code>head</code> | <code>str</code> | *No description* |
| <code>owner</code> | <code>str</code> | *No description* |
| <code>repo</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.octokit.CompareCommitsResponse">octokit.CompareCommitsResponse (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>data</code> | <code>CompareCommitsResponseData</code> | *No description* |

<h3 id="@winglibs/github.octokit.CompareCommitsResponseCommit">octokit.CompareCommitsResponseCommit (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>sha</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.octokit.CompareCommitsResponseData">octokit.CompareCommitsResponseData (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>commits</code> | <code>Array<CompareCommitsResponseCommit></code> | *No description* |

<h3 id="@winglibs/github.octokit.CompareCommitsResponseFile">octokit.CompareCommitsResponseFile (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>filaname</code> | <code>str</code> | *No description* |
| <code>sha</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.octokit.GetCommitProps">octokit.GetCommitProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>owner</code> | <code>str</code> | *No description* |
| <code>ref</code> | <code>str</code> | *No description* |
| <code>repo</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.octokit.GetCommitResponse">octokit.GetCommitResponse (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>data</code> | <code>GetCommitResponseData</code> | *No description* |

<h3 id="@winglibs/github.octokit.GetCommitResponseData">octokit.GetCommitResponseData (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>files</code> | <code>Array<GetCommitResponseFile>?</code> | *No description* |

<h3 id="@winglibs/github.octokit.GetCommitResponseFile">octokit.GetCommitResponseFile (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>filename</code> | <code>str</code> | *No description* |
| <code>sha</code> | <code>str</code> | *No description* |
| <code>status</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.octokit.GetContentProps">octokit.GetContentProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>owner</code> | <code>str</code> | *No description* |
| <code>path</code> | <code>str</code> | *No description* |
| <code>ref</code> | <code>str?</code> | *No description* |
| <code>repo</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.octokit.GetContentResponse">octokit.GetContentResponse (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>data</code> | <code>GetContentResponseData</code> | *No description* |
| <code>status</code> | <code>num</code> | *No description* |

<h3 id="@winglibs/github.octokit.GetContentResponseData">octokit.GetContentResponseData (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>content</code> | <code>str?</code> | *No description* |
| <code>name</code> | <code>str</code> | *No description* |
| <code>path</code> | <code>str</code> | *No description* |
| <code>sha</code> | <code>str</code> | *No description* |
| <code>size</code> | <code>num</code> | *No description* |
| <code>type</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/github.octokit.ListReposResponse">octokit.ListReposResponse (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>data</code> | <code>Array<ListReposResponseData></code> | *No description* |
| <code>status</code> | <code>num</code> | *No description* |

<h3 id="@winglibs/github.octokit.OctoKit">octokit.OctoKit (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>apps</code> | <code>OctoKitApps</code> | *No description* |
| <code>git</code> | <code>OctoKitGit</code> | *No description* |
| <code>issues</code> | <code>OctoKitIssues</code> | *No description* |
| <code>pulls</code> | <code>OctoKitPulls</code> | *No description* |
| <code>repos</code> | <code>OctoKitRepos</code> | *No description* |

<h3 id="@winglibs/github.ngrok.NgrokProps">ngrok.NgrokProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>domain</code> | <code>str?</code> | *No description* |
| <code>url</code> | <code>str</code> | *No description* |


