import { Request, Response } from 'express';

import { NOT_FOUND, RESOURCE_NOT_FOUND } from '../commons/constants';
import { getLocalCounter, incrementLocalCounter } from '../data/localCounter';
import { sendMessageToBroker } from './messageBroker';

export const incrementCounter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key, value } = req.body;

    incrementLocalCounter(key, value);
    await sendMessageToBroker(JSON.stringify({ key, value }));

    res.send({ message: 'Item incremented' });
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        status: 500
      }
    });
  }
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
