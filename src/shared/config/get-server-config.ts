import { config as configEnvironment } from 'dotenv';

import { ServerConfig } from './server-config';

configEnvironment();

export const getServerConfig = (): ServerConfig => {
  const PORT = process.env.PORT;
  const GITHUB_HOST = process.env.GITHUB_HOST;

  if (!PORT || !GITHUB_HOST) {
    throw new Error('Environment is not set up!');
  }

  return {
    PORT,
    GITHUB_HOST,
  };
};
