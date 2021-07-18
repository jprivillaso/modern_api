import { mocked } from 'ts-jest/utils';
import Logger from 'bunyan';
import { Connection } from 'amqplib/callback_api';

import { consumeMessage, createChannel, getConnection } from '../src/clients/rabbitMQ';
import { init } from '../src/index';
import { getLogger } from '../src/services/logger';

mocked(getLogger).mockImplementation((): Logger => ({
  info: jest.fn(),
  error: jest.fn()
} as unknown as Logger));

jest.mock('../src/clients/postgres');
jest.mock('../src/clients/rabbitMQ');
jest.mock('../src/services/logger');
jest.mock('../src/services/dataSync');

const mockGetConnection = mocked(getConnection).mockResolvedValue({} as Connection);
const mockCreateChannel = mocked(createChannel);
const mockConsumeMessage = mocked(consumeMessage);

describe('Main function tests', () => {
  test('Should fail if environment variables are not set', async () => {
    try {
      await init();
    } catch (error) {
      expect(error.message).toEqual('QUEUE_TO_CONSUME is missing.');
    }

    expect(mockGetConnection).not.toBeCalled();
    expect(mockCreateChannel).not.toBeCalled();
    expect(mockConsumeMessage).not.toBeCalled();
    expect.assertions(4);
  });

  test('Should create channel and consume messages', async () => {
    process.env.QUEUE_TO_CONSUME = 'increment';
    await init();

    expect(mockGetConnection).toBeCalled();
    expect(mockCreateChannel).toBeCalled();
    expect(mockConsumeMessage).toBeCalled();
  });
});
