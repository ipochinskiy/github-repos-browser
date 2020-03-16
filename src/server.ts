import * as express from 'express';
import { config as configEnvironment } from 'dotenv';

configEnvironment();

const app = express();

app.get('/', (request, response) => {
  response.send('Hello world!');
});

const port = process.env.PORT;
app.listen(port);
