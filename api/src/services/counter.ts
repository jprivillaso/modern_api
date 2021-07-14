import { Request, Response } from 'express';

import { INTERNAL_SERVER_ERROR, NOT_FOUND_MESSAGE, NOT_FOUND_ERROR } from '../commons/constants';
import { getLocalCounter, incrementLocalCounter } from '../data/localCounter';
import { sendMessageToBroker } from './messageBroker';

export const incrementCounter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key, value } = req.body;

    incrementLocalCounter(key, value);
    await sendMessageToBroker(JSON.stringify({ key, value }));

    res.send({ message: 'Item incremented' });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send({
      error: {
        message: error.message,
        status: INTERNAL_SERVER_ERROR
      }
    });
  }
};

export const getCounterValue = (req: Request, res: Response): void => {
  const currentCounter: number | undefined = getLocalCounter(req.params.key);

  if (currentCounter) {
    res.send({ data: currentCounter });
  } else {
    res.status(NOT_FOUND_ERROR).send({
      error: {
        message: NOT_FOUND_MESSAGE,
        status: NOT_FOUND_ERROR
      }
    });
  }
};
