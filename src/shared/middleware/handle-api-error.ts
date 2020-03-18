/* eslint-disable max-params */
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../http-status-codes';

export const handleApiError = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response|void => {
  if (response.headersSent) {
    return next(err);
  }

  // TODO: log it out
  return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  });
};
