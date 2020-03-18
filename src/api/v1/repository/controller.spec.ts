/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';

import { mockRequest, mockResponse } from '../../../mocks';

import { createRepositoryDTO } from './domain/repository-dto.creator';
import { getRepositoryListByUsername } from './service';

import { createRepositoryController } from './controller';
import { RepositoryDTO } from './domain/repository-dto';

jest.mock('./service');

describe('Api V1 Repository: Controller', () => {
  const setUpMocks = () => {
    const request = mockRequest();
    request.query.username = 'Hulk Hogan';
    const response = mockResponse();
    const next = jest.fn().mockReturnValue('bazzinga!');

    const getRepositoryListByUsernameMock = jest.fn().mockResolvedValue([
      createRepositoryDTO({ name: 'web-blaster' }),
      createRepositoryDTO({ name: 'stormbreaker' }),
    ]);
    (getRepositoryListByUsername as jest.Mock).mockImplementation(getRepositoryListByUsernameMock);

    return {
      request,
      response,
      next,
      getRepositoryListByUsernameMock,
    };
  };

  describe('creator function', () => {
    it('should be a defined', () => {

      expect(createRepositoryController).toBeDefined();
      expect(createRepositoryController).toBeInstanceOf(Function);
    });
  });

  describe('#getRepositoryList()', () => {
    it('should be a function', () => {
      const controller = createRepositoryController();

      expect(controller.getRepositoryList).toBeDefined();
      expect(controller.getRepositoryList).toBeInstanceOf(Function);
    });

    it('should call "getRepositoryListByUsername" on the service', () => {
      const { request, response, next, getRepositoryListByUsernameMock } = setUpMocks();
      const controller = createRepositoryController();

      controller.getRepositoryList(request as unknown as Request, response as unknown as Response, next);

      expect(getRepositoryListByUsernameMock).toHaveBeenCalledTimes(1);
      expect(getRepositoryListByUsernameMock).toHaveBeenCalledWith('Hulk Hogan');
    });

    it('should return 200 with the repos from the service', async () => {
      const { request, response, next } = setUpMocks();
      const controller = createRepositoryController();

      await controller.getRepositoryList(request as unknown as Request, response as unknown as Response, next);

      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith(
        expect.arrayContaining<RepositoryDTO>([
          expect.objectContaining({ name: 'web-blaster' }),
          expect.objectContaining({ name: 'stormbreaker' }),
        ]),
      );
    });

    describe('when the service throws', () => {
      it('should pass the error to the next handler', async () => {
        const { request, response, next, getRepositoryListByUsernameMock } = setUpMocks();
        getRepositoryListByUsernameMock.mockRejectedValue({ error: true });
        const controller = createRepositoryController();

        await controller.getRepositoryList(request as unknown as Request, response as unknown as Response, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith({ error: true });
      });

      it('should not call "response"\'s methods', async () => {
        const { request, response, next, getRepositoryListByUsernameMock } = setUpMocks();
        getRepositoryListByUsernameMock.mockRejectedValue({ error: true });
        const controller = createRepositoryController();

        await controller.getRepositoryList(request as unknown as Request, response as unknown as Response, next);

        expect(response.status).toHaveBeenCalledTimes(0);
        expect(response.json).toHaveBeenCalledTimes(0);
      });
    });
  });
});
