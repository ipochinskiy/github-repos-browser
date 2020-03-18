/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';

import { mockResponse, mockRequest } from '../../mocks';

import { handleApiError } from './handle-api-error';

describe('Shared Middleware: #handleApiError()', () => {
  const setUpMocks = () => {
    const request = mockRequest();
    const response = mockResponse();
    const next = jest.fn().mockReturnValue('bazzinga!');

    return {
      request,
      response,
      next,
    };
  };

  it('should be a function', () => {

    expect(handleApiError).toBeDefined();
    expect(handleApiError).toBeInstanceOf(Function);
  });

  describe('when headers are already sent', () => {
    it('should call next middleware', () => {
      const { request, response, next } = setUpMocks();
      response.headersSent = true;
      const err = new Error('badumtss');

      handleApiError(err, request as unknown as Request, response as unknown as Response, next);

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(err);
    });

    it('should return the result from "next()"', () => {
      const { request, response, next } = setUpMocks();
      response.headersSent = true;
      next.mockReturnValue('bazzinga!');
      const err = new Error('badumtss');

      const result = handleApiError(err, request as unknown as Request, response as unknown as Response, next);

      expect(result).toEqual('bazzinga!');
    });

    it('should not call "response"\'s methods', () => {
      const { request, response, next } = setUpMocks();
      response.headersSent = true;
      const err = new Error('badumtss');

      handleApiError(err, request as unknown as Request, response as unknown as Response, next);

      expect(response.status).toBeCalledTimes(0);
      expect(response.json).toBeCalledTimes(0);
    });
  });

  describe('when headers are not yet sent', () => {
    it('should return 500', () => {
      const { request, response, next } = setUpMocks();
      response.headersSent = false;
      const err = new Error('badumtss');

      handleApiError(err, request as unknown as Request, response as unknown as Response, next);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toBeCalledWith(500);
      expect(response.json).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith({
        status: 500,
        message: 'Internal Server Error',
      });
    });
  });
});
