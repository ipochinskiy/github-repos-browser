import { Request, Response, NextFunction } from 'express';

import { HttpStatusCode } from '../../../shared/http-status-codes';

import { getRepositoryListByUsername } from './service';

interface RepositoryController {
  getRepositoryList(request: Request, response: Response, next: NextFunction): Promise<Response|void>;
}

export const createRepositoryController = (): RepositoryController => {
  return {
    async getRepositoryList(request: Request, response: Response, next: NextFunction): Promise<Response|void> {
      // TODO: log it out

      // TODO: validate username
      const { username } = request.query;

      try {
        const result = await getRepositoryListByUsername(username);
        return response.status(HttpStatusCode.OK).json(result);
      } catch (err) {
        return next(err);
      }
    },
  };
};
