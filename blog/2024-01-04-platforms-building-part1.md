---
title: Crafting Custom Platforms in a Cloudy World
description: How to build a Wing Custom Platform
authors:
  - hasanaburayyan
tags: [ cloud-oriented,  programming, winglang, platforms]
hide_table_of_contents: true
---
Wow its 2024, almost a quarter of the way through the 21st century, if you are reading this you probably should pat yourself on the back, because you did it! You have survived the crazy roller coaster ride that has lingered over the last several years, ranging from a pandemic to global insecurity with ongoing wars.

So finally 2024 is here, and we all get to ask ourselves, "Is this the year things finally start going back to normal?"... probably not! Though, as we all sit on the edge of our seats waiting for the next global crisis (my bingo card has mole people rising to the surface) we can take solace in one silver lining. Wing Custom Platforms are all the rage, and easier than ever to build!

In this blog series I'm going to be walking through how to build, publish, and use your own Wing Custom Platforms. Now before we get too deep, and since this is the first installment of what will probably be many procrastinated iterations, lets just do a quick level set.

## What Are Wing Custom Platforms?

The purpose of the post is not to explain all the dry details of Wing Platforms, thats the job of the Wing docs (I'll provide reference links down below). Rather we want to get into the fun of building one, so Ill briefly explain. 

Wing Custom Platforms offer us a way to hook into a Wing application's compilation process. This is done through various hooks that a custom platform can implement. As of the today, some of these hooks include:
- preSynth: called before the compiler begins to synthesize, and gives us access to the root app in the construct tree.
- postSynth: called right after artifacts are synthesized, and will give us access to manipulate the resulting configuration. In the case of a Terraform provisioner this is the Terraform JSON configuration.
- validate: called right after the `postSynth` hook and provides the same input, however the key difference is the passed config is immutable. Which is important for validation operations

There are several other hooks that exist though, we wont go into all those in this blog.


## Lets Get Building!

One more bit of information we need before we start building our very own Custom Platform which is kind of important is, "what is our platform going to do?"

I'm glad you asked! We are going to build a Custom Platform that will enhance the developer experience when working with Terraform based platforms, some of which come builtin with Wing installation such as `tf-aws`, `tf-azure`, and `tf-gcp`. 

The specific enhancement is we want to add is the functionality to configure how Terraform state files are managed through the use of Terraform backends. By default all of the builtin Terraform based platforms will use local state file configurations, which is nice for quick experimentation, but lacks some rigor for production quality deployments. 

### The Goal

Build and publish a Wing Custom Platform that provides a way to configure your Terraform backend state management. 

For the purpose of brevity we will focus on 4 backend types, `local`, `s3`, `azurerm`, and `gcs`

### Required Materials

- Wing
- NPM & Node
- A bit of Typescript know-hows
- A wish and a prayer

## Creating The Project

To begin lets just create a new npm project, I'm going to be a little bit more bare bones in this guide, so ill just create a `package.json` and `tsconfig.json`

Below is my `package.json` file, the only real interesting part about it is the dev dependency on `@winglang/sdk` this is so we can use some of the exposed Platform types, which we will see an example of soon. 
```json
{

	"name": "@wingplatforms/tf-backends",
	"version": "0.0.1",
	"main": "index.js",
	"repository": {
		"type": "git",
		"url": "https://github.com/hasanaburayyan/wing-tf-backends"
	},
	"license": "ISC",
	"devDependencies": {
		"typescript": "5.3.3",
		"@winglang/sdk": "0.54.30"
	},
	"files": [
		"lib"
	]
}
```

Here is the `tsconfig.json` Ive omitted a few other details for brevity since some other options are just personal preference. Whats worth noting here is how I have decided to structure the project. All my code will exist in a `src` folder and my expectations are that output of compilation will be in the `lib` folder.  Now you might set your project up different and thats fine, but its worth explaining if you are just following along.
```json
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "commonjs",
		"rootDir": "./src",
		"outDir": "./lib",
		"lib": [
			"es2020",
			"dom"
		],
	},
	"include": [
		"./src/**/*"
	],
	"exclude": [
		"./node_modules"
	]
}
```

Then to prep our dependencies we can just run `npm install`
### Lets Code!

Okay now that that initial setup is out of the way, time to start writing our Platform!! 

First Ill create a file `src/platform.ts` this will contain the main code for our Platform, which is used by the Wing compiler. The bare minimum code required for a Platform would look like this

```typescript
import { platform } from "@winglang/sdk";

export class Platform implements platform.IPlatform {
  readonly target = "tf-*";
}
```

Here we create and export the our Platform class, which implements the `IPlatform` interface. All the platform hooks are optional so we don't actually have to define anything else for this to technically be valid. 

Now the required bit is defining `target` this mechanism allows a platform to define the provisioning engine and cloud provider it is compatible with. At the time of this blog post there is not actually an enforcement of this compatibly but... we imagine it works :) 

