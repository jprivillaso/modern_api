import { Request, Response } from 'express';
import { mocked } from 'ts-jest/utils';

import { incrementCounter } from '../../src/services/counter';
import { sendMessageToBroker } from '../../src/services/messageBroker';

mocked(sendMessageToBroker);
jest.mock('../../src/services/messageBroker');

describe('Tests for Counter Service', () => {
  test('Should call the queue properly', async () => {
    const mockRequest = {
      body: {
        key: 'Juan',
        value: 1
      }
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnValue({
        send: jest.fn()
      })
    } as unknown as Response;

    await incrementCounter(mockRequest, mockResponse);

    expect(sendMessageToBroker).toBeCalledWith(JSON.stringify({
      key: 'Juan',
      value: 1
    }));
  });
});
