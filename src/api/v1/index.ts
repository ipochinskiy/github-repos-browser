import * as express from 'express';

import { acceptOnlyJson } from '../../shared/middleware/accept-only-json';
import { createRepositoryController } from './repository/controller';

export default (): express.Router => {
  const router = express.Router();

  router.use(acceptOnlyJson);

  const repositoryController = createRepositoryController();
  router.get('/repositories', repositoryController.getRepositoryList);

  return router;
};