Okay, so we have a barebones Platform but its not actually useful yet, lets change that! First we will plan on using environment variables to determine which type of backend our users want to use, as well as what is the `key` for the state file.

So we will provide a constructor in our Platform:
```typescript
import { platform } from "@winglang/sdk";

export class Platform implements platform.IPlatform {
	readonly target = "tf-*";
	readonly backendType: string;
	readonly stateFileKey: string;
	
	constructor() {
		if (!process.env.TF_BACKEND_TYPE) {
			throw new Error(`TF_BACKEND_TYPE environment variable must be set.`)
		}
		if (!process.env.TF_STATE_FILE_KEY) {
			throw new Error("TF_STATE_FILE_KEY environment variable must be set.")
		}
		
		this.backendType = process.env.TF_BACKEND_TYPE
		this.stateFileKey = process.env.TF_STATE_FILE_KEY
	}
}
```

Cool, now we are starting to get moving. Our Platform will require the users to have two environment variables set when compiling their Wing code, `TF_BACKEND_TYPE` and `TF_STATE_FILE_KEY` for now we will just persist this data as instance variables.

One more house keeping item we need to do is export our Platform code, to do this lets create an `index.ts` with a single line that looks like this:
```typescript
export * from "./platform"
```
#### Testing Our Platform

Before we get much further I just want to show how to test your Platform locally to see it working. In order to test this code we need to first compile it using the command `npx tsc` and since we already defined everything in our `tsconfig.json` we will conveniently have a folder named `lib` that contains all the generated JavaScript code.

Lets create a super simple Wing application to use this Platform with.
```js
// main.w
bring cloud;

new cloud.Bucket();
```

The above Wing code will just import the cloud library and use it to create a Bucket resource. 

Next we will run a Wing compile command using our Platform in combination with some other Terraform based Platform, in my case it will be `tf-aws`
```bash
wing compile main.w --platform tf-aws --platform ./lib
```
**Note**: We are providing two Platforms `tf-aws` and a relative path to our compiled Platform `./lib` The ordering of these Platforms is also important `tf-aws` MUST come first since its a Platform that implements the `newApp()` API. We won't dive deeper into that in this post but the reference reading materials down below will provide links if you want to dive deeper. 

Now running this code will result in the following error:
```bash
wing compile main.w -t tf-aws -t ./lib

An error occurred while loading the custom platform: Error: TF_BACKEND_TYPE environment variable must be set.
```

Now before you freak out, just know thats one of them good errors :) we can indeed see our Platform code was loaded and run because the Error was thrown requiring `TF_BACKEND_TYPE` as an environment variable.  If we now rerun the compile command with the required variables we should get a successful compilation

```bash
TF_BACKEND_TYPE=s3 TF_STATE_FILE_KEY=mystate.tfstate wing compile main.w -t tf-aws -t ./lib
```

To be extra sure the compilation worked we can inspect the generated Terraform code in `target/main.tfaws/main.tf.json` 

```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
    }
  },
  "provider": {
    "aws": [
      {
      }
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    }
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
      }
    }
  }
}
```

We should see that a single Bucket is being created, however it is still using the `local` Terraform backend and that is because we still have some work to do!

