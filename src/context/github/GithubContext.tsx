import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  useReducer,
} from 'react';
import UserInterface from '../../interfaces/User.interface';
import UserDetailInterface from '../../interfaces/UserDetail.interface';
import { UserRepo } from '../../interfaces/UserRepo';
import githubReducer, {
  IGithubReducerAction,
  IGithubReducerState,
} from './GithubReducer';

interface IGithubContext {
  users: Array<UserInterface>;
  user: UserDetailInterface;
  repos: Array<UserRepo>;
  loading: boolean;
  dispatch: Dispatch<IGithubReducerAction>;
}

interface GithubProviderProps {
  children: ReactNode;
}

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

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
