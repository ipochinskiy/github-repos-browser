import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

export const acceptOnlyJson = (request: Request, response: Response, next: NextFunction) => {
  if(request.accepts('application/json')) {
    return next();
  }

  // TODO: log it out
  return response.status(HttpStatus.NOT_ACCEPTABLE).send({
    status: HttpStatus.NOT_ACCEPTABLE,
    message: HttpStatus.getStatusText(HttpStatus.NOT_ACCEPTABLE),
  });
};
