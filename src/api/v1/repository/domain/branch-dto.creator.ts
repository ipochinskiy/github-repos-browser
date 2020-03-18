import { BranchDTO } from './branch-dto';

export const createBranchDTO = (options?: object): BranchDTO => ({
  name: 'extra-sticky',
  lastCommitSha: 'e7e7912165544dbe886d6b2354723d6657d672ec',
  ...options,
});
