---
title: Terraform utilities
id: tf
sidebar_label: Terraform utilities (winglib)
description:  Terraform utilities library for Wing
keywords: [winglib, Wing library]
---
This Wing library includes some useful utilities to work with Terraform.

## Prerequisites

* [winglang](https://winglang.io).

## Installation

```sh
npm i @winglibs/tf
```

## `tf.Resource`

Represents an arbitrary Terraform resource.

> `tf.Resource` can only be used when compiling your Wing program to a `tf-*` target.

It takes a `terraformResourceType` and `attributes` properties, as well as all the properties of the `TerraformResource`
class from CDKTF.

```js
bring tf;

let role = new tf.Resource({
  terraformResourceType: "aws_iam_role",
  attributes: {
    inline_policy: {
      name: "lambda-invoke",
      policy: Json.stringify({
        Version: "2012-10-17",
        Statement: [ 
          { 
            Effect: "Allow",
            Action: [ "lambda:InvokeFunction" ],
            Resource: "*" 
          }
        ]
      })
    },
    assume_role_policy: Json.stringify({
      Version: "2012-10-17",
      Statement: [
        { 
          Action: "sts:AssumeRole",
          Effect: "Allow",
          Principal: { Service: "states.amazonaws.com" }
        },
      ]
    })
  }
}) as "my_role";

let arn = role.getStringAttribute("arn");

test "print arn" {
  log(arn);
}
```

Now, we can compile this to Terraform:

```sh
wing compile -t tf-aws
```

And the output will be:

```json
{
  "resource": {
    "aws_iam_role": {
      "my_role": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/my_role",
            "uniqueId": "my_role"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"states.amazonaws.com\"}}]}",
        "inline_policy": {
          "name": "lambda-invoke",
          "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":\"*\"}]}"
        }
      }
    }
  },
  "provider": { "aws": [ { } ] },
  "terraform": {
    "backend": {
      "local": {
        "path": "./terraform.tfstate"
      }
    },
    "required_providers": {
      "aws": {
        "source": "aws",
        "version": "5.31.0"
      }
    }
  }
}
```

## `tf.Provider`

Represents an arbitrary Terraform provider.

> `tf.Provider` can only be used when compiling your Wing program to a `tf-*` target.

It takes `name`, `source`, `version`, and `attributes` properties:

```js
bring tf;

new tf.Provider({
  name: "dnsimple",
  source: "dnsimple/dnsimple",
  version: "1.6.0",
  attributes: {
    token: "dnsimple_token",
  }
}) as "DnsimpleProvider";
```

Now, we can compile this to Terraform:

```sh
wing compile -t tf-aws
```

And the output will be:

```json
{
  "provider": {
    "aws": [{}],
    "dnsimple": [
      {
        "token": "dnsimple_token"
      }
    ]
  },
  "terraform": {
    "backend": {
      "local": {
        "path": "./terraform.tfstate"
      }
    },
    "required_providers": {
      "aws": {
        "source": "aws",
        "version": "5.31.0"
      },
      "dnsimple": {
        "source": "dnsimple/dnsimple",
        "version": "1.6.0"
      }
    }
  }
}
```

You can create a singleton provider like so:

```js
class DnsimpleProvider {
  pub static getOrCreate(scope: std.IResource): tf.Provider {
    let root = nodeof(scope).root;
    let singletonKey = "WingDnsimpleProvider";
    let existing = nodeof(root).tryFindChild(singletonKey);
    if existing? {
      return unsafeCast(existing);
    }

    return new tf.Provider(
      name: "dnsimple",
      source: "dnsimple/dnsimple",
      version: "1.6.0",
    ) as singletonKey in root;
  }
}
```

Use `DnsimpleProvider.getOrCreate(scope)` to get the provider instance.

## `tf.Element`

Just a blob of JSON that goes into the Terraform output:

```js
bring tf;

new tf.Element({ 
  provider: [
    { aws: {  } },
    { aws: { alias: "server_function" } },
    { aws: { alias: "global", region: "us-east-1" } }
  ]
});
```

The above example will add a `provider` section to the output Terraform with a set of providers.

## Maintainers

* [Elad Ben-Israel](@eladb)
* [Chris Rybicki](@Chriscbr)

## License

This library is licensed under the [MIT License](./LICENSE).
---
## API Reference

### Table of Contents

- **Classes**
  - <a href="#@winglibs/tf.Resource">Resource</a>
  - <a href="#@winglibs/tf.Provider">Provider</a>
  - <a href="#@winglibs/tf.Element">Element</a>
- **Structs**
  - <a href="#@winglibs/tf.ResourceProps">ResourceProps</a>
  - <a href="#@winglibs/tf.ProviderProps">ProviderProps</a>

### Resource (preflight class) <a class="wing-docs-anchor" id="@winglibs/tf.Resource"></a>

*No description*

#### Constructor

```
new(props: ResourceProps): Resource
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>connection</code> | <code>any?</code> | *No description* |
| <code>count</code> | <code>any?</code> | *No description* |
| <code>dependsOn</code> | <code>Array<str>?</code> | *No description* |
| <code>forEach</code> | <code>ITerraformIterator?</code> | *No description* |
| <code>lifecycle</code> | <code>TerraformResourceLifecycle?</code> | *No description* |
| <code>provider</code> | <code>TerraformProvider?</code> | *No description* |
| <code>provisioners</code> | <code>Array<any>?</code> | *No description* |
| <code>terraformGeneratorMetadata</code> | <code>TerraformProviderGeneratorMetadata?</code> | *No description* |
| <code>terraformMetaArguments</code> | <code>Map<any></code> | *No description* |
| <code>terraformResourceType</code> | <code>str</code> | *No description* |
| <code>cdktfStack</code> | <code>TerraformStack</code> | *No description* |
| <code>fqn</code> | <code>str</code> | *No description* |
| <code>friendlyUniqueId</code> | <code>str</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>addMoveTarget(moveTarget: str): void</code> | Adds a user defined moveTarget string to this resource to be later used in .moveTo(moveTarget) to resolve the location of the move. |
| <code>getAnyMapAttribute(terraformAttribute: str): Map<any></code> | *No description* |
| <code>getBooleanAttribute(terraformAttribute: str): IResolvable</code> | *No description* |
| <code>getBooleanMapAttribute(terraformAttribute: str): Map<bool></code> | *No description* |
| <code>getListAttribute(terraformAttribute: str): Array<str></code> | *No description* |
| <code>getNumberAttribute(terraformAttribute: str): num</code> | *No description* |
| <code>getNumberListAttribute(terraformAttribute: str): Array<num></code> | *No description* |
| <code>getNumberMapAttribute(terraformAttribute: str): Map<num></code> | *No description* |
| <code>getStringAttribute(terraformAttribute: str): str</code> | *No description* |
| <code>getStringMapAttribute(terraformAttribute: str): Map<str></code> | *No description* |
| <code>hasResourceMove(): any?</code> | *No description* |
| <code>importFrom(id: str, provider: TerraformProvider?): void</code> | *No description* |
| <code>interpolationForAttribute(terraformAttribute: str): IResolvable</code> | *No description* |
| <code>static isTerraformResource(x: any): bool</code> | *No description* |
| <code>moveFromId(id: str): void</code> | Move the resource corresponding to "id" to this resource. |
| <code>moveTo(moveTarget: str, index: any?): void</code> | Moves this resource to the target resource given by moveTarget. |
| <code>moveToId(id: str): void</code> | Moves this resource to the resource corresponding to "id". |
| <code>toHclTerraform(): any</code> | *No description* |
| <code>toMetadata(): any</code> | *No description* |
| <code>toTerraform(): any</code> | Adds this resource to the terraform JSON output. |
| <code>addOverride(path: str, value: any): void</code> | *No description* |
| <code>static isTerraformElement(x: any): bool</code> | *No description* |
| <code>overrideLogicalId(newLogicalId: str): void</code> | Overrides the auto-generated logical ID with a specific ID. |
| <code>resetOverrideLogicalId(): void</code> | Resets a previously passed logical Id to use the auto-generated logical id again. |

### Provider (preflight class) <a class="wing-docs-anchor" id="@winglibs/tf.Provider"></a>

*No description*

#### Constructor

```
new(props: ProviderProps): Provider
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>alias</code> | <code>str?</code> | *No description* |
| <code>fqn</code> | <code>str</code> | *No description* |
| <code>metaAttributes</code> | <code>Map<any></code> | *No description* |
| <code>terraformGeneratorMetadata</code> | <code>TerraformProviderGeneratorMetadata?</code> | *No description* |
| <code>terraformProviderSource</code> | <code>str?</code> | *No description* |
| <code>terraformResourceType</code> | <code>str</code> | *No description* |
| <code>cdktfStack</code> | <code>TerraformStack</code> | *No description* |
| <code>friendlyUniqueId</code> | <code>str</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>static isTerraformProvider(x: any): bool</code> | *No description* |
| <code>toHclTerraform(): any</code> | *No description* |
| <code>toMetadata(): any</code> | *No description* |
| <code>toTerraform(): any</code> | Adds this resource to the terraform JSON output. |
| <code>addOverride(path: str, value: any): void</code> | *No description* |
| <code>static isTerraformElement(x: any): bool</code> | *No description* |
| <code>overrideLogicalId(newLogicalId: str): void</code> | Overrides the auto-generated logical ID with a specific ID. |
| <code>resetOverrideLogicalId(): void</code> | Resets a previously passed logical Id to use the auto-generated logical id again. |

### Element (preflight class) <a class="wing-docs-anchor" id="@winglibs/tf.Element"></a>

*No description*

#### Constructor

```
new(config: Json): Element
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>cdktfStack</code> | <code>TerraformStack</code> | *No description* |
| <code>fqn</code> | <code>str</code> | *No description* |
| <code>friendlyUniqueId</code> | <code>str</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>toTerraform(): Json</code> | *No description* |
| <code>addOverride(path: str, value: any): void</code> | *No description* |
| <code>static isTerraformElement(x: any): bool</code> | *No description* |
| <code>overrideLogicalId(newLogicalId: str): void</code> | Overrides the auto-generated logical ID with a specific ID. |
| <code>resetOverrideLogicalId(): void</code> | Resets a previously passed logical Id to use the auto-generated logical id again. |
| <code>toHclTerraform(): any</code> | *No description* |
| <code>toMetadata(): any</code> | *No description* |

### ResourceProps (struct) <a class="wing-docs-anchor" id="@winglibs/tf.ResourceProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>attributes</code> | <code>Json?</code> | *No description* |
| <code>connection</code> | <code>any?</code> | *No description* |
| <code>count</code> | <code>any?</code> | *No description* |
| <code>dependsOn</code> | <code>Array<ITerraformDependable>?</code> | *No description* |
| <code>forEach</code> | <code>ITerraformIterator?</code> | *No description* |
| <code>lifecycle</code> | <code>TerraformResourceLifecycle?</code> | *No description* |
| <code>provider</code> | <code>TerraformProvider?</code> | *No description* |
| <code>provisioners</code> | <code>Array<any>?</code> | *No description* |
| <code>terraformGeneratorMetadata</code> | <code>TerraformProviderGeneratorMetadata?</code> | *No description* |
| <code>terraformResourceType</code> | <code>str</code> | *No description* |

### ProviderProps (struct) <a class="wing-docs-anchor" id="@winglibs/tf.ProviderProps"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>attributes</code> | <code>Json?</code> | The provider-specific configuration options. @default {} |
| <code>name</code> | <code>str</code> | The name of the provider in Terraform - this is the prefix used for all resources in the provider. @example "aws" |
| <code>source</code> | <code>str</code> | The source of the provider on the Terraform Registry. @example "hashicorp/aws" |
| <code>version</code> | <code>str</code> | The version of the provider to use. @example "2.0" |


