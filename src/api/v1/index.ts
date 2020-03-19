import * as express from 'express';
import { serve, setup } from 'swagger-ui-express';

import { acceptOnlyJson, handleApiError } from '../../shared/middleware';
import { createRepositoryController } from './repository/controller';

import { swaggerDocument } from './docs';

export default (): express.Router => {
  const router = express.Router();

  router.use(acceptOnlyJson);
  router.use('/api-docs', serve, setup(swaggerDocument));

  const repositoryController = createRepositoryController();
  router.get('/repositories', repositoryController.getRepositoryList);

  router.use(handleApiError);

  return router;
};
