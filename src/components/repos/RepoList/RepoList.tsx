import { FunctionComponent } from 'react';
import { UserRepo } from '../../../interfaces/UserRepo';
import RepoItem from '../RepoItem/RepoItem';

interface RepoListProps {
  repos: Array<UserRepo>;
}

const RepoList: FunctionComponent<RepoListProps> = ({ repos }) => {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Repositories
        </h2>
        {repos.map((repo: UserRepo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
