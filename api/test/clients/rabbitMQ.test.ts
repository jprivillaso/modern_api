import amqp, { Connection, Options } from 'amqplib/callback_api';
import Logger from 'bunyan';
import { mocked } from 'ts-jest/utils';

import { closeConnection, createChannel, getConnection } from '../../src/clients/rabbitMQ';
import { getLogger } from '../../src/services/logger';

mocked(getLogger).mockImplementation((): Logger => ({
  info: jest.fn(),
  error: jest.fn()
} as unknown as Logger));

jest.mock('../../src/services/logger');

const mockedAMQP = mocked(amqp);

jest.mock('amqplib/callback_api', () => ({
  connect: jest.fn().mockImplementation((
    _host: string,
    _opt: Options.Connect,
    callback: any
  ) => {
    callback(undefined, {});
  }),
  credentials: {
    plain: jest.fn().mockReturnValue({ user: 'user1', password: 'pwd1' })
  }
}));

describe('RabbitMQ client tests', () => {
  test('Should fail if environment variables are missing', async () => {
    let connection;
    try {
      connection = await getConnection();
    } catch (error) {
      expect(error.message).toEqual('Environment variables missing: RABBITMQ_USER or RABBITMQ_PWD');
    }
    expect(connection).toBeUndefined();
    expect.assertions(2);
  });

  test('Should pass if environment variables are set', async () => {
    process.env.RABBITMQ_USER = 'user1';
    process.env.RABBITMQ_PWD = 'pwd1';
    const connection = await getConnection();

    expect(mockedAMQP.connect).toBeCalledWith(
      'amqp://localhost',
      {
        credentials: {
          user: 'user1',
          password: 'pwd1'
        }
      },
      expect.any(Function)
    );

    expect(connection).not.toBeUndefined();
  });
});

describe('RabbitMQ channel tests', () => {
  test('Should create channel', async () => {
    const mockConnection = {
      createChannel: jest.fn().mockImplementation((callback: any) => {
        callback(undefined, {});
      })
    } as unknown as Connection;

    await createChannel(mockConnection);
    expect(mockConnection.createChannel).toBeCalled();
  });
});

describe('RabbitMQ channel tests', () => {
  test('Should close the connection', async () => {
    const mockConnection = {
      close: jest.fn()
    } as unknown as Connection;

    jest.useFakeTimers();
    await closeConnection(mockConnection);
    jest.runAllTimers();

    expect(mockConnection.close).toBeCalled();
  });
});
