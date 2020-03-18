import { Request, Response } from 'express';

import { HttpStatusCode } from '../../../shared/http-status-codes';

import { getRepositoryListByUsername } from './service';

interface RepositoryController {
  getRepositoryList(request: Request, response: Response): Promise<Response>;
}

export const createRepositoryController = (): RepositoryController => {
  return {
    async getRepositoryList(request: Request, response: Response): Promise<Response> {
      // TODO: log it out

      // TODO: validate username
      const { username } = request.query;

      const result = await getRepositoryListByUsername(username);
      return response.status(HttpStatusCode.OK).json(result);
    },
  };
};
