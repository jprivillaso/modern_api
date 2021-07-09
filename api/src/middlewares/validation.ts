import { NextFunction, Request, Response } from 'express';

import { getLogger } from '../services/logger';

function paramsValidationMiddleware(req: Request, _: Response, next: NextFunction): void {
  getLogger().info('Inside validation middleware');
  getLogger().info(req.body);
  next();
}

export default paramsValidationMiddleware;
