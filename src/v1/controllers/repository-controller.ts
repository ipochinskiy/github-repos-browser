import { Request, Response } from "express";

export const getRepositoryList = (request: Request, response: Response) => {
  const { username } = request.query;
  
  // TODO: log it out
  return response.send(`Hello ${username}!`);
};
