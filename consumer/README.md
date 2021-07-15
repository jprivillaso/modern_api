## Message Consumer

This service consumes messages from a queue. The queue name is specified via environment variables.
This service is meant to scale up horizontally. Spin up multiple instances of this service if you want to increase
your application's throughput.