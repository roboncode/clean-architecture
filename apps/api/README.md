# Server API

This is an example of a web service consuming the business logic and presenting the output as JSON using REST. 

## Usage

```sh
pnpm serve
```

> The service runs on http://localhost:3000

### API

- Random numbers - http://localhost:3000/trivia
- Concrete numbers - http://localhost:3000/trivia?number=1

## Presentation

The service uses [Fastify](https://www.fastify.io/) for the web framework but have been [Express](https://expressjs.com/) or another web framework.

## Business Logic

In order for the server to use the business logic, the following items were added:

- `data/adapters/HttpClient` - an HttpClient adapter using [axios](https://axios-http.com/docs/intro) in order to perform calls to the external API
- `data/network/NetworkInfo` - a NetworkInfo adapter using [axios](https://axios-http.com/docs/intro) to test connectivity
- `data/storage/SQLiteStorage` - a Storage adapter using SQLite as the database.

