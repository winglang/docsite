---
title: Development
id: development
keywords: [Wing contributors, contributors, workflows]
---

This topic includes a description of common development workflows for the Wing project.

## How to prepare for take-off? 🐤

:::info
You can open up this repo by clicking the badge below. It is recommended to select a 4-core minimum machine.
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/winglang/wing)
:::

:::info
For windows we recommend to set the tools up within WSL as some of the scripts 
don't support windows and expect unix tooling.

Some Guides:
- [💡 Setup WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command)
- [💡 Setup build essentials for rust](https://stackoverflow.com/questions/52445961/how-do-i-fix-the-rust-error-linker-cc-not-found-for-debian-on-windows-10)
- [💡 Enable systemd to install docker without the need of Docker Desktop](https://devblogs.microsoft.com/commandline/systemd-support-is-now-available-in-wsl/#how-can-you-get-systemd-on-your-machine)
:::

Here is a list of minimal tools you should install to build the Wing repo in your development
environment:

- [Node.js] v20 and [PNPM] v8
  - We recommend [volta] to manage node tools
- [Rust]
  - We recommend using [rustup] to manage your Rust installation if Rust is not already installed. Be careful of conflicting Rust installations (homebrew rust and rustup)
- [AWS CLI]
  - Only needed for integration tests - make sure to do the setup part to create credentials
- [Terraform CLI]
  - Only needed for integration tests
- [Docker]
  - Needed to build the grammar as WASM for the web-based playground and to run unit tests

Verify versions (any compatible version will do):

```sh
$ node --version
v20.17.0
```

```sh
$ pnpm --version
8.15.1
```

```sh
$ rustc --version
rustc 1.82.0 (f6e511eec 2024-10-15)
```

Installation:

```sh
git clone https://github.com/winglang/wing
cd wing
pnpm install
```

:::note Turbo Commands
[Turbo] commands in this document are structured as

```sh
turbo <task>
# or
turbo <task> -F <project> -- <args>
```

- `pnpm turbo` can be used instead if [Turbo] is not installed globally
- `-F <project>` may be used to filter to a specific project (and it's dependencies)
- Running `turbo <task>` inside of a project directory will automatically filter to that project
- We use [Turbo caching](https://turbo.build/repo/docs/core-concepts/caching) to speed up builds. If you want to force a rebuild, use `--force`.

:::

[Turbo]: https://turbo.build/repo
[Node.js]: https://nodejs.org/en/
[Rust]: https://www.rust-lang.org/
[rustup]: https://rustup.rs/
[AWS CLI]: https://aws.amazon.com/cli/
[Terraform CLI]: https://learn.hashicorp.com/terraform/getting-started/install.html
[volta]: https://volta.sh
[PNPM]: https://pnpm.io
[Docker]: https://docs.docker.com/get-docker/

## Full build

If you wish to perform a full build (similar to the one CI is running), just run this from the root:

```sh
pnpm build
```

It will compile, lint, test and package all modules.

## What's the recommended development workflow? 🏠

The `pnpm wing` command can be executed from the *root of the repository* in order to build
everything and run Wing CLI. Turbo is configured to make sure only the changed components are built
every time.


:::info
To get full diagnostics, use these exports:

```sh
export NODE_OPTIONS=--stack-trace-limit=100
export RUST_BACKTRACE=full
```
:::

Now, you can edit a source file anywhere across the stack and run the compiler with arguments.
For example:

```sh
pnpm wing -- test tests/valid/captures.test.w
```

This command runs the full Wing CLI with the given arguments. Turbo will ensure the CLI build is updated.

:::info
When testing your changes to Wing locally it may be helpful to be able to easily invoke your local version of the Wing CLI.

First, you need to compile changes:

```sh
npx turbo compile -F winglang
```

Then, run the Wing CLI binary directly:

```sh
./packages/winglang/bin/wing
```

Pro tip: create a shell alias: 

`alias mywing=/<PATH_TO_WING_REPO>/packages/winglang/bin/wing` to your shell's rc file.
:::

## How is the repository structured?

The Wing repository is structured as a monorepo, which means that it contains multiple packages.
Most of the packages are inside the `packages` folder. Each has a README explaining what it does
and how to use it. (If you see one missing, please open an issue and let us know!)

The Wing monorepo uses [Turbo] to run commands across all code packages in the `packages`
folder. This means it includes packages that form the entire toolchain (compiler, standard library, IDE
extension, etc), and the build and release bind them all together.

Turbo will be installed alongside the rest of the project's dependencies after you run `pnpm install`
from the root directory, and can be accessed with `pnpm turbo` if [Turbo] is not installed globally.

:::note

The first time you run `pnpm install` it may take extra time to install the
[wasi-sdk](https://github.com/WebAssembly/wasi-sdk) for you. This is needed to compile Wing for WASM.

If you wish to install it manually, you may do so by running `scripts/setup_wasi.sh`

:::

## How do I run tests? 🧪

End-to-end tests are hosted under `tools/hangar`. To get started, first ensure you can [build
wing](#-how-do-i-build-wing).

To run the tests (and update snapshots), run the following command from anywhere in the monorepo:

```sh
turbo wing:e2e
```

(This is a helpful shortcut for `turbo test -F hangar`)

To run a single test, use the `wing test` from the root and reference the test file name:

For example:

```sh
pnpm wing -- test tests/valid/optionals.test.w
```

### Test Meta-Comments

In your wing files in `examples/tests/valid`, you can add a specially formatted comment to add additional information for hangar.
Inside this comment, a yaml block will be read and used for several purposes.

Example:

```ts
/*\
skipPlatforms:
  - win32
  - darwin
\*/
```

Currently, the only supported meta-comment for regular tests is `skipPlatforms`.
This will skip the test on the given platforms when when running on CI. The current supported platforms are `win32`, `darwin`, and `linux`.
This is useful if, for example, the test requires docker. In our CI only linux supports docker.

## Performance Benchmarks

Benchmark files are located in `examples/tests/valid/benchmarks`. To run the benchmarks, run the following command from anywhere in the monorepo:

```sh
turbo wing:bench
```

(This is a helpful shortcut for `turbo bench -F hangar`)

In CI, if these benchmarks regress too far from the current `main` branch, the build will fail.

## How do I work only on the compiler?

The following command runs the rust tests in wingc, including verification that valid tests compile, invalid tests do not compile, and none of them panic.

It will also make sure to update any snapshots.

```sh
turbo test -F @winglang/wingc
```

The following command runs `wingc` on a file. This performs all the compilation steps. Run from the root.

```sh
pnpm wing -- compile <path to a .w file (full path, or relative to the location of the packages/winglang folder)>
```

You can find the compilation artifacts in the `packages/winglang/target` folder.

To check that your code passes all the lints, run:

```sh
turbo lint -F @winglang/wingc
```

### Optional VSCode extensions for working on the compiler

You can show clippy errors in your IDE by installing the [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) extension and setting the option "Rust-analyzer › Check: Command" to "clippy" instead of "check".

The [insta](https://marketplace.visualstudio.com/items?itemName=mitsuhiko.insta) extension allows you to view snapshots in the tests files.

## How do I debug the Wing compiler on VSCode?

To debug the Rust compiler on VSCode, first you need to install the [CodeLLDB extension](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb).<br/>
Next, you can use the `Debug Wing Compiler` launch configuration available on our [launch.json](https://github.com/winglang/wing/blob/main/.vscode/launch.json).

Open the `.w` file you wish to debug compilation for (e.g. `${workspaceFolder}/examples/tests/valid/hello.w`) and hit F5 to start debugging.

## How do I make changes to the Wing grammar?

After making changes to `grammar.js`, run:

```sh
turbo compile -F @winglang/tree-sitter-wing
```

To run the grammar tests (that are located in the `test` folder):

```sh
turbo test -F @winglang/tree-sitter-wing
```

To use the wasm grammar to run a web-based playground where you can explore the AST and test out
highlight queries, run:

```sh
turbo playground -F @winglang/tree-sitter-wing
```

## How do I build the VSCode extension? 🔨

The VSCode extension is located in `packages/vscode-wing`. Most of the "logic" is in the language server, which
is located in the Wing CLI at `packages/winglang/src/commands/lsp.ts`.

To compile the extension (also creates an installable `.vsix` file):

```sh
turbo compile -F vscode-wing
```

To run a new isolated VSCode instance with the extension installed:

```sh
turbo dev -F vscode-wing
```

To modify the package.json, make sure to edit `.projenrc.ts` and rebuild.

Tip: if you want to print debug messages in your code while developing, you should use Rust's `dbg!` macro, instead of `print!` or `println!`.

## How do I lint my code? 🧹

To lint Rust code, you can run the `lint` target on the `wingc` or `wingii` projects:

```sh
turbo lint -F @winglang/wingc
```

It's also possible to lint by running `cargo clippy` directly.

Lastly you can show linting errors in your IDE by enabling the following setting in the rust-analyzer extension:

```json
// in your VS Code settings
"rust-analyzer.check.command": "clippy",
```

## How do I add a quickstart template to the `wing` CLI? 🏁

Adding a new template is straightforward!

Each template is represented by a folder located at [project-templates](https://github.com/winglang/wing/tree/main/packages/winglang/project-templates), containing all of the files that template should be initialized with.

Create a new folder with the template name, and insert any code files that are needed to run it.
Unit tests ran with `turbo test` (or in GitHub Actions once you make a pull request) will automatically validate that the template is valid.
