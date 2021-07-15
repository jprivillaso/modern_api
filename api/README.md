## API

### Pre-requistes

Before using the API properly, we need to create a RabbitMQ user.

Execute the following commands

```

docker exec -it modern_api_rabbitmq_1 /bin/bash
rabbitmqctl add_vhost /
rabbitmqctl add_user test test
rabbitmqctl set_user_tags test administrator
rabbitmqctl set_permissions -p / test ".*" ".*" ".*"

```

Future Work:

- Create a DLQ for failing messages
- Handle RabbitMQ connections in a better manner
- Create a better design in terms of which data source to use for returning the counters
- Using a config manager to inject the environment variables in a different manner so that they are not hardcoded in the repo
