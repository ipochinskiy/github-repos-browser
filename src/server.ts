import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { getServerConfig } from './shared/config';
import createV1Router from './v1';

const app = express();

app.use(helmet());
app.use(morgan('combined'));

app.use('/api/v1', createV1Router());

try {
  const { PORT } = getServerConfig();
  app.listen(PORT);
} catch (err) {
  console.error(err);
}
