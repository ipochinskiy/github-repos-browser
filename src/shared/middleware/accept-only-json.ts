import { NextFunction, Request, Response } from 'express';

export const acceptOnlyJson = (request: Request, response: Response, next: NextFunction) => {
  if(request.accepts('application/json')) {
    return next();
  }

  // TODO: log it out
  return response.status(406).send({
    status: 406,
    message: 'Unsupported content type',
  });
};
