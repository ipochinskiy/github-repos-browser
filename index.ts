import { config as configEnvironment } from 'dotenv';

import { runServer } from './src/server';

configEnvironment();

runServer();

process.on('unhandledRejection', (error: Error) => {
  console.error('ERROR: unhandledRejection', error);
  process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
  console.error('ERROR: uncaughtException', error);
  process.exit(1);
});
