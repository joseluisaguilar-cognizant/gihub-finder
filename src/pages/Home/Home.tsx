import { FunctionComponent } from 'react';
import UserResults from '../../components/users/UserResults/UserResults';
import UserSearch from '../../components/users/UserSearch/UserSearch';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <UserSearch />
      <UserResults />
    </>
  );
};

export default Home;
