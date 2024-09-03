---
title: Vite
id: vite
sidebar_label: Vite
description:  A Wing library to deploy [Vite applications](https://vitejs.dev/) to the cloud.
keywords: [winglib, Wing library]
---
# vite

`@winglibs/vite` allows using a [Vite](https://vitejs.dev/) project with Wing.

## Prerequisites

- [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/vite
```

## Usage

```js
bring cloud;
bring vite;

let api = new cloud.Api();

let website = new vite.Vite(
  // The path to the website root.
  root: "../website",

  // Environment variables passed to the Vite project.
  // They'll available through the global `wing` object.
  publicEnv: {
    API_URL: api.url,
  },
);

// Get the URL of the website.
let url = website.url;
```

## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/vite.Vite">Vite</a>
  - <a href="#@winglibs/vite.Vite_tf_aws">Vite_tf_aws</a>
  - <a href="#@winglibs/vite.Vite_sim">Vite_sim</a>
- **Structs**
  - <a href="#@winglibs/vite.ViteProps">ViteProps</a>

<h3 id="@winglibs/vite.Vite">Vite (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ViteProps): Vite
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/vite.Vite_tf_aws">Vite_tf_aws (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ViteProps): Vite_tf_aws
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/vite.Vite_sim">Vite_sim (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: ViteProps): Vite_sim
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/vite.ViteProps">ViteProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>generateTypeDefinitions</code> | <code>bool?</code> | *No description* |
| <code>openBrowser</code> | <code>bool?</code> | *No description* |
| <code>publicEnv</code> | <code>Map<str>?</code> | *No description* |
| <code>publicEnvName</code> | <code>str?</code> | *No description* |
| <code>root</code> | <code>str</code> | *No description* |
| <code>typeDefinitionsFilename</code> | <code>str?</code> | *No description* |