### Implementing The postSynth Hook

Since we want to edit the generated Terraform configuration file after the code has been synthesized, we will implement the postSynth hook. As I explained earlier this hook is called right after synthesis completes and passes the resulting configuration file.

What is more useful about this hook is it allows us to return a mutated version of the configuration file. 

To implement this hook we will update our Platform code with this
```typescript
export class Platform implements platform.IPlatform {
  // ... 
  postSynth(config: any): any {
    if (this.backendType === "s3") {
      if (!process.env.TF_S3_BACKEND_BUCKET) {
        throw new Error("TF_S3_BACKEND_BUCKET environment variable must be set.")
      }
  
      if (!process.env.TF_S3_BACKEND_BUCKET_REGION) {
        throw new Error("TF_S3_BACKEND_BUCKET_REGION environment variable must be set.")
      }
  
      config.terraform.backend = {
        s3: {
          bucket: process.env.TF_S3_BACKEND_BUCKET,
          region: process.env.TF_S3_BACKEND_BUCKET_REGION,
          key: this.stateFileKey,
        }
      }
    }
    return config;
  }
}
```

Now we can see there is some control flow logic happening here, if the user wants to use an `s3` backend we will need some additional input such as the name and region of the bucket, which we will use `TF_S3_BACKEND_BUCKET` and `TF_S3_BACKEND_BUCKET_REGION` to configure. 

Assuming all of the required environment variables exist, we can then manipulate the provided config object, where we set `config.terraform.backend` to use an `s3` configuration block. Finally the config object is returned.

Now to see this all in action we will need to compile our code (`npx tsc`) and provide all four required s3 environment variables. To make the commands easier to read Ill do it in multiple lines:
```bash
# compile platform code
npx tsc

# set env vars
export TF_BACKEND_TYPE=s3
export TF_STATE_FILE_KEY=mystate.tfstate
export TF_S3_BACKEND_BUCKET=myfavorites3bucket
export TF_S3_BACKEND_BUCKET_REGION=us-east-1

# compile wing code!
wing compile main.w -t tf-aws -t ./lib
```

And viola! We should now be able to look at our Terraform config and see that a remote s3 backend is being used:
```json
// Parts of the config have been omitted for brevity
{
  "terraform": {
    "required_providers": {
      "aws": {
        "version": "5.31.0",
        "source": "aws"
      }
    },
    "backend": {
      "s3": {
        "bucket": "myfavorites3bucket",
        "region": "us-east-1",
        "key": "mystate.tfstate"
      }
    }
  },
  "resource": {
    "aws_s3_bucket": {
      "cloudBucket": {
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false,
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        }
      }
    }
  }
}
```

### ITS ALIVE!!!

If you have been following along, pat yourself on the back again! Now on top of surviving the early 2020s you have also written your first Wing Custom Platform!

Now before we go into how to make it available for use to other Wingnuts, lets actually make our code a little cleaner, and a bit more usefully robust. 

## Supporting Multiple Backends

In order to live up to its name `tf-backends` it should probably support multiple backends! To accomplish this lets just use some good ol' coding chops to abstract a bit. 

We want our Platform to support `s3`, `azurerm`, and `gcs` to accomplish this we just have to define different `config.terraform.backend` blocks based on the desired backend.

To make this work I'm going to create a few more files:

`src/backends/backend.ts`
```typescript
// simple interface to define a backend behavior
export interface IBackend {
  generateConfigBlock(stateFileKey: string): void;
}
```
Now several backend classes that implement this interface

`src/backends/s3.ts`
```typescript
import { IBackend } from "./backend";

export class S3 implements IBackend {
  readonly backendBucket: string;
  readonly backendBucketRegion: string;

  constructor() {
    if (!process.env.TF_S3_BACKEND_BUCKET) {
      throw new Error("TF_S3_BACKEND_BUCKET environment variable must be set.")
    }

    if (!process.env.TF_S3_BACKEND_BUCKET_REGION) {
      throw new Error("TF_S3_BACKEND_BUCKET_REGION environment variable must be set.")
    }
    
    this.backendBucket = process.env.TF_S3_BACKEND_BUCKET;
    this.backendBucketRegion = process.env.TF_S3_BACKEND_BUCKET_REGION;
  }

  generateConfigBlock(stateFileKey: string): any {
    return {
      s3: {
        bucket: this.backendBucket,
        region: this.backendBucketRegion,
        key: stateFileKey,
      }
    }
  }
}
```

