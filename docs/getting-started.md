---
sidebar_position: 1
---

# Getting Started

Wing is a new way of writing cloud applications, designed to provide the best possible developer experience by utilizing a purpose-built language, sdk, and cli tool.

## Pre-requisites

You will need to have NodeJS installed first. We recommend using [NVM](https://github.com/nvm-sh/nvm) to install NodeJS on your local development machine.

## Private Repository Access

Wing is currently in private access, which means the code and package repositories are not publicly available and access is only available with authentication. 

To get your local environment access to the repositories you will need to set up NPM with an authentication token. Start by creating a Personal Access Token (PAT) following these steps:

1. Sign in to GitHub.
1. Click on your avatar in the upper right and choose `Settings` near the bottom.
1. On the left-hand menu, go to the very bottom and select `Developer settings`
1. On the left-hand menu, select `Personal access tokens`.
1. Click the `Generate new token` button at the top.
   1. Enter a token description. e.g. `Wing package access`.
   1. Choose an expiration time, 30 days is default but will require you to repeat this process in 30 days.
   1. Select `read:packages` in the third section. This is the only access your PAT needs.
   1. Click `Generate token`.

A new PAT will be created and displayed, starting with `ghp_`. Save this value as you will need it for the next steps, and it will not be available again if you navigate away from this page.

:::note
Full instructions can be found [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
:::

Next, you will add this PAT to your NPM configuration by following these steps:

1. Open your favorite terminal.
2. Run this command:
   `npm login --scope=@monadahq --registry=https://npm.pkg.github.com`
   1. For a `Username`, enter your GitHub username.
   1. For the `Password`, enter your PAT from the previous steps.
   1. Enter your email. This can be any public email and doesn't have to be the one tied to your GitHub account but please use the one tied to your Wing invite. 

:::note
Full instructions for setting up private registry access can be found [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).
:::

### Verify

You can test your configuration by going into any directory and running:

```shell
$ npm view @monadahq/polycons
```

If you get a successful result, then you have your system configured properly. If you receive a `code E404` error this means your system is not configured properly. Please review the steps above and if you're still having issues please join us on the [Discord](https://discord.gg/HEKYFXm6U6) server in the #help channel.

## Installing Wing

Get started by installing the Wing CLI. 

```shell
$ npm i -g @monadahq/wingman
```

## Starting a new project

Wing favors using [projen](https://projen.io) to create new projects.

```shell
$ npx projen new --from @monadahq/projen-typescript-project --name my-app 
```

This will create a new Wing project in your current directory.

## Writing your first app






