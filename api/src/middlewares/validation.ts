import { NextFunction, Request, Response } from 'express';

import { BAD_REQUEST_ERROR, INVALID_PARAMETERS_MESSAGE } from '../commons/constants';
import { getLogger } from '../services/logger';
import { MiddlewareFunction, ValidationRules } from '../types';

const isString = (value: any): boolean => typeof value === 'string';

const isNumber = (value: any): boolean => Number.isInteger(value);

const validateIsRequired = (value: any): boolean => {
  if (isNumber(value)) return value && value >= 0;
  // By default assume it's a string
  return value !== '' && value !== null && value !== undefined;
};

const validateBody = (
  payload: any,
  validationRules: ValidationRules
): boolean => {
  let isValid = true;

  if (validationRules && payload) {
    for (const propToValidate of Object.keys(validationRules)) {
      for (const ruleName of validationRules[propToValidate]) {
        switch (ruleName) {
          case 'required':
            isValid = isValid && validateIsRequired(payload[propToValidate]);
            break;
          case 'string':
            isValid = isValid && isString(payload[propToValidate]);
            break;
          case 'number':
            isValid = isValid && isNumber(payload[propToValidate]);
            break;
          default:
            break;
        }
      }
    }
  }

  // After all the validations, check if request contains extra parameters
  if (Object.keys(validationRules).length !== Object.keys(payload).length) return false;

  getLogger().info(`Params Validation result: ${isValid}`);
  return isValid;
};

/**
 * IMPORTANT!
 * This validation middleware only supports validations at the body and
 * required and basic type validations.
 *
 * TO-DO: Implement more validations for params and query that support more validations
 * such as isNumber, isEmail, etc.
 *
 * @param validationRules Object containing the validation rules
 * @returns asynchronous function to be used as a middleware for parameters
 * validation
 */
function paramsValidationMiddleware(
  validationRules?: ValidationRules
): MiddlewareFunction {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!validationRules) {
      next();
    } else {
      getLogger().info('Validating rules for payload:::');
      getLogger().info(req.body);
      getLogger().info(validationRules);

      const isValid = validateBody(req.body, validationRules);

      if (!isValid) {
        const badRequestError = {
          error: {
            message: INVALID_PARAMETERS_MESSAGE,
            status: BAD_REQUEST_ERROR
          }
        };
        res.status(BAD_REQUEST_ERROR).send(badRequestError);
      } else {
        next();
      }
    }
  };
}

export default paramsValidationMiddleware;
