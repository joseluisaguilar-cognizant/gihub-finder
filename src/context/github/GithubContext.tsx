import {
  createContext,
  FunctionComponent,
  ReactNode,
  useState,
  useReducer,
} from 'react';
import UserInterface from '../../interfaces/User.interface';
import githubReducer from './GithubReducer';

interface IGithubContext {
  users: Array<UserInterface>;
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

interface GithubProviderProps {
  children: ReactNode;
}

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubContext = createContext<IGithubContext>(
  {} as IGithubContext
);

export const GithubProvider: FunctionComponent<GithubProviderProps> = ({
  children,
}) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // const [users, setUsers] = useState<Array<UserInterface>>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async (): Promise<void> => {
    dispatch({ type: 'ENABLE_LOADING' });

    // ! If you would like to make the request with the token access, take this into account:
    // const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // });

    const response = await fetch(`${GITHUB_URL}/users`);

    const data: Array<UserInterface> = await response.json();

    dispatch({ type: 'GET_USERS', payload: data });

    // setUsers(data);
    // setLoading(false);
  };
  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};
