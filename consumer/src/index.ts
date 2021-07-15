import { consumeMessage, createChannel, getConnection } from "./clients/rabbitMQ";
import { postgresSynchronizer } from "./services/dataSync";

const QUEUE_TO_CONSUME = process.env.QUEUE_TO_CONSUME;

if (!QUEUE_TO_CONSUME) {
  throw new Error('QUEUE_TO_CONSUME is missing.')
}

(async () => {
  const connection = await getConnection();
  const channel = await createChannel(connection);
  consumeMessage(channel, QUEUE_TO_CONSUME, postgresSynchronizer)
})();
