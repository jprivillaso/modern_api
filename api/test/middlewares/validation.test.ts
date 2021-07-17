import Logger from 'bunyan';
import { NextFunction, Request, Response } from 'express';
import { mockReset } from 'jest-mock-extended';

import { mocked } from 'ts-jest/utils';
import { BAD_REQUEST_ERROR } from '../../src/commons/constants';
import paramsValidationMiddleware from '../../src/middlewares/validation';

import { getLogger } from '../../src/services/logger';

mocked(getLogger).mockImplementation((): Logger => ({
  info: jest.fn(),
  error: jest.fn()
} as unknown as Logger));

jest.mock('../../src/services/logger');

describe('Tests for parameters validation', () => {
  const mockResponse = {
    status: jest.fn().mockReturnValue({
      send: jest.fn()
    })
  } as unknown as Response;

  const mockNext = jest.fn() as NextFunction;

  afterEach(() => {
    mockReset(mockNext);
  });

  test('Should pass default validation', async () => {
    const mockRequest = {
      body: {
        key: 'Juan',
        value: 1
      }
    } as Request;

    const validationRules = {
      key: ['required'],
      value: ['required']
    };

    await paramsValidationMiddleware(validationRules)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalled();
  });

  test('Should pass string validation', async () => {
    const mockRequest = {
      body: {
        key: 'Juan',
        value: '1'
      }
    } as Request;

    const validationRules = {
      key: ['string', 'required'],
      value: ['string', 'required']
    };

    await paramsValidationMiddleware(validationRules)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalled();
  });

  test('Should pass number validation', async () => {
    const mockRequest = {
      body: {
        key: 1,
        value: 1
      }
    } as Request;

    const validationRules = {
      key: ['number', 'required'],
      value: ['number', 'required']
    };

    await paramsValidationMiddleware(validationRules)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalled();
  });

  test('Should not pass validation if payload is invalid', async () => {
    const mockRequest = {
      body: {
        key: 'Juan',
        value: '1'
      }
    } as Request;

    const validationRules = {
      key: ['number', 'required'],
      value: ['number', 'required']
    };

    await paramsValidationMiddleware(validationRules)(mockRequest, mockResponse, mockNext);

    expect(mockNext).not.toBeCalled();
    expect(mockResponse.status).toBeCalledWith(BAD_REQUEST_ERROR);
  });

  test('Should pass validation if rules are empty', async () => {
    const mockRequest = {
      body: {
        key: 'Juan',
        value: 1
      }
    } as Request;

    const validationRules = {};

    await paramsValidationMiddleware(validationRules)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toBeCalled();
  });
});
