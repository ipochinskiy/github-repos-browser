import { RepositoryDTO } from './domain/repository-dto';

import {
  BranchRaw,
  RepositoryRaw,
  fetchBranchesByRepositoryFullName,
  fetchRepositoriesByUsername,
} from '../../../shared/github-facade';

// TODO: move to separate service?
const mapRawRepositoryAndBranchToDTO = (
  rawRepository: RepositoryRaw,
  rawBranchList: BranchRaw[] = [],
): RepositoryDTO => {
  try {
    return {
      name: rawRepository.name,
      ownerLogin: rawRepository.owner.login,
      branchList: rawBranchList.map(rawBranch => ({
        name: rawBranch.name,
        lastCommitSha: rawBranch.commit.sha,
      })),
    };
  } catch (err) {
    console.warn(`Repository "${rawRepository.full_name}" couldn't be converted to DTO`, err);
    return null;
  }
};

const promiseRepoBranchesAndMapToDTO = async (rawRepository: RepositoryRaw): Promise<RepositoryDTO> => {
  const rawBranchList = await fetchBranchesByRepositoryFullName(rawRepository['full_name']);
  return mapRawRepositoryAndBranchToDTO(rawRepository, rawBranchList);
};

export const getRepositoryListByUsername = async (username: string): Promise<RepositoryDTO[]> => {
  let rawRepositoryList: RepositoryRaw[];
  try {
    rawRepositoryList = await fetchRepositoriesByUsername(username);
  } catch (err) {
    console.error(err);
    rawRepositoryList = [];
  }

  const promisedRepositoryDTOList: Promise<RepositoryDTO>[] = rawRepositoryList
    .filter(repo => !!repo && !repo.fork)
    .map(promiseRepoBranchesAndMapToDTO);

  const nullableRepoList = await Promise.all(promisedRepositoryDTOList);
  return nullableRepoList.filter(dto => !!dto);
};
