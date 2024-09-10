---
title: Directories
id: directories
slug: /directories
sidebar_label: 31. Directories
description: Directories
keywords: [Wing language, Directories]
---

Use the `fs` ("filesystem") module to make, read, check, remove directories.

```js playground example title="main.w"
bring fs;

// Make directory
fs.mkdir("subdir");

// Check if path is directory
fs.isDir("subdir");

// Set permissions on directory
fs.setPermissions("subdir", "0755");

// Try and parse
if let dirTryFrom = fs.tryReaddir("random-folder") {
  log("Directory is there");
} else {
  log("No directory found");
}

// Remove a directory
fs.remove("subdir");
```

```bash title="Wing console output"
# Run locally with wing console
No directory found
```



