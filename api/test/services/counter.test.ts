import { Request, Response } from 'express';

import { incrementCounter } from '../../src/services/counter';

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
  });
});
