import * as express from 'express';

import { acceptOnlyJson } from '../shared/middleware/accept-only-json';
import { createRepositoryController } from './controllers/repository-controller';

export default () => {
  const router = express.Router();
  
  router.use(acceptOnlyJson);
  
  const repositoryController = createRepositoryController();
  router.get('/repositories', repositoryController.getRepositoryList);

  return router;
};
