import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { GithubContext } from '../../../../context/github/GithubContext';
import UserInterface from '../../../../interfaces/User.interface';
import Spinner from '../../../shared/Spinner/Spinner';
import UserItem from '../UserItem/UserItem';

interface UserResultsProps {}

const UserResults: FunctionComponent<UserResultsProps> = () => {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ! TAKE A LOOK ON IT, IT RENDERS SEVERAL TIMES!!
  console.log(users, loading);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user: UserInterface) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserResults;
