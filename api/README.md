## API

This is a Node/Express API that receives requests to increment a counter given a key and some value.

Once the API receives the request, it validates the parameters and uses a RabbitMQ queue to synchronize the messages to a
PostgreSQL database.

Please run this service with the docker compose file at the root of the folder. Otherwise, it won't work due to required
environment variables.

The RabbitMQ queue will held, but if this service is not scaled up, it will limit the application's maximum throughput.

## Design Decisions

This service is not production ready. Although, with a minor tweak and a load balancer, you can configure this service
to receive requests under an ALB. The data synchronization works with eventual consistency, which means that eventually,
after a few seconds, the messages will reach the PostgreSQL database.

## Future Work for this API

- Create a DLQ for failing messages.
- Handle RabbitMQ connections in a better manner.
- Encrypt passwords and handle sensitive information in a better manner.
- Using a config manager to inject the environment variables so that they are not hardcoded in the repository.
