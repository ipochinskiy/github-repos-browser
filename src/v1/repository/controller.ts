import { Request, Response } from 'express';

import { HttpStatusCode } from '../../shared/http-status-codes';

import { getRepositoryListByUsername } from './service';

export const createRepositoryController = () => {
  return {
    async getRepositoryList(request: Request, response: Response) {
      // TODO: log it out

      // TODO: validate username
      const { username } = request.query;

      const result: any = await getRepositoryListByUsername(username);
      return response.status(HttpStatusCode.OK).json(result);
    },
  };
};