`src/backends/azurerm.ts`
```ts
import { IBackend } from "./backend";

export class AzureRM implements IBackend {
  readonly backendStorageAccountName: string;
  readonly backendStorageAccountResourceGroupName: string;
  readonly backendContainerName: string;

  constructor() {
    if (!process.env.TF_AZURERM_BACKEND_STORAGE_ACCOUNT_NAME) {
      throw new Error("TF_AZURERM_BACKEND_STORAGE_ACCOUNT_NAME environment variable must be set.")
    }

    if (!process.env.TF_AZURERM_BACKEND_STORAGE_ACCOUNT_RESOURCE_GROUP_NAME) {
      throw new Error("TF_AZURERM_BACKEND_STORAGE_ACCOUNT_RESOURCE_GROUP_NAME environment variable must be set.")
    }

    if (!process.env.TF_AZURERM_BACKEND_CONTAINER_NAME) {
      throw new Error("TF_AZURERM_BACKEND_CONTAINER_NAME environment variable must be set.")
    }
    
    this.backendStorageAccountName = process.env.TF_AZURERM_BACKEND_STORAGE_ACCOUNT_NAME;
    this.backendStorageAccountResourceGroupName = process.env.TF_AZURERM_BACKEND_STORAGE_ACCOUNT_RESOURCE_GROUP_NAME;
    this.backendContainerName = process.env.TF_AZURERM_BACKEND_CONTAINER_NAME;
  }

  generateConfigBlock(stateFileKey: string): any {
    return {
      azurerm: {
        storage_account_name: this.backendStorageAccountName,
        resource_group_name: this.backendStorageAccountResourceGroupName,
        container_name: this.backendContainerName,
        key: stateFileKey,
      }
    }
  }
}
```

`src/backends/gcs.ts`
```ts
import { IBackend } from "./backend";

export class GCS implements IBackend {
  readonly backendBucket: string;

  constructor() {
    if (!process.env.TF_GCS_BACKEND_BUCKET) {
      throw new Error("TF_GCS_BACKEND_BUCKET environment variable must be set.")
    }

    if (!process.env.TF_GCS_BACKEND_PREFIX) {
      throw new Error("TF_GCS_BACKEND_PREFIX environment variable must be set.")
    }
    
    this.backendBucket = process.env.TF_GCS_BACKEND_BUCKET;
  }

  generateConfigBlock(stateFileKey: string): any {
    return {
      gcs: {
        bucket: this.backendBucket,
        key: stateFileKey,
      }
    }
  }
}
```

Now that we have our backend classes defined, we can update our Platform code to use them. My final Platform code looks like this:
```typescript
import { platform } from "@winglang/sdk";
import { S3 } from "./backends/s3";
import { IBackend } from "./backends/backend";
import { AzureRM } from "./backends/azurerm";
import { GCS } from "./backends/gcs";
import { Local } from "./backends/local";

// TODO: support more backends: https://developer.hashicorp.com/terraform/language/settings/backends/local
const SUPPORTED_TERRAFORM_BACKENDS = [
  "s3",
  "azurerm",
  "gcs"
]

export class Platform implements platform.IPlatform {
  readonly target = "tf-*";
  readonly backendType: string;
  readonly stateFileKey: string;

  constructor() {
    if (!process.env.TF_BACKEND_TYPE) {
      throw new Error(`TF_BACKEND_TYPE environment variable must be set. Available options: (${SUPPORTED_TERRAFORM_BACKENDS.join(", ")})`)
    }
    if (!process.env.TF_STATE_FILE_KEY) {
      throw new Error("TF_STATE_FILE_KEY environment variable must be set.")
    }
    this.backendType = process.env.TF_BACKEND_TYPE 
    this.stateFileKey = process.env.TF_STATE_FILE_KEY
  }

  postSynth(config: any): any {
    config.terraform.backend = this.getBackend().generateConfigBlock(this.stateFileKey);
    return config;
  }

  /**
   * Determine which backend class to initialize based on the backend type
   * 
   * @returns the backend instance based on the backend type
   */
  getBackend(): IBackend {
    switch (this.backendType) {
      case "s3": return new S3();
      case "azurerm": return new AzureRM();
      case "gcs": return new GCS();
      default: throw new Error(`Unsupported backend type: ${this.backendType}, available options: (${SUPPORTED_TERRAFORM_BACKENDS.join(", ")})`);
    }
  }
}
```

