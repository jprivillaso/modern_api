import { Message } from 'amqplib';
import { getClient, upsertCounter } from '../clients/postgres';
import { getLogger } from './logger';

export const postgresSynchronizer = async (message: Message | null): Promise<void> => {
  if (message) {
    getLogger().info('Received message');
    getLogger().info(JSON.parse(message.content.toString()));

    const pgClient = getClient();
    const { key, value } = JSON.parse(message.content.toString());
    await upsertCounter(pgClient, key, value);
  }
};
