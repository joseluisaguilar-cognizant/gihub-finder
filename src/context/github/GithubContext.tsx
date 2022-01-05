import { createContext, FunctionComponent, ReactNode, useReducer } from 'react';
import UserInterface from '../../interfaces/User.interface';
import UserDetailInterface from '../../interfaces/UserDetail.interface';
import { UserRepo } from '../../interfaces/UserRepo';
import UserSearchInterface from '../../interfaces/UserSpecific.interface';
import githubReducer, { IGithubReducerState } from './GithubReducer';

interface IGithubContext {
  users: Array<UserInterface>;
  user: UserDetailInterface;
  repos: Array<UserRepo>;
  loading: boolean;
  searchUser: (userId: string) => Promise<void>;
  clearUsers: () => Promise<void>;
  getUser: (userId: string) => Promise<void>;
  getUserRepos: (userId: string) => Promise<void>;
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
  const initialState: IGithubReducerState = {
    users: [],
    user: {} as UserDetailInterface,
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  /**
   * Search from users
   * @param userId - ID of user
   */
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

  /**
   * Clear user from state
   */
  const clearUsers = async (): Promise<void> => {
    dispatch({ type: 'CLEAR_USERS' });
  };

  /**
   * Get specific user data
   * @param userId
   */
  const getUser = async (userId: string): Promise<void> => {
    dispatch({ type: 'ENABLE_LOADING' });

    const response = await fetch(`${GITHUB_URL}/users/${userId}`);

    if (response.status === 404) {
      // TODO: Redirect to not found
      return;
    }
    const data: UserInterface = await response.json();

    dispatch({ type: 'GET_SINGLE_USER', payload: data });
  };

  /**
   * Get user Repos from github
   */
  const getUserRepos = async (userId: string): Promise<void> => {
    dispatch({ type: 'ENABLE_LOADING' });

    const params = new URLSearchParams({
      sort: 'created',
      per_page: '10',
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${userId}/repos?${params}`
    );

    if (response.status === 404) {
      // TODO: Redirect to not found
      return;
    }
    const data: UserInterface = await response.json();

    dispatch({ type: 'GET_USER_REPOS', payload: data });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
