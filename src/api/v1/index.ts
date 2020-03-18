import * as express from 'express';

import { acceptOnlyJson, handleApiError } from '../../shared/middleware';
import { createRepositoryController } from './repository/controller';

export default (): express.Router => {
  const router = express.Router();

  router.use(acceptOnlyJson);

  const repositoryController = createRepositoryController();
  router.get('/repositories', repositoryController.getRepositoryList);

  router.use(handleApiError);

  return router;
};
