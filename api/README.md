## API

This is a Node/Express API that receives requests to increment a counter given a key and some value.

Once the API receives the request, it validates the parameters and uses a RabbitMQ queue to synchronize the messages to a
PostgreSQL database.

Please run this service with the docker compose file at the root of the folder. Otherwise, it won't work due to the required
environment variables.

## Design Decisions

This service is not production ready. It needs major security finetuning. However, it has an architecture that can be
used as a baseline for a potential production ready service.

The data synchronization works with eventual consistency, which means that eventually, after a few milliseconds,
the messages will reach the PostgreSQL database.

## Future Work for this API

- Create a DLQ for failing messages.

- Handle RabbitMQ connections in a better manner.

- Encrypt passwords and handle sensitive information in a better manner.

- Using a config manager to inject the environment variables so that they are not hardcoded in the repository.

## Rate Limit

This API only allows 20 requests per minute by default from the same IP to avoid overwhelming the service. Configure the
rate limit window and batch size via environment variables.
