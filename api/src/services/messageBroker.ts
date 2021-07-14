import { closeConnection, createChannel, getConnection } from '../clients/rabbitMQ';
import { getLogger } from './logger';

export const sendMessageToBroker = async (message: string): Promise<void> => {
  const MESSAGE_BROKER_QUEUE_NAME = process.env.MESSAGE_BROKER_QUEUE_NAME ?? 'increment';

  try {
    console.log('get connection');

    const connection = await getConnection();

    console.log('connection ok');

    const channel = await createChannel(connection);

    console.log('channel ok');

    channel.assertQueue(MESSAGE_BROKER_QUEUE_NAME, {
      durable: false
    });

    channel.sendToQueue(MESSAGE_BROKER_QUEUE_NAME, Buffer.from(message));

    getLogger().info(`Message successfully sent: ${message}`);

    await closeConnection(connection);
  } catch (error) {
    throw error;
  }
};
