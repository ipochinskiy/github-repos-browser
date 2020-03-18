/* eslint-disable @typescript-eslint/camelcase */
import { RepositoryRaw } from './repository-raw';

export const createRepositoryRaw = (options?: object): RepositoryRaw => ({
  name: 'web-blaster',
  full_name: 'spidey/web-blaster',
  owner: {
    login: 'spidey',
  },
  fork: false,
  ...options,
});
