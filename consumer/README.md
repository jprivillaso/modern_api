## Message Consumer

This service consumes messages from a queue. The queue name is specified via environment variables or uses a default
queue name called increment.

This service is meant to scale up horizontally. Spin up multiple instances of this service if you want to increase
your application's throughput.

If you want to scale up the consumers, just run this command

```
  docker-compose up --scale consumer=5 -d
```