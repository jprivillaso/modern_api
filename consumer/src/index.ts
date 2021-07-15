import { consumeMessage, createChannel, getConnection } from './clients/rabbitMQ';
import { postgresSynchronizer } from './services/dataSync';
import { getLogger } from './services/logger';

const { QUEUE_TO_CONSUME } = process.env;

if (!QUEUE_TO_CONSUME) {
  throw new Error('QUEUE_TO_CONSUME is missing.');
}

(async () => {
  const connection = await getConnection();

  if (connection) {
    const channel = await createChannel(connection);
    getLogger().info('Starting consuming messages from queue');
    consumeMessage(channel, QUEUE_TO_CONSUME, postgresSynchronizer);
  }
})();
