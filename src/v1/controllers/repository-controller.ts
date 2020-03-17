import { Request, Response } from "express";

export const createRepositoryController = () => {
  const getRepositoryList = (request: Request, response: Response) => {
    const { username } = request.query;
    
    // TODO: log it out
    return response.send(`Hello ${username}!`);
  };

  return {
    getRepositoryList,
  };
};
