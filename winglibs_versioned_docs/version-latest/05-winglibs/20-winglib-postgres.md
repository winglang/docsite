---
title: Postgres
id: postgres
sidebar_label: Postgres
description:  Wing library for [Postgres](https://www.postgresql.org/)
keywords: [winglib, Wing library]
---
This library allows using postgres with Wing.

## Prerequisites

* [winglang](https://winglang.io)
* [Neon](https://neon.tech/) free-tier account (for deploying on AWS)

## Installation

Use `npm` to install this library:

```sh
npm i @winglibs/postgres
```

## Bring it

```js
bring cloud;
bring postgres;

let db = new postgres.Database(
  name: "mydb",
  pgVersion: 15,
);

let api = new cloud.Api();

api.get("/users", inflight (req) => {
  let users = db.query("select * from users");
  return {
    status: 200,
    body: Json.stringify(users),
  };
});
```

You can find connection information in `db.connection`:

- `host` - the host to connect to
- `port` - the external port to use (a token that will resolve at runtime)
- `user` - user name
- `password` - password
- `database` - the database name
- `ssl` - use SSL or not

## `sim`

When executed in the Wing Simulator, postgres is run within a local Docker container.

### Connecting to Postgres from `sim.Container`

If you are connecting from a `sim.Container`, you should use `host.docker.internal` as the `host` in
order to be able to access the host network:

Example:

```js
new sim.Container(
  // ...
  env: {
    DB_HOST: "host.docker.internal",
    DB_PORT: db.connection.port
  }
)
```

### Reference Existing Postgres Database
If you want to import a reference to an existing postgres database, you can use the `DatabaseRef` class:

```js
bring postgres;

let db = new postgres.DatabaseRef() as "somedatabase";


new cloud.Function(inflight() => {
  let users = db.query("select * from users");
});
```
This will automatically create a secret resource that is required for the database connection. To seed this secret, use the `secrets` subcommand:

```sh
❯ wing secrets main.w
1 secret(s) found

? Enter the secret value for connectionString_somedatabase: [input is hidden] 
```

> When referencing an existing database for the `tf-aws` target you will also need to specify VPC information in your `wing.toml` file (unless your database is publicly accessible). Or you will see an warning like this:
```sh
WARNING: Unless your database is accessible from the public internet, you must provide vpc info under `tf-aws` in your wing.toml file
For more info see: https://www.winglang.io/docs/platforms/tf-aws#parameters
```

## `tf-aws`

On the `tf-aws` target, the postgres database can be created and hosted by either AWS RDS or Neon. To configure which one to use, simply specify the parameter `postgresEngine` in your `wing.toml` file:

```toml
postgresEngine = "rds" # or "neon"
```

### Neon Setup

Neon has a [free tier](https://neon.tech/docs/introduction/free-tier) that can be used for personal projects and prototyping.

Database credentials are securely stored on AWS Secrets Manager (via `cloud.Secret`).

When you deploy Terraform that uses the `Database` class, you will need to have the NEON_API_KEY environment variable set with an API key.

## Roadmap

- [x] Support `tf-aws` platform using Neon
- [ ] Support `sim` platform
- [ ] Make all Neon databases share a Neon project to stay within the free tier
- [ ] Reuse postgres client across multiple queries by requiring users to call `connect()` / `end()` methods
- [ ] Initialize secret value through `cloud.Secret` APIs - https://github.com/winglang/wing/issues/2726
- [ ] Support [parameterized queries](https://node-postgres.com/features/queries#parameterized-query) for preventing SQL injection
- [ ] Customize [type parser](https://node-postgres.com/features/queries#types) for most popular postgres types / conversions to Wing types
- [ ] Have `query()` return both rows and a list of field names
- [ ] More unit tests and examples

## License

Licensed under the [MIT License](../LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/postgres.Database">Database</a>
  - <a href="#@winglibs/postgres.DatabaseRef">DatabaseRef</a>
- **Interfaces**
  - <a href="#@winglibs/postgres.IDatabase">IDatabase</a>
- **Structs**
  - <a href="#@winglibs/postgres.AwsParameters">AwsParameters</a>
  - <a href="#@winglibs/postgres.ConnectionOptions">ConnectionOptions</a>
  - <a href="#@winglibs/postgres.DatabaseProps">DatabaseProps</a>

### Database (preflight class) <a class="wing-docs-anchor" id="@winglibs/postgres.Database"></a>

*No description*

#### Constructor

```
new(props: DatabaseProps): Database
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>connection</code> | <code>ConnectionOptions</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight connectionOptions(): ConnectionOptions</code> | *No description* |
| <code>inflight query(query: str): Array<Map<Json>></code> | *No description* |

### DatabaseRef (preflight class) <a class="wing-docs-anchor" id="@winglibs/postgres.DatabaseRef"></a>

*No description*

#### Constructor

```
new(): DatabaseRef
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight query(query: str): Array<Map<Json>></code> | *No description* |

### IDatabase (interface) <a class="wing-docs-anchor" id="@winglibs/postgres.IDatabase"></a>

*No description*

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>inflight connectionOptions(): ConnectionOptions?</code> | *No description* |
| <code>inflight query(query: str): Array<Map<Json>></code> | *No description* |

### AwsParameters (struct) <a class="wing-docs-anchor" id="@winglibs/postgres.AwsParameters"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>postgresEngine</code> | <code>str?</code> | *No description* |

### ConnectionOptions (struct) <a class="wing-docs-anchor" id="@winglibs/postgres.ConnectionOptions"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>database</code> | <code>str</code> | *No description* |
| <code>host</code> | <code>str</code> | *No description* |
| <code>password</code> | <code>str</code> | *No description* |
| <code>port</code> | <code>str</code> | *No description* |
| <code>ssl</code> | <code>bool</code> | *No description* |
| <code>user</code> | <code>str</code> | *No description* |

### DatabaseProps (struct) <a class="wing-docs-anchor" id="@winglibs/postgres.DatabaseProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>name</code> | <code>str</code> | *No description* |
| <code>pgVersion</code> | <code>num?</code> | *No description* |


