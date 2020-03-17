import * as express from 'express';
import { getRepositoryList } from './controllers/repository-controller';
import { acceptOnlyJson } from '../shared/middleware/accept-only-json';

const router = express.Router();

router.use(acceptOnlyJson);
router.get('/repositories', getRepositoryList);

export default router;
