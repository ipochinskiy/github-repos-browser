import axios, { AxiosResponse } from 'axios';

import { getServerConfig } from '../config';

import { RepositoryRaw } from './repository-raw';
import { BranchRaw } from './branch-raw';

const defaultHeades = {
  'Accept': 'application/vnd.github.v3+json',
};

export const fetchRepositoriesByUsername = async (username: string): Promise<RepositoryRaw[]> => {
  const { GITHUB_HOST } = getServerConfig();

  return await axios.get<RepositoryRaw[]>(`${GITHUB_HOST}/users/${username}/repos`, {
    headers: defaultHeades,
  }).then((response: AxiosResponse) => response.data);
};

export const fetchBranchesByRepositoryFullName = async (fullName: string): Promise<BranchRaw[]> => {
  const { GITHUB_HOST } = getServerConfig();

  return await axios.get<BranchRaw[]>(`${GITHUB_HOST}/repos/${fullName}/branches`, {
    headers: defaultHeades,
  }).then((response: AxiosResponse) => response.data);
};
