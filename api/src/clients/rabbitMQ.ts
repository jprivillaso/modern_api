import amqp, { Connection, Channel } from 'amqplib/callback_api';

export const getConnection = (): Promise<Connection> => new Promise((resolve, reject) => {
  const user = process.env.RABBITMQ_USER;
  const pwd = process.env.RABBITMQ_PWD;

  if (!user || !pwd) {
    throw new Error('Environment variables missing: RABBITMQ_USER or RABBITMQ_PWD');
  }

  const opt = { credentials: amqp.credentials.plain(user, pwd) };

  const MESSAGE_BROKER_URL = process.env.MESSAGE_BROKER_URL ?? 'amqp://localhost';

  amqp.connect(MESSAGE_BROKER_URL, opt, (error, connection) => {
    if (error) {
      reject(error);
    }

    resolve(connection);
  });
});

export const closeConnection = (connection: Connection): void => {
  setTimeout(() => {
    connection.close();
  }, 500);
};

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
