import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
  useContext,
} from 'react';
import { GithubContext } from '../../../../context/github/GithubContext';

interface UserSearchProps {}
const UserSearch: FunctionComponent<UserSearchProps> = () => {
  const [text, setText] = useState<string>('');

  const { users, searchUser, clearUsers } = useContext(GithubContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = event;

    setText(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text) {
      alert('Please enter something');
      return;
    }

    searchUser(text);

    // TODO search users
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
          <button className="btn btn-gray btn-lg" onClick={clearUsers}>
            Clear
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserSearch;
