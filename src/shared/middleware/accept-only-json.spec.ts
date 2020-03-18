/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';

import { mockResponse, mockRequest } from '../../mocks';

import { acceptOnlyJson } from './accept-only-json';

describe('Shared Middleware: #acceptOnlyJson()', () => {
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

    expect(acceptOnlyJson).toBeDefined();
    expect(acceptOnlyJson).toBeInstanceOf(Function);
  });

  describe('when request accepts "application/json"', () => {
    it('should call next middleware', () => {
      const { request, response, next } = setUpMocks();
      request.accepts.mockReturnValue(true);

      acceptOnlyJson(request as unknown as Request, response as unknown as Response, next);

      expect(next).toBeCalledTimes(1);
    });

    it('should return the result from "next()"', () => {
      const { request, response, next } = setUpMocks();
      request.accepts.mockReturnValue(true);
      next.mockReturnValue('bazzinga!');

      const result = acceptOnlyJson(request as unknown as Request, response as unknown as Response, next);

      expect(result).toEqual('bazzinga!');
    });

    it('should not call "response"\'s methods', () => {
      const { request, response, next } = setUpMocks();
      request.accepts.mockReturnValue(true);

      acceptOnlyJson(request as unknown as Request, response as unknown as Response, next);

      expect(response.status).toBeCalledTimes(0);
      expect(response.json).toBeCalledTimes(0);
    });
  });

  describe('when request does not accept "application/json"', () => {
    it('should return 406', () => {
      const { request, response, next } = setUpMocks();
      request.accepts.mockReturnValue(false);

      acceptOnlyJson(request as unknown as Request, response as unknown as Response, next);

      expect(response.status).toBeCalledTimes(1);
      expect(response.status).toBeCalledWith(406);
      expect(response.json).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith({
        status: 406,
        message: 'Unsupported content type',
      });
    });
  });
});
