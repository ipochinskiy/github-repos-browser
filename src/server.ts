import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';

import { getServerConfig } from './shared/config';

import createV1Router from './api/v1';

export const runServer = (): void => {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));

  app.use('/api/v1', createV1Router());

  const { PORT } = getServerConfig();
  app.listen(PORT);
};
