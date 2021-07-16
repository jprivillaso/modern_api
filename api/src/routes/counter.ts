import express from 'express';

import { incrementCounter } from '../services/counter';
import logMiddleware from '../middlewares/log';
import paramsValidationMiddleware from '../middlewares/validation';
import { counterValidationRules } from './validation';

export const registerCounterRoutes = (api: express.Application): void => {
  api.post(
    '/increment',
    logMiddleware,
    paramsValidationMiddleware(counterValidationRules.post),
    incrementCounter
  );
};