BOOM!! Our Platform now supports all 3 different backends we wanted to support! 

Feel free to build and test each one.

### Publishing Our Platform For Use

Now I'm not going to explain all the intricate details about how `npm` packages work, since I would do a poor job of that as indicated by the fact my below examples will use a version `0.0.3` (third times the charm!)

However if you have followed along thus far you will be able to run the following commands
**Note:** in order to publish this library you will need to have defined a package name that you are authorized to publish to. If you use mine (@wingplatforms/tf-backends) you're gonna have a bed time 
```
```bash
# compile platform code again
npx tsc

# package your code
npm pack

# publish your package
npm publish
```

If done right you should see something along the lines of
```bash
npm notice === Tarball Details === 
npm notice name:          @wingplatforms/tf-backends              
npm notice version:       0.0.3                                   
npm notice filename:      wingplatforms-tf-backends-0.0.3.tgz     
npm notice package size:  36.8 kB                                 
npm notice unpacked size: 119.5 kB                                
npm notice shasum:        0186c558fa7c1ff587f2caddd686574638c9cc4c
npm notice integrity:     sha512-mWIeg8yRE7CG/[...]cT8Kh8q/QwlGg==
npm notice total files:   17                                      
npm notice 
npm notice Publishing to https://registry.npmjs.org/ with tag latest and default access
```

## Using The Published Platform

With the Platform created lets try it out. 
**Note**: I suggest using a clean directory for playing with it

Using the same simple Wing application as before
```
// main.w
bring cloud;

new cloud.Bucket()
```

We need to add one more thing to use a Custom Platform, a `package.json` file which only needs to define the published Platform as a dependency:
```json
{
  "dependencies": {
    "@wingplatforms/tf-backends": "0.0.3",
  }
}
```

With both those files create lets install our custom Platform using `npm install`

Finally we lets set up all the environment variables for GCS and run our Wing compile command. **Note**: since we are using a installed npm library we will provide the package name and not `./lib` anymore!
```bash
export TF_BACKEND_TYPE=gcs
export TF_STATE_FILE_KEY=mystate.tfstate
export TF_GCS_BACKEND_BUCKET=mygcsbucket

wing compile main.w -t tf-aws -t @wingplatforms/tf-backends
```

Now we should be able to see that the generated Terraform config is using the correct remote backend!
```json
{
  "terraform": {
    "required_providers": {
      "aws": {
        "version": "5.31.0",
        "source": "aws"
      }
    },
    "backend": {
      "gcs": {
        "bucket": "mygcsbucket",
        "key": "mystate.tfstate"
      }
    }
  },
  "resource": {
    "aws_s3_bucket": {
      "cloudBucket": {
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false,
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        }
      }
    }
  }
}
```


## Whats Next?

Now that we have built and published our first Wing Custom Platform, the sky is the limit! Get out there and start building the Custom Platforms to your hearts content <3 and keep a look out for the next addition to this series on Platform building!

In the meantime make sure you to join the Wing Slack community: https://t.winglang.io/slack and share what you are working on, or any issues you run into.

Want to read more about Wing Platforms? Check out the [Wing Platform Docs](https://www.winglang.io/docs/concepts/platforms)