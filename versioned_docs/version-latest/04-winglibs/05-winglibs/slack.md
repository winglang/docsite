---
title: Slack
id: slack
sidebar_label: Slack
description:  A Wing library for working with [Slack](https://slack.com/)
keywords: [winglib, Wing library]
---
# slack

This library allows using Slack with Wing.

## Prerequisites

* [winglang](https://winglang.io)

## Supported Features
- Events
- Direct Channel Messages

### Unsupported Features (TODO)
- Distribution Management
- Interactive Components
- Slash Commands
- Workflows
- Incoming Webhooks

## Installation

Use `npm` to install this library:

```sh
npm i @winglibs/slack
```
## Bring it

```js
bring slack;
bring cloud;

let myBotToken = new cloud.Secret(name: "mybot_token");

let slackbot = new slack.App(token: myBotToken);

/// When registering events, the inflight function will be called with the context and event
/// The `ctx` is a reference to the context of the event, and provides client methods to interact with channels, threads, etc..
/// The `event` is the raw Json event data from Slack and can be used to extract information from the event
slackbot.onEvent("app_mention", inflight (ctx, event) => {
  let message = new slack.Message();
  message.addSection({
    fields: [
      {
        type: slack.FieldType.mrkdwn,
        text: "*Wow this is markdown!!*\ncool beans!!!"
      }
    ]
  });

  ctx.channel.postMessage(message);
});
```

### Create your Slack App

1. Go to the [Slack API Dashboard](https://api.slack.com/apps) and create a new app.
2. Select **Create from Scratch**.
3. For the README example above, ensure you provide the following permissions:
  - `app_mentions:read`
  - `chat:write`
  - `chat:write.public`
  - `channels:read`
4. Navigate to **Events** and subscribe to the following events:
  - `app_mention`
5. Navigate to **OAuth & Permissions** and install the app to your workspace
6. Copy the **Bot User OAuth Token** to your clipboard
7. Navigate to **Event Subscriptions** and enable events, then subscribe to bot events:
  - `app_mention`

### Running in the Wing Simulator

First lets configure our Slack bot token as a secret in the simulator. 

```sh
wing secrets
```

When prompted, paste the Bot User OAuth Token you copied earlier.

Next when running in the Wing Simulator, you will need to expose the endpoint of the Slackbot API, this can be done through the simulator console by selecting `Open tunnel for this endpoint` 



Take this URL and navigate back to your Slack App, under the Event Subscriptions section, paste the URL into the Request URL field and append `/slack/events` to the end of the URL. 

### Running in AWS

First lets configure our Slack bot token as a secret in AWS. 

```sh
wing secrets -t tf-aws
```

When prompted, paste the Bot User OAuth Token you copied earlier.

Next, let's run the following command to deploy our app to AWS.

```sh
wing compile -t tf-aws
terraform -chdir=target/main.tfaws init
terraform -chdir=target/main.tfaws apply
```


After compiling and deploying your app using `tf-aws` you there will be an endpoint called `Slack_Request_Url` that is part of the terraform output. The URL should end with `/slack/events`. It will look something like this:

```sh
Apply complete! Resources: 11 added, 0 changed, 0 destroyed.

Outputs:

App_Api_Endpoint_Url_E233F0E8 = "https://zgl8r8wsng.execute-api.us-east-1.amazonaws.com/prod"
App_Slack_Request_Url_FF26641D = "https://zgl8r8wsng.execute-api.us-east-1.amazonaws.com/prod/slack/events"
```

Navigate back to your Slack App, under the Event Subscriptions section, paste the URL into the Request URL field and append `/slack/events` to the end of the URL.


## Post Directly to a Channel

If you want to post directly to a channel, you can do so by using the following code:

```js
let postMessage = new cloud.Function(inflight () => {
  let channel = bot.channel("NAME|ID");
  channel.post("hello world!");
});
```

### Finding a Channel ID

If you prefer to use a channel ID over a channel name, you can find the channel ID by right-clicking on the channel name and select `View channel details`. The channel ID will be at the bottom of the popup modal.

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/slack.SlackUtils">SlackUtils</a>
  - <a href="#@winglibs/slack.Message">Message</a>
  - <a href="#@winglibs/slack.App">App</a>
  - <a href="#@winglibs/slack.Channel">Channel</a>
  - <a href="#@winglibs/slack.EventContext">EventContext</a>
  - <a href="#@winglibs/slack.EventContext_Mock">EventContext_Mock</a>
  - <a href="#@winglibs/slack.MockChannel">MockChannel</a>
  - <a href="#@winglibs/slack.Thread">Thread</a>
- **Interfaces**
  - <a href="#@winglibs/slack.IThread">IThread</a>
- **Structs**
  - <a href="#@winglibs/slack.Block">Block</a>
  - <a href="#@winglibs/slack.Field">Field</a>
  - <a href="#@winglibs/slack.Section">Section</a>
  - <a href="#@winglibs/slack.AppProps">AppProps</a>
  - <a href="#@winglibs/slack.CallbackEvent">CallbackEvent</a>
  - <a href="#@winglibs/slack.MessageCallbackEvent">MessageCallbackEvent</a>
  - <a href="#@winglibs/slack.SlackEvent">SlackEvent</a>
  - <a href="#@winglibs/slack.VerificationEvent">VerificationEvent</a>
- **Enums**
  - <a href="#@winglibs/slack.BlockType">BlockType</a>
  - <a href="#@winglibs/slack.FieldType">FieldType</a>

<h3 id="@winglibs/slack.SlackUtils">SlackUtils (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): SlackUtils
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight post(body: Json, token: str): Json</code> | *No description* |

<h3 id="@winglibs/slack.Message">Message (inflight class)</h3>

Represents a Message block see: https://api.slack.com/block-kit

<h4>Constructor</h4>

<pre>
new(): Message
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>sections</code> | <code>MutArray<Section></code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight addSection(section: Section): void</code> | *No description* |
| <code>inflight toJson(): Json</code> | Returns Json representation of message |

<h3 id="@winglibs/slack.App">App (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: AppProps): App
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>api</code> | <code>Api</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight channel(id: str): Channel</code> | Retrieve a channel object from a channel Id or name |
| <code>onEvent(eventName: str, handler: inflight (EventContext, Json): Json?): void</code> | Register an event handler (for available events see: https://api.slack.com/events) |

<h3 id="@winglibs/slack.Channel">Channel (inflight class)</h3>

Represents the context of a slack channel

<h4>Constructor</h4>

<pre>
new(): Channel
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | The channel id |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight post(message: str): Json</code> | Post raw text to a channel |
| <code>inflight postMessage(message: Message): Json</code> | Post a message block to a channel |

<h3 id="@winglibs/slack.EventContext">EventContext (inflight class)</h3>

Represents the context of an event callback

<h4>Constructor</h4>

<pre>
new(): EventContext
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>channel</code> | <code>Channel</code> | *No description* |
| <code>thread</code> | <code>Thread</code> | *No description* |

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/slack.EventContext_Mock">EventContext_Mock (inflight class)</h3>

Internally used for mocking event context

<h4>Constructor</h4>

<pre>
new(): EventContext_Mock
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>channel</code> | <code>Channel</code> | *No description* |
| <code>thread</code> | <code>Thread</code> | *No description* |

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/slack.MockChannel">MockChannel (inflight class)</h3>

Only used for internal testing

<h4>Constructor</h4>

<pre>
new(): MockChannel
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>id</code> | <code>str</code> | The channel id |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight post(message: str): Json</code> | *No description* |
| <code>inflight postMessage(message: Message): Json</code> | *No description* |

<h3 id="@winglibs/slack.Thread">Thread (inflight class)</h3>

Represents the context of a slack thread

<h4>Constructor</h4>

<pre>
new(): Thread
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>channel</code> | <code>Channel</code> | The channel context |
| <code>timestamp</code> | <code>str</code> | The thread timestamp |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight post(message: str): Json</code> | Post raw text to a thread |
| <code>inflight postMessage(message: Message): Json</code> | Post a message to a thread |

<h3 id="@winglibs/slack.IThread">IThread (interface)</h3>

The bahvioral interface of a thread

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>inflight post(message: str): Json</code> | *No description* |
| <code>inflight postMessage(message: Message): Json</code> | *No description* |

<h3 id="@winglibs/slack.Block">Block (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>fields</code> | <code>Array<Field></code> | *No description* |
| <code>type</code> | <code>BlockType</code> | *No description* |

<h3 id="@winglibs/slack.Field">Field (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>text</code> | <code>str</code> | *No description* |
| <code>type</code> | <code>FieldType</code> | *No description* |

<h3 id="@winglibs/slack.Section">Section (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>fields</code> | <code>Array<Field></code> | *No description* |

<h3 id="@winglibs/slack.AppProps">AppProps (struct)</h3>

Properties for Slack bot

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>ignoreBots</code> | <code>bool?</code> | Whether events from bot users should be ignored (default: true) |
| <code>token</code> | <code>Secret</code> | The token secret to use for the app |

<h3 id="@winglibs/slack.CallbackEvent">CallbackEvent (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>app_id</code> | <code>str?</code> | *No description* |
| <code>bot_id</code> | <code>str?</code> | *No description* |
| <code>channel</code> | <code>str</code> | *No description* |
| <code>event_ts</code> | <code>str</code> | *No description* |
| <code>team</code> | <code>str?</code> | *No description* |
| <code>ts</code> | <code>str</code> | *No description* |
| <code>type</code> | <code>str</code> | *No description* |
| <code>user</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/slack.MessageCallbackEvent">MessageCallbackEvent (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>app_id</code> | <code>str?</code> | *No description* |
| <code>bot_id</code> | <code>str?</code> | *No description* |
| <code>channel</code> | <code>str</code> | *No description* |
| <code>event_ts</code> | <code>str</code> | *No description* |
| <code>team</code> | <code>str?</code> | *No description* |
| <code>text</code> | <code>str</code> | *No description* |
| <code>ts</code> | <code>str</code> | *No description* |
| <code>type</code> | <code>str</code> | *No description* |
| <code>user</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/slack.SlackEvent">SlackEvent (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>type</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/slack.VerificationEvent">VerificationEvent (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>challenge</code> | <code>str</code> | *No description* |
| <code>token</code> | <code>str</code> | *No description* |
| <code>type</code> | <code>str</code> | *No description* |

<h3 id="@winglibs/slack.BlockType">BlockType (enum)</h3>

<h4>Values</h4>

| **Name** | **Description** |
| --- | --- |
| <code>section</code> | *No description* |

<h3 id="@winglibs/slack.FieldType">FieldType (enum)</h3>

<h4>Values</h4>

| **Name** | **Description** |
| --- | --- |
| <code>plain_text</code> | *No description* |
| <code>mrkdwn</code> | *No description* |


