<div align="center">

  <img
    height="80"
    width="80"
    alt="ram"
    src="./app/public/logo.png"
  />

<h1>QuackGo</h1>
</div>

This is a very simple search engine front and back-end using [DuckDuckGo](https://duckduckgo.com/) limited API.

| Home                         | Search                           |
| ---------------------------- | -------------------------------- |
| ![Home Page](/docs/Home.png) | ![Search Page](/docs/Search.png) |

## Features

- Home screen with nice logo;
- A search page, with parameters on the URL;
- A history/recent queries side navigation;
- E2E testing.

## Development

```sh
npm install

# Front-end
npm run dev -w app

# Back-end
npm run start:dev -w server
```

Front-end will be available in https://localhost:3000, and Back-end at http://localhost:8000

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Unit Testing

Both projects implements unit testing, using [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), and [NestJS](https://nestjs.com/) tooling.

```sh
# Front-end
npm run test -w app

# Back-end
npm run test -w server
```

### E2E Testing

The project uses [Cypress](https://www.cypress.io/) for E2E testing, you can execute with the following:

```sh
# With UI
npm run test:e2e:open -w app

# Headless
npm run test:e2e -w app
```

### Postman collection and environment

You can find a [Postman](https://www.postman.com/downloads/) collection to export at [postman](./postman) folder. While not much, it's always useful to organize application endpoints.

## Design choices

According to this [thread](https://stackoverflow.com/questions/37012469/duckduckgo-api-getting-search-results), the endpoint used here is a limited API, without proper search results.
To circumvent that, the back-end parses the RelatedTopics field on DuckDuckGo API to return something usable. Unfortunately all links point to their website.

NestJS is a nice Node.js framework to use, even if this project just uses one endpoint. The back-end implements pagination, but in a odd way. Since the limited API returns all RelatedTopics in one go, every single query already fetchs all data, so the back-end splits that data into pages and deliver to the front-end.

For Front-end, the project uses Material UI and Tailwind to mimick DuckDuckGo design, implementing a "recent queries" or history with browser's localStorage.

## Exaustive dependencies list

- React, Material UI, Tailwind;
- Axios, SWR;
- Vite;
- Vitest, React Testing Library, Cypress;
- NestJS.