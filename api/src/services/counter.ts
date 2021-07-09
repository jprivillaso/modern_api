import { Request, Response } from 'express';

export const incrementCounter = (_: Request, res: Response): void => {
  res.send({ message: 'Item incremented' });
};
