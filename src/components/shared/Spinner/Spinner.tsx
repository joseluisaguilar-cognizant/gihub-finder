import { FunctionComponent } from 'react';

import spinnerGif from '../../../assets/loading.gif';

interface SpinnerProps {}

const Spinner: FunctionComponent<SpinnerProps> = () => {
  return (
    <div className="w-100 mt-20">
      <img
        width={180}
        className="text-center mx-auto"
        src={spinnerGif}
        alt="Spinner gif"
      />
      ;
    </div>
  );
};

export default Spinner;
