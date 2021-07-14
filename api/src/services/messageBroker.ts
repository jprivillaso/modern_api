import { closeConnection, createChannel, getConnection } from '../clients/rabbitMQ';
import { getLogger } from './logger';

export const sendMessageToBroker = async (message: string): Promise<void> => {
  try {
    const MESSAGE_BROKER_QUEUE_NAME = process.env.MESSAGE_BROKER_QUEUE_NAME ?? 'increment';

    const connection = await getConnection();
    const channel = await createChannel(connection);

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
