import { BranchRaw } from './branch-raw';

export const createBranchRaw = (options?: object): BranchRaw => ({
  name: 'extra-sticky',
  commit: {
    sha: 'e7e7912165544dbe886d6b2354723d6657d672ec',
  },
  ...options,
});
