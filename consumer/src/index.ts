import { consumeMessage, createChannel, getConnection } from './clients/rabbitMQ';
import { postgresSynchronizer } from './services/dataSync';
import { getLogger } from './services/logger';

export const init = async (): Promise<void> => {
  const { QUEUE_TO_CONSUME } = process.env;

  if (!QUEUE_TO_CONSUME) {
    throw new Error('QUEUE_TO_CONSUME is missing.');
  }

  const connection = await getConnection();

  if (connection) {
    const channel = await createChannel(connection);
    getLogger().info('Starting consuming messages from queue');
    consumeMessage(channel, QUEUE_TO_CONSUME, postgresSynchronizer);
  } else {
    getLogger().error('Could not connect to RabbitMQ.');
  }
};

(async () => {
  await init();
})();
