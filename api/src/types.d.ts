import { NextFunction, Request, Response } from 'express';

type PartialRecord<K extends keyof any, T> = {
  // eslint-disable-next-line no-unused-vars
  [P in K]?: T;
};

export type ValidationRules = Record<string, string[]>;

export type HttpEndpoint = 'get' | 'post' | 'delete' | 'put' | 'patch';

export type HttpEndpointValidationRules = PartialRecord<HttpEndpoint, ValidationRules>;

// eslint-disable-next-line no-unused-vars
export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;
