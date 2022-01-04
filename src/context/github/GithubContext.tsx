import { createContext, FunctionComponent, ReactNode, useReducer } from 'react';
import UserInterface from '../../interfaces/User.interface';
import UserSearchInterface from '../../interfaces/UserSpecific.interface';
import githubReducer from './GithubReducer';

interface IGithubContext {
  users: Array<UserInterface>;
  loading: boolean;
  fetchUsers: () => Promise<void>;
  searchUser: (userId: string) => Promise<void>;
  clearUsers: () => Promise<void>;
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

  // ? NO LONGER IS GOING TO BE USED
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
  };

  // Get Search results
  const searchUser = async (userId: string): Promise<void> => {
    dispatch({ type: 'ENABLE_LOADING' });

    const params = new URLSearchParams({
      q: userId,
    });

    // The URL we are trying to create is: https://api.github.com/search/users?q=USERNAME
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const data: UserSearchInterface = await response.json();

    console.log(data);

    dispatch({ type: 'GET_USERS', payload: data.items });
  };

  // Clear users
  const clearUsers = async (): Promise<void> => {
    dispatch({ type: 'CLEAR_USERS' });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
        searchUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
