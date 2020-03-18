import { RepositoryDTO } from './repository-dto';
import { createBranchDTO } from './branch-dto.creator';

export const createRepositoryDTO = (options?: object): RepositoryDTO => ({
  name: 'web-blaster',
  ownerLogin: 'spidey',
  branchList: [
    createBranchDTO({ name: 'extra-sticky' }),
    createBranchDTO({ name: 'extra-creamy' }),
  ],
  ...options,
});
