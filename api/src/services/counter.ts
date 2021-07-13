import { Request, Response } from 'express';

import { NOT_FOUND, RESOURCE_NOT_FOUND } from '../commons/constants';
import { getLocalCounter, incrementLocalCounter } from '../data/localCounter';

export const incrementCounter = (req: Request, res: Response): void => {
  const { key, value } = req.body;
  incrementLocalCounter(key, value);
  res.send({ message: 'Item incremented' });
};

export const getCounterValue = (req: Request, res: Response): void => {
  const currentCounter: number | undefined = getLocalCounter(req.params.key);

  if (currentCounter) {
    res.send({ data: currentCounter });
  } else {
    res.status(RESOURCE_NOT_FOUND).send({
      error: {
        message: NOT_FOUND,
        status: RESOURCE_NOT_FOUND
      }
    });
  }
};
