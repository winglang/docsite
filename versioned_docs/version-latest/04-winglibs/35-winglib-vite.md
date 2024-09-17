---
title: Vite
id: vite
sidebar_label: Vite (winglib)
description:  A Wing library to deploy [Vite applications](https://vitejs.dev/) to the cloud.
keywords: [winglib, Wing library]
---
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
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/vite.Vite">Vite</a>
  - <a href="#@winglibs/vite.Vite_tf_aws">Vite_tf_aws</a>
  - <a href="#@winglibs/vite.Vite_sim">Vite_sim</a>
- **Structs**
  - <a href="#@winglibs/vite.ViteProps">ViteProps</a>

### Vite (preflight class) <a class="wing-docs-anchor" id="@winglibs/vite.Vite"></a>

*No description*

#### Constructor

```
new(props: ViteProps): Vite
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

#### Methods

*No methods*

### Vite_tf_aws (preflight class) <a class="wing-docs-anchor" id="@winglibs/vite.Vite_tf_aws"></a>

*No description*

#### Constructor

```
new(props: ViteProps): Vite_tf_aws
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

#### Methods

*No methods*

### Vite_sim (preflight class) <a class="wing-docs-anchor" id="@winglibs/vite.Vite_sim"></a>

*No description*

#### Constructor

```
new(props: ViteProps): Vite_sim
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>url</code> | <code>str</code> | *No description* |

#### Methods

*No methods*

### ViteProps (struct) <a class="wing-docs-anchor" id="@winglibs/vite.ViteProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>generateTypeDefinitions</code> | <code>bool?</code> | *No description* |
| <code>openBrowser</code> | <code>bool?</code> | *No description* |
| <code>publicEnv</code> | <code>Map<str>?</code> | *No description* |
| <code>publicEnvName</code> | <code>str?</code> | *No description* |
| <code>root</code> | <code>str</code> | *No description* |
| <code>typeDefinitionsFilename</code> | <code>str?</code> | *No description* |


