import axios from 'axios';

import { getServerConfig } from '../config';

import {
  fetchRepositoriesByUsername,
  fetchBranchesByRepositoryFullName,
} from './client';

jest.mock('axios');
jest.mock('../config');

describe('Github Facade: Client', () => {
  const axiosGetSpy: jest.SpyInstance = jest.spyOn(axios, 'get');

  beforeEach(() => {
    axiosGetSpy.mockClear();
  });

  afterEach(() => {
    axiosGetSpy.mockRestore();
  });

  describe('#fetchRepositoriesByUsername()', () => {
    it('should be a function', () => {

      expect(fetchRepositoriesByUsername).toBeDefined();
      expect(fetchRepositoriesByUsername).toBeInstanceOf(Function);
    });

    it('should fetch repos from github', async () => {
      (getServerConfig as jest.Mock).mockReturnValue({ GITHUB_HOST: 'path/to/github/api' });
      axiosGetSpy.mockResolvedValue({ data: { success: true } });

      await fetchRepositoriesByUsername('spiderman');

      expect(axiosGetSpy).toBeCalledTimes(1);
      expect(axiosGetSpy).toBeCalledWith(
        'path/to/github/api/users/spiderman/repos',
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        },
      );
    });

    it('should return repos data', async () => {
      (getServerConfig as jest.Mock).mockReturnValue({ GITHUB_HOST: 'path/to/github/api' });
      axiosGetSpy.mockResolvedValue({ data: { success: true } });

      const result = await fetchRepositoriesByUsername('spiderman');

      expect(result).toMatchObject({ success: true });
    });
  });

  describe('#fetchBranchesByRepositoryFullName()', () => {
    it('should be a function', () => {

      expect(fetchBranchesByRepositoryFullName).toBeDefined();
      expect(fetchBranchesByRepositoryFullName).toBeInstanceOf(Function);
    });

    it('should fetch repo\'s branches from github', async () => {
      (getServerConfig as jest.Mock).mockReturnValue({ GITHUB_HOST: 'path/to/github/api' });
      axiosGetSpy.mockResolvedValue({ data: { success: true } });

      await fetchBranchesByRepositoryFullName('web-blaster');

      expect(axiosGetSpy).toBeCalledTimes(1);
      expect(axiosGetSpy).toBeCalledWith(
        'path/to/github/api/repos/web-blaster/branches',
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        },
      );
    });

    it('should return branches data', async () => {
      (getServerConfig as jest.Mock).mockReturnValue({ GITHUB_HOST: 'path/to/github/api' });
      axiosGetSpy.mockResolvedValue({ data: { success: true } });

      const result = await fetchBranchesByRepositoryFullName('spiderman');

      expect(result).toMatchObject({ success: true });
    });
  });
});
