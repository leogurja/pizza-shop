# Pizza Shop

This app was built as an exercise for a course @ [Rocketseat](http://rocketseat.com.br)

## Running Locally

This project consumes a local api, which depends on [Bun](https://bun.sh/docs/installation), [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
After installing those dependencies, run:

```sh
npm run api:setup
```

Afterwards, you can run the server using

```sh
npm i
npm run dev & npm run dev:api
```

## Testing

This app uses Vitest and Playwright to run tests.
To run tests, first you need to run

```sh
npm run test:setup
```

This will install the binaries for Playwright.

Finally, use the following commands to run the tests:

```sh
npm test # runs Vitest
npm test:e2e # runs Playwright
```
