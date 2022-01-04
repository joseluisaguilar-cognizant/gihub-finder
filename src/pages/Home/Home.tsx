import { FunctionComponent } from 'react';
import UserResults from '../../components/layout/users/UserResults/UserResults';
import UserSearch from '../../components/layout/users/UserSearch/UserSearch';

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
