---
title: Managing Winglang Libraries with AWS CodeArtifact
description: Managing Winglang Libraries with AWS CodeArtifact
authors:
  - ashersterkin
tags: [cloud-oriented, programming, middleware, platforms]
image: ../img/asher-code-artifacts.jpg
hide_table_of_contents: true
---

<div style={{color: "#E2EAEB", fontSize: "2rem" }}>Needs, Challenges, and Solutions</div>

[Winglang](https://github.com/winglang/wing) provides a solution for contributing to its [Winglibs](https://github.com/winglang/winglibs) project. This is the way to go if you only need to wrap a particular cloud resource on one or more platforms. Just follow the [guidelines](https://github.com/winglang/winglibs?tab=readme-ov-file#how-do-i-add-a-new-library). However, while developing the initial version of the [Endor](https://medium.com/itnext/in-search-for-winglang-middleware-868443bd81f2) middleware framework, I had different needs.

First, the [Endor](https://medium.com/itnext/in-search-for-winglang-middleware-868443bd81f2) library is in a very initial exploratory phase—far from a maturity level to be considered a contribution candidate for publishing in the public [NPM Registry](https://www.npmjs.com/).

Second, it includes several supplementary and still immature tool libraries, such as Exceptions and Logging. These tools need to be published separately (see explanation below). Therefore, I needed a solution for managing multiple [NPM Packages](https://docs.npmjs.com/about-packages-and-modules) in one project.

Third, I wanted to explore how prospective [Winglang](https://github.com/winglang/wing) customers will be able to manage their internal libraries. 

For that goal, I decided to experiment with the [AWS CodeArtifact](https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html) service configured to play the role of my internal NPM Registry. 

This publication is an experience report about the first phase, primarily focused on the developer’s experience with my Multi-Account, Multi-Platform, Multi-User (MAPU) environment, which I reported about [here](https://medium.com/@asher-sterkin/aws-mapu-65e888009916), [here](https://medium.com/aws-in-plain-english/simplifying-remote-cloud-based-development-connections-58a7b7539cc5), and [here](https://medium.com/aws-in-plain-english/balancing-productivity-and-cost-in-cloud-based-remote-desktop-593408c9db9e). Specifically, I configured the AWS CodeArtifact [Domain](https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html) and [Repository](https://docs.aws.amazon.com/codeartifact/latest/ug/repos.html) within my working account and postponed a more elaborate enterprise-grade system architecture to later stages. Let’s start with the overall solution overview.

# Solution Overview

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*sBhJjRiOgVwh_CZQPd6V8w.jpeg"/>
</div>

Here is a brief description of the solution:

1. Within my `winglang` account, I created an AWS CodeArtifact [Domain](https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html) tentatively named `<organizationID>-platform`.
2. Under this [Domain](https://docs.aws.amazon.com/codeartifact/latest/ug/domain-overview.html), I created an AWS CodeArtifact [Repository](https://docs.aws.amazon.com/codeartifact/latest/ug/repos.html) tentatively named `winglang-artifacts`.
3. This AWS CodeArtifact [Repository](https://docs.aws.amazon.com/codeartifact/latest/ug/repos.html) is connected to the public [npmjs](https://www.npmjs.com/) repository, from which all third-party packages, including those from the official [Winglibs](https://github.com/winglang/winglibs), are downloaded.
4. The AWS CodeArtifact [Repository](https://docs.aws.amazon.com/codeartifact/latest/ug/repos.html) contains two types of packages:
    1. Those that were developed and published locally.
    2. Those that were cloned from the external [npmjs](https://www.npmjs.com/) repository.
5. Locally developed packages belong to the `@winglibs` [NPM Namespace](https://docs.npmjs.com/about-scopes). At the moment, this is a requirement determined by how the [Winglang import system](https://www.winglang.io/docs/language-reference#41-imports) works.
6. The remote EC2 desktop instance is configured to use the AWS CodeArtifact [Repository](https://docs.aws.amazon.com/codeartifact/latest/ug/repos.html) as its [NPM Registry](https://docs.npmjs.com/cli/v8/using-npm/registry) using a temporary session token valid for 12 hours.
7. As a developer, I communicate with my remote desktop using the [VS Code Remote](https://code.visualstudio.com/docs/remote/ssh) feature,  described in the [previous publication](https://medium.com/aws-in-plain-english/simplifying-remote-cloud-based-development-connections-58a7b7539cc5).

I found this arrangement suitable for a solo developer and researcher. A real organization, even of a middle size, will require some substantial adjustments — subject to further investigation.

Let’s now look at some technical implementation details.

## Cloud Resources Allocation

Using Cloud Formation templates is always my preferred option. In this case, I created two simple Cloud Formation templates. One for creating an [AWS CodeArtifact Domain](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codeartifact-domain.html) resource:

```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "Template to create a CodeArtifact Domain; to be a part of platform template",
    "Resources": {
        "ArtifactDomain": {
            "Type" : "AWS::CodeArtifact::Domain",
            "Properties" : {
                "DomainName" : "o-4e7dgfcrpx-platform"
            }
        }
    }
}
```

And another - for creating an [AWS CodeArtifact Repository](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codeartifact-repository.html) resource:

```json
{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "Template to create a CodeArtifact repository; to be a part of account template",
    "Resources": {
        "ArtifactRespository": {
            "Type" : "AWS::CodeArtifact::Repository",
            "Properties" : {
                "Description" : "artifact repository for this <winglang> account",
                "DomainName" : "o-4e7dgfcrpx-platform",
                "RepositoryName": "winglang-artifacts", 
                "ExternalConnections" : [ "public:npmjs" ]
              }
          }
    }
}
```

These templates are mere placeholders for future, more serious, development.

The same could be achieved with [Winglang](https://github.com/winglang/wing), as follows:

https://gist.github.com/eladb/5e1ddd1bd90c53d90b2195d080397381

Many thanks to [Elad Ben-Israel](https://www.linkedin.com/in/hackingonstuff/) for bringing this option to my attention. Currently, the whole [MAPU](https://medium.com/@asher-sterkin/aws-mapu-65e888009916) system is implemented in Python and CloudFormation. Re-implementing it completely in [Winglang](https://github.com/winglang/wing) would be a fascinating case study.

## **Configuring npm with the login command**

I followed the [official guidelines](https://docs.aws.amazon.com/codeartifact/latest/ug/npm-auth.html#configure-npm-login-command) and created the following Bash script:

```bash
export CODEARTIFACT_AUTH_TOKEN=$(\
	aws codeartifact get-authorization-token \
	--domain o-4e7dgfcrpx-platform \
	--domain-owner 851725645964 \ 
	--query authorizationToken \
	--output text)
export REPOSITORY_ENDPOINT=$(\
	aws codeartifact get-repository-endpoint \
	--domain o-4e7dgfcrpx-platform \
	--domain-owner 851725645964 \
	--repository winglang-artifacts \
	--format npm \
	--query repositoryEndpoint \
	--output text)
export REGISTRY=$(echo "$REPOSITORY_ENDPOINT" | sed 's|https:||')
npm config set registry=$REPOSITORY_ENDPOINT
npm config set $REGISTRY:_authToken=$CODEARTIFACT_AUTH_TOKEN
```

Here is a brief description of the script’s logic:

1. Using the AWS CLI, retrieve an AWS CodeArtifact session token (valid for the next 12 hours).
2. Using the AWS CLI, the AWS CodeArtifact repository endpoint in a format compatible with NPM.
3. Use the NPM `config` command to set the endpoint.
4. Use the NPM `config` command to set up session authentication.

Placing this script in the `[/etc/profile.d](https://www.linuxfromscratch.org/blfs/view/11.0/postlfs/profile.html)` ensures that it will be automatically executed at every user login thus making the whole communication with AWS CodeArtifact instead of the official `[npmjs](https://docs.npmjs.com/cli/v8/using-npm/registry)` repository completely transparent for the end user.

## Publishing Custom Libraries

Implementing this operation while addressing my specific needs required a more sophisticated logic reflected in the following script:

```bash
#!/bin/bash
set -euo pipefail

# Function to clean up tarball and extracted package
cleanup() {
    rm *.tgz
    rm -fR package
}

# Function to calculate the checksum of a package tarball
calculate_checksum() {
    local tarball=$(ls *.tgz | head -n 1)
    tar -xzf "$tarball"
    cd package || exit 1
    local checksum=$(\
	    tar \
	    --exclude='$lib' \
	    --sort=name \
	    --mtime='UTC 1970-01-01' \
	    --owner=0 \
	    --group=0 \
	    --numeric-owner -cf - . | sha256sum | awk '{print $1}')
    cd ..
    cleanup
    echo "$checksum"
}

get_version() {
    PACKAGE_VERSION=$(jq -r '.version' package.json)
}

publish() {
    echo "Publishing new version: $PACKAGE_VERSION"
    npm publish --access public --tag latest *.tgz
    cleanup
    exit 0
}

# Step 1: Read the package version from package.json
get_version
PACKAGE_NAME=$(jq -r '.name' package.json)

# Step 2: Check the latest version in the npm registry
LATEST_VERSION=$(npm show "$PACKAGE_NAME" version 2>/dev/null || echo "")

# Step 3: Prepare wing package
wing pack

# Step 4: If the versions are not equal, publish the new version
if [[ "$PACKAGE_VERSION" != "$LATEST_VERSION" ]]; then
    publish
else
    CURRENT_CHECKSUM=$(calculate_checksum)
    # Download the latest package tarball
    npm pack "$PACKAGE_NAME@$LATEST_VERSION" > /dev/null 2>&1
    LATEST_CHECKSUM=$(calculate_checksum)
    # Step 5: Compare the checksums
    if [[ "$CURRENT_CHECKSUM" == "$LATEST_CHECKSUM" ]]; then
        echo "No changes detected. Checksum matches the latest published version."
        exit 0
    else
        echo $CURRENT_CHECKSUM
        echo $LATEST_CHECKSUM
        echo "Checksums do not match. Bumping patch version..."
        npm version patch
        wing pack
        get_version
        publish
    fi
fi
```

Here is a brief explanation of what happens in this script:

1. **Step 1:** Using the `[jq](https://jqlang.github.io/jq/)` command, extract the package name and version from the `package.json` file.
2. **Step 2:** Using the `[npm show](https://docs.npmjs.com/cli/v10/commands/npm-view)` command, extract the package version number from the registry.
3. **Step 3:** Using the `[wing pack](https://www.winglang.io/docs/libraries)` command, prepare the package .tgz file.
4. **Step 4:** If version numbers differ, publish the new version using the `[npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)` command.
5. **Step 5:** If the versions are equal, calculate the checksum for the current and most recently published package. If the checksum values are equal, do nothing. Otherwise, using the `[npm version patch](https://docs.npmjs.com/cli/v10/commands/npm-version)` command, automatically bump up the `[patch](https://symver.org/)` version number, rebuild the .tgz file, and publish the new version.

Reliable checksum validation was the most challenging part of developing this script. The `wing pack` command creates a special `@lib` folder within the resulting `.tgz` archive. This folder introduces some randomness and can be affected by several factors, including [Winglang](https://github.com/winglang/wing) compiler upgrades. Additionally, the `.tgz` file checksum calculation is sensitive to the order and timestamps of individual files. As a result, comparing the results of direct checksum calculation for the current and published packages was not an option. 

To overcome these limitations, new archives are created with the `@lib` folder excluded and file order and timestamps normalized. The assistance of the [ChatGPT 4o](https://openai.com/gpt-4) tool proved instrumental, especially in addressing this challenge.

In the current implementation, I keep this script in my home directory and invoke it from a common `[Build.mk](http://Build.mk)` Makefile used for all libraries (this might change in the future):

```makefile
.PHONY: all compile-deps build-ts prepare test publish

all: publish

update-deps:
	npm install && npm update

compile-ts: update-deps
ifneq ($(wildcard tsconfig.json),)
	@echo "tsconfig.json found, running tsc..."
	tsc
else
	@echo "tsconfig.json not found, skipping TypeScript compilation."
endif

test: compile-ts
	wing test -t sim ./test/*.test.w

publish: test
	~/publish-npm.sh

```

## Justification

To explain why I chose this particular way of publishing logic, I need to explain my overall project structure, illustrated in the diagram below:

<div style={{ textAlign: "center" }}>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*9bmBtM_oV0tZWUVeONgqtw.jpeg"/>
</div>

The top of the diagram above reflects the NMP packages involved and their dependencies are depicted at the top, while the bottom part reflects my project folder structure.

The `endor` package is the ultimate goal of this development activity: an exploratory middleware framework for the [Winglang](https://github.com/winglang/wing) programming language. Its efficacy is validated by a separate `todo.endor.w` application. Initially, both modules were kept together. However, keeping pure application parts separate from the infrastructure became progressively challenging.

The `endor` package uses three auxiliary packages `logging` , `exception`, and `datetimex`. These three packages are potential candidates to be contributed to the [Winglibs](https://github.com/winglang/winglibs) project. However, they are still under active experimentation and development and are kept within the same Github repository.

Additionally, the `endor` package depends on other packages published on the public `[npmjs](https://docs.npmjs.com/cli/v8/using-npm/registry)` registry. Some of these packages, such as `dynamodb` and `jwt` belong to the same `@winglibs` namespace, while others do not.

I face a mixed-case challenge: the system already has a modular structure, but all components are under intensive development, requiring instant propagation of changes. As a solo developer and researcher, I still do not need more sophisticated CI/CD solutions, but rather employ a master Makefile to pull everything together:

```makefile
.PHONY: all \
			  update_npm \
			  update_wing \
			  update_tsc \
			  make_datetimex \
			  make_exception \
			  make_logging \
			  make_endor

all:  update_wing make_endor

update_npm:
	sudo npm update -g npm

update_tsc: update_npm
	sudo npm update -g tsc

update_wing: update_tsc
	sudo npm update -g winglang

make_datetimex:
	$(MAKE) -C ./datetimex -f ../Build.mk

make_logging: make_datetimex
	$(MAKE) -C ./logging -f ../Build.mk

make_exception:
	$(MAKE) -C ./exception -f ../Build.mk

make_endor: make_exception make_logging
	$(MAKE) -C ./endor -f ../Build.mk
```

The `todo.endor.w` Makefile looks like this:

```makefile
.PHONY: all update_wing install_endor test_local 

cloud ?= aws
target := target/main.tf$(cloud)

update_npm:
	sudo npm update -g npm

update_wing: update_npm
	sudo npm update -g winglang

install_endor:
	npm install && npm update

build_ts: 
	tsc

test_local: update_wing install_endor build_ts test_app

test_app:
	wing test -t sim ./test/*.w

test_remote:
	wing test -t tf-$(cloud) ./test/service.test.w

run_local:
	wing run -t sim ./dev.main.w

compile:
	wing compile ./main.w -t tf-$(cloud)

tf-init: compile
	( \
		cd $(target) ;\
		terraform init \
	)

deploy: tf-init
	( \
		cd $(target) ;\
		terraform apply -auto-approve \
	)

destroy:
	( \
		cd $(target) ;\
		terraform destroy -auto-approve \
	)
```

This arrangement allows me to keep modules isolated, make changes in several places where appropriate, and perform fully automated build and verification without needing manual version updates within multiple `package.json` files.

Specifying cross-package dependencies is another point to pay attention to. Here is the `endor` package specification:

```makefile
{
  "name": "@winglibs/endor",
  "description": "Wing middleware framework library",
  "repository": {
    "type": "git",
    "url": "https://github.com/asterkin/endor.w.git",
    "directory": "endor"
  },
  "version": "0.0.19",
  "author": {
    "email": "asher.sterkin@gmail.com",
    "name": "Asher Sterkin"
  },
  "license": "MIT",
  "peerDependencies": {
    "@authenio/samlify-node-xmllint": "2.x.x",
    "@winglibs/dynamodb": "0.x.x",
    "@winglibs/jwt": "0.x.x",
    "qs": "6.x.x",
    "samlify": "2.x.x",
    "ws": "8.x.x",
    "inflection": "3.x.x",
    "@winglibs/exception": "0.x.x",
    "@winglibs/logging": "0.x.x"
  }
}
```

Notice that, unlike traditional formats, all dependencies are specified using the `x` placeholder without the leading `^` symbol. This is because, with the `^` prefix included, the most up-to-date versions are brought in only for the final `todo.endor.w` application, whereas I needed them to be used in the dependent modules' unit tests. Using the `x` placeholder instead does the job.

In summary, while not final, the described solution provides good enough treatment for all essential requirements at the current stage of the system evolution. As the system grows, adequate adjustments will be implemented and reported. Stay tuned.

# Acknowledgments

Throughout the preparation of this publication, I utilized several key tools to enhance the draft and ensure its quality. 

The initial draft was crafted with the organizational capabilities of [Notion](https://www.notion.so/)'s free subscription, facilitating the structuring and development of ideas.

For grammar and spelling review, the free version of [Grammarly](https://app.grammarly.com/) proved useful for identifying and correcting basic errors, ensuring the readability of the text.

The enhancement of stylistic expression and the narrative coherence checks were performed using the paid version of [ChatGPT 4o](https://openai.com/gpt-4). The [ChatGPT 4o](https://openai.com/gpt-4) tool was also used for developing the package publishing script and creation of NMP elements icons.

While these advanced tools and resources significantly contributed to the preparation process, the concepts, solutions, and final decisions presented in this article are entirely my own, for which I bear full responsibility.