# Modern API

Modern API is an API that increment counters based on a key and a value. Then, these values are inserted into a PostgreSQL
database.

This application is composed of different services

- RabbitMQ service

- PostgreSQL service

- API service

- Consumer service

The first two services are dependencies that must be running. They are single instances without replicas. Ideally,
we would need different replicas that we can spin up if something goes wrong.

[Here](./api) is the API's full description.

[Here](./consumer) is the Queue's consumer full description.

## Prerequisites

- Docker & Docker compose
- Nodejs & npm

## Run the project

```
  docker-compose up -d
```

Or if you have a unix based OS, you can run

```
  make run
```