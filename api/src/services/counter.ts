import { Request, Response } from 'express';
import { NOT_FOUND, RESOURCE_NOT_FOUND } from '../commons/constants';
import { getLogger } from './logger';

const counter = new Map<string, number>();

export const incrementCounter = (req: Request, res: Response): void => {
  const { key, value } = req.body;

  if (counter.has(key)) {
    counter.set(key, counter.get(key) + value);
  } else {
    counter.set(key, value);
  }

  res.send({ message: 'Item incremented' });
};

export const getCounterValue = (req: Request, res: Response): void => {
  if (counter.has(req.params.key)) {
    getLogger().info(`found value ${req.params.key}`);
    res.send({ data: counter.get(req.params.key) });
  } else {
    res.status(RESOURCE_NOT_FOUND).send({
      error: {
        message: NOT_FOUND,
        status: RESOURCE_NOT_FOUND
      }
    });
  }
};
