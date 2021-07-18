import { Channel, Connection } from 'amqplib/callback_api';
import { mocked } from 'ts-jest/utils';
import Logger from 'bunyan';

import { closeConnection, createChannel, getConnection } from '../../src/clients/rabbitMQ';
import { sendMessageToBroker } from '../../src/services/messageBroker';

import { getLogger } from '../../src/services/logger';

mocked(getLogger).mockImplementation((): Logger => ({
  info: jest.fn(),
  error: jest.fn()
} as unknown as Logger));

jest.mock('../../src/services/logger');
jest.mock('../../src/clients/rabbitMQ');

mocked(getConnection).mockResolvedValue({} as Connection);

describe('Tests for RabbitMQ message broker', () => {
  test('Should send the message to default queue', async () => {
    const mockChannel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn()
    } as unknown as Channel;

    mocked(createChannel).mockResolvedValue(mockChannel);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mocked(closeConnection).mockImplementation(() => {});

    await sendMessageToBroker('Fake msg');
    expect(mockChannel.assertQueue).toBeCalled();
    expect(mockChannel.sendToQueue).toBeCalledWith('increment', Buffer.from('Fake msg'));
  });

  test('Should send the message to specific queue', async () => {
    const mockChannel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn()
    } as unknown as Channel;

    mocked(createChannel).mockResolvedValue(mockChannel);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    mocked(closeConnection).mockImplementation(() => {});

    process.env.MESSAGE_BROKER_QUEUE_NAME = 'myQueue';
    await sendMessageToBroker('Fake msg');
    expect(mockChannel.assertQueue).toBeCalled();
    expect(mockChannel.sendToQueue).toBeCalledWith('myQueue', Buffer.from('Fake msg'));
  });
});
