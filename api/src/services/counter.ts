import { Request, Response } from 'express';

import { INTERNAL_SERVER_ERROR } from '../commons/constants';
import { sendMessageToBroker } from './messageBroker';

export const incrementCounter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key, value } = req.body;
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
