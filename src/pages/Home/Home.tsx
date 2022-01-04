import { FunctionComponent } from 'react';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div>
      <h1 className="text-6xl">Welcome</h1>
    </div>
  );
};

export default Home;
