import { BranchDTO } from './branch-dto';

export interface RepositoryDTO {
  name: string;
  ownerLogin: string;
  branchList: BranchDTO[];
}
