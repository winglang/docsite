---
title: AWS Budget
id: budget
sidebar_label: AWS Budget
description:  A Wing library for working with [AWS Budgets]
keywords: [winglib, Wing library]
---
# budget

A Wing library for working with [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/budget
```

## Usage

**⚠️ The budget refers to the entire account and not just for the current project!**

Add your budget alert to the code:

```js
bring budget;

new budget.Alert(
  name: "Test",
  amount: 10,
  emailAddresses: ["your@email.com"],
);
```

*Note: ​The budget amount is in USD.*

You get an alert when your monthly payment goes over your budget.

## TODO

- [ ] Set a budget alert only for resources with certain tags.
- [ ] Allow to perform automatic actions when the budget runs out.

## License

This library is licensed under the [MIT License](./LICENSE).

---
<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/budget.Alert">Alert</a>
  - <a href="#@winglibs/budget.AlertTfAws">AlertTfAws</a>
  - <a href="#@winglibs/budget.AlertSim">AlertSim</a>
  - <a href="#@winglibs/budget.Util">Util</a>
- **Interfaces**
  - <a href="#@winglibs/budget.IAlert">IAlert</a>
- **Structs**
  - <a href="#@winglibs/budget.AlertProps">AlertProps</a>
- **Enums**
  - <a href="#@winglibs/budget.TimeUnit">TimeUnit</a>

<h3 id="@winglibs/budget.Alert">Alert (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: AlertProps): Alert
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/budget.AlertTfAws">AlertTfAws (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: AlertProps): AlertTfAws
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/budget.AlertSim">AlertSim (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(props: AlertProps): AlertSim
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/budget.Util">Util (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): Util
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static timeUnitToStr(timeUnit: TimeUnit): str</code> | *No description* |

<h3 id="@winglibs/budget.IAlert">IAlert (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/budget.AlertProps">AlertProps (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>amount</code> | <code>num</code> | *No description* |
| <code>emailAddresses</code> | <code>Array<str></code> | *No description* |
| <code>name</code> | <code>str</code> | *No description* |
| <code>timeUnit</code> | <code>TimeUnit?</code> | *No description* |

<h3 id="@winglibs/budget.TimeUnit">TimeUnit (enum)</h3>

<h4>Values</h4>

| **Name** | **Description** |
| --- | --- |
| <code>DAILY</code> | *No description* |
| <code>MONTHLY</code> | *No description* |
| <code>ANNUALLY</code> | *No description* |


