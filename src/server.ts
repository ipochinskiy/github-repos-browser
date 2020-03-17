import * as express from 'express';
import { config as configEnvironment } from 'dotenv';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

import v1Router from './v1';

configEnvironment();

const app = express();

app.use(helmet());
app.use(morgan('combined'));

app.use('/api/v1', v1Router);

const port = process.env.PORT;
app.listen(port);