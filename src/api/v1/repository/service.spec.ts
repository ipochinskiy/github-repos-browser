/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/camelcase */
import {
  fetchRepositoriesByUsername,
  fetchBranchesByRepositoryFullName,
} from '../../../shared/github-facade';

import { getRepositoryListByUsername } from './service';

jest.mock('../../../shared/github-facade');
const {
  createBranchRaw,
  createRepositoryRaw,
} = jest.requireActual('../../../shared/github-facade');

describe('Api V1 Repository: Service', () => {
  const setUpMocks = () => {
    const fetchRepositoriesByUsernameMock = jest.fn().mockResolvedValue([
      createRepositoryRaw({ name: 'web-blaster', full_name: 'spidey/web-blaster' }),
      createRepositoryRaw({ name: 'jarvis', full_name: 'ironman/jarvis', fork: true }),
      createRepositoryRaw({ name: 'stormbreaker', full_name: 'thor/stormbreaker' }),
    ]);
    (fetchRepositoriesByUsername as jest.Mock).mockImplementation(fetchRepositoriesByUsernameMock);

    const fetchBranchesByRepositoryFullNameMock = jest.fn().mockResolvedValue([
      createBranchRaw({ name: 'rock-n-roller' }),
      createBranchRaw({ name: 'muster-of-puppets' }),
    ]);
    (fetchBranchesByRepositoryFullName as jest.Mock).mockImplementation(fetchBranchesByRepositoryFullNameMock);

    return {
      fetchRepositoriesByUsernameMock,
      fetchBranchesByRepositoryFullNameMock,
    };
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    (console.warn as jest.Mock).mockRestore();
  });

  describe('#getRepositoryListByUsername()', () => {
    it('should be a defined', () => {

      expect(getRepositoryListByUsername).toBeDefined();
      expect(getRepositoryListByUsername).toBeInstanceOf(Function);
    });

    it('should fetch raw repos', async () => {
      const { fetchRepositoriesByUsernameMock } = setUpMocks();

      await getRepositoryListByUsername('spidey');

      expect(fetchRepositoriesByUsernameMock).toHaveBeenCalledTimes(1);
      expect(fetchRepositoriesByUsernameMock).toHaveBeenCalledWith('spidey');
    });

    describe('when "fetchRepositoriesByUsername" throws', () => {
      it('should return empty array', async () => {
        const { fetchRepositoriesByUsernameMock } = setUpMocks();
        fetchRepositoriesByUsernameMock.mockRejectedValue({ error: true });

        const result = await getRepositoryListByUsername('spidey');

        expect(result).toEqual([]);
      });
    });

    describe('when "fetchRepositoriesByUsername" returns data', () => {
      it('should filter forks out', async () => {
        setUpMocks();

        const result = await getRepositoryListByUsername('spidey');

        expect(result).toHaveLength(2);
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ name: 'web-blaster' }),
            expect.objectContaining({ name: 'stormbreaker' }),
          ]),
        );
      });

      it('should fetch branches for every non-forked repo', async () => {
        const { fetchBranchesByRepositoryFullNameMock } = setUpMocks();

        await getRepositoryListByUsername('spidey');

        expect(fetchBranchesByRepositoryFullNameMock).toHaveBeenCalledTimes(2);
        expect(fetchBranchesByRepositoryFullNameMock).toHaveBeenCalledWith('spidey/web-blaster');
        expect(fetchBranchesByRepositoryFullNameMock).toHaveBeenCalledWith('thor/stormbreaker');
        expect(fetchBranchesByRepositoryFullNameMock).not.toHaveBeenCalledWith('ironman/jarvis');
      });

      it('should filter out unparseable entries', async () => {
        const { fetchRepositoriesByUsernameMock } = setUpMocks();
        fetchRepositoriesByUsernameMock.mockResolvedValue([
          createRepositoryRaw({ name: 'web-blaster', full_name: 'spidey/web-blaster' }),
          createRepositoryRaw({ name: 'jarvis', full_name: 'ironman/jarvis', owner: null }),
          createRepositoryRaw({ name: 'stormbreaker', full_name: 'thor/stormbreaker' }),
        ]);

        const result = await getRepositoryListByUsername('spidey');

        expect(result).toHaveLength(2);
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ name: 'web-blaster' }),
            expect.objectContaining({ name: 'stormbreaker' }),
          ]),
        );
      });

      it('should parse repository and branches to DTO', async () => {
        const { fetchRepositoriesByUsernameMock } = setUpMocks();
        fetchRepositoriesByUsernameMock.mockResolvedValue([
          createRepositoryRaw(),
        ]);

        const result = await getRepositoryListByUsername('spidey');

        expect(result).toHaveLength(1);
        expect(result).toEqual([
          {
            name: 'web-blaster',
            ownerLogin: 'spidey',
            branchList: [
              {
                name: 'rock-n-roller',
                lastCommitSha: 'e7e7912165544dbe886d6b2354723d6657d672ec'
              },
              {
                name: 'muster-of-puppets',
                lastCommitSha: 'e7e7912165544dbe886d6b2354723d6657d672ec'
              }
            ]
          }
        ]);
      });
    });
  });
});
