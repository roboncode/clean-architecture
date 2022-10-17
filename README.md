# Clean Architecture and Test Driven Development (TDD) using TypeScript

Examples on how to use Clean Architecture in applications using TypeScript.

![Clean Architecture Diagram](./images/clean_architecture.jpeg)

## What does the applications do?

The applications fetch number trivia from [Numbers API](http://numbersapi.com/#42) when connected to the internet (online). If the application detects a network connection is no longer present (offline), it will fetch the last trivia from a local cache. You can fetch
trivia from a number you provide or a random number provided by the API. Because this project was build using Clean Architecture, applications representing the Presentation layer can be built using framework. Applications built using [React.js](https://reactjs.org/) and [Vue.js](https://vuejs.org/) are provided.

![Application Example](./images/app_example.png)

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `apps/react`: a [React.js](https://reactjs.org/) app
- `apps/vue`: a [Vue.js](https://vuejs.org/) app
- `packages/business`: business logic demonstrating how to implement the `domain` and `data` layers of clean architecture.
- `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Presentation layer for apps

To demonstrate a clean presentation layer, the web applications use [Shoelace](https://shoelace.style/), a web component library built on [Lit](https://lit.dev/). Developing web components is a best practice when you want to apply the DRY (Don't repeat yourself) principle.


# Test Driven Development (TDD)

The demo was built using TDD ensuring all business logic passes and has coverage. Tests were built and tested using [Vitest](https://vitest.dev/). Vitest is built on top of [Jest](https://jestjs.io/). If you know Jest, you know Vitest. Vitest supports TypeScript by default.

![Code Coverage](./images/code_coverage.png)

Here is a great overview video on Vitest:

- https://www.youtube.com/watch?v=7f-71kYhK00


# Other


### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)


### Credits

*Project based on tutorials by [Matt Rešetár](https://resocoder.com/) using [Flutter](https://flutter.dev/)*