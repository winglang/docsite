---
title: Optionality
id: optionality
slug: /optionality
sidebar_label: 8. Optionality
description: Using while statements with Wing
keywords: [Wing language, example]
---

Nullity is a primary source of bugs in software. Being able to guarantee that a value will never be null makes it easier to write safe code without constantly having to take nullity into account.

Optionality requires developers to be more intentional about working with the concept of "lack of value".

```js playground title="main.w"
let monday:str = "doctor";
let tuesday: str? = nil;

// Set next to tuesday if there is a value otherwise use monday value
let var next = tuesday ?? monday;

log("{next}");

```

```bash title="Wing console output"
# Run locally with wing console
wing it

doctor
```