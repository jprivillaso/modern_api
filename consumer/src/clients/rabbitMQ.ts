import amqp, { Connection, Channel } from 'amqplib/callback_api';
import { getLogger } from '../services/logger';

const MAX_CONNECTION_RETRY = 5;

const sleep = (
  time: number
): Promise<void> => new Promise(resolve => setTimeout(() => { resolve(); }, time));

export const getConnection = (
  retries?: number
): Promise<Connection> => new Promise((resolve, reject) => {
  const user = process.env.RABBITMQ_USER;
  const pwd = process.env.RABBITMQ_PWD;

  if (!user || !pwd) {
    throw new Error('Environment variables missing: RABBITMQ_USER or RABBITMQ_PWD');
  }

  const host = process.env.MESSAGE_BROKER_URL ?? 'amqp://localhost';
  getLogger().info(`Connecting to message broker at ${host}`);

  const opt = { credentials: amqp.credentials.plain(user, pwd) };
  amqp.connect(host, opt, async (error, connection) => {
    if (error) {
      if (!retries || retries < MAX_CONNECTION_RETRY) {
        getLogger().info('Connection not ready. Retrying once again in 5 seconds ...');
        await sleep(5000);
        const connectionAfterRetry = await getConnection(retries ? retries + 1 : 1);
        if (connectionAfterRetry) resolve(connectionAfterRetry);
      } else {
        reject(error);
      }
    } else {
      getLogger().info('Connected to RabbitMQ!');
      resolve(connection);
    }
  });
});

export const createChannel = async (
  connection: Connection
): Promise<Channel> => new Promise((resolve, reject) => {
  connection.createChannel((error, channel) => {
    if (error) {
      reject(error);
    } else {
      resolve(channel);
    }
  });
});

export const consumeMessage = (
  channel: Channel,
  queueName: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onMessage: any
): void => {
  channel.consume(queueName, onMessage, {
    noAck: true
  });
};
