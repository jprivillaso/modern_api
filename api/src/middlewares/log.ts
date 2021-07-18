import { NextFunction, Request, Response } from 'express';

import { getLogger } from '../services/logger';

const logMiddleware = (req: Request, _: Response, next: NextFunction): void => {
  getLogger().info(JSON.stringify({
    body: req.body,
    params: req.params,
    query: req.query
  }));

  next();
};

export default logMiddleware;
