import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
  useContext,
} from 'react';
import { GithubContext } from '../../../context/github/GithubContext';
import { AlertContext } from '../../../context/alert/AlertContext';
import { searchUser } from '../../../context/github/GithubActions';

interface UserSearchProps {}
const UserSearch: FunctionComponent<UserSearchProps> = () => {
  const [text, setText] = useState<string>('');

  // Use context
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = event;

    setText(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text) {
      setAlert('Please enter something', 'error');
      return;
    }

    dispatch({ type: 'ENABLE_LOADING' });

    const users = await searchUser(text);
    dispatch({ type: 'GET_USERS', payload: users });

    setText('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleInputChange}
              />
              <button
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                type="submit"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 ? (
        <div>
          <button
            className="btn btn-gray btn-lg"
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
          >
            Clear
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserSearch;
