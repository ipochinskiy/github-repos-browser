import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../http-status-codes';

export const acceptOnlyJson = (request: Request, response: Response, next: NextFunction): Response|void => {
  if (request.accepts('application/json')) {
    return next();
  }

  // TODO: log it out
  return response.status(HttpStatusCode.NOT_ACCEPTABLE).json({
    status: HttpStatusCode.NOT_ACCEPTABLE,
    message: 'Unsupported content type',
  });
};
