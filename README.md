# Wing Documentation Website

This repository hosts the documentation website for Wing ([docs.winglang.io](https://docs.winglang.io)).

## Development Environment

It is built using [Docusaurus 2](https://docusaurus.io/), a modern and awesome
static website generator.

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

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## License

This repository is licensed under the [MIT License](./LICENSE.md).