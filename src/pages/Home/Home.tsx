import { FunctionComponent } from 'react';
import UserResults from '../../components/layout/users/UserResults/UserResults';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <h1 className="text-6xl">Welcome</h1>
      <UserResults />
    </>
  );
};

export default Home;
