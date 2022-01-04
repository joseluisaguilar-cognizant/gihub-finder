import { FunctionComponent, useEffect, useState } from 'react';
import UserInterface from '../../../../interfaces/User.interface';
import Spinner from '../../../shared/Spinner/Spinner';
import UserItem from '../UserItem/UserItem';

interface UserResultsProps {}

const UserResults: FunctionComponent<UserResultsProps> = () => {
  const [users, setUsers] = useState<Array<UserInterface>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    // ! If you would like to make the request with the token access, take this into account:
    // const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // });

    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`);

    const data: Array<UserInterface> = await response.json();

    setUsers(data);
    setLoading(false);
  };

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
