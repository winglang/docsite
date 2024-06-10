# Wing Documentation Website

This repository hosts the documentation website for Wing ([docs.winglang.io](https://docs.winglang.io)).

## Development Environment

It is built using [Docusaurus 2](https://docusaurus.io/), a modern and awesome static website generator.

### Installation

```
$ npm install
```

### Local Development

Copy the `.env.example` to `.env`:

```
$ cp .env.example .env
```

And fill it with the proper values. Then:

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

### Index new content

We have an automated crawler (by Algolia) every day at 15:00 UTC that indexes the documentation website.

Every merge to the `main` branch triggers a new crawler indexing.

If for some reason there is a need to trigger the crawler manually, follow these steps:
1. update the local .env file with the proper values (see in 1Password "Algolia Crawler").
2. run the following command:
```
npm run reindex
```

## License

This repository is licensed under the [MIT License](./LICENSE.md).
