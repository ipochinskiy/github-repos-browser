export interface RepositoryRaw {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  fork: boolean;
}
