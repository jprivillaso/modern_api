import amqp, { Connection, Channel } from 'amqplib/callback_api';
import { getLogger } from '../services/logger';

export const getConnection = (): Promise<Connection> => new Promise((resolve, reject) => {
  const user = process.env.RABBITMQ_USER;
  const pwd = process.env.RABBITMQ_PWD;

  if (!user || !pwd) {
    throw new Error('Environment variables missing: RABBITMQ_USER or RABBITMQ_PWD');
  }

  const host = process.env.MESSAGE_BROKER_URL ?? 'amqp://localhost';
  getLogger().info(`Connecting to message broker at ${host}`);

  const opt = { credentials: amqp.credentials.plain(user, pwd) };
  amqp.connect(host, opt, (error, connection) => {
    if (error) {
      reject(error);
    }

    resolve(connection);
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

export const consumeMessage = async (channel: Channel, queueName: string, onMessage: any) => {
  channel.consume(queueName, onMessage, {
    noAck: true
  });
}
