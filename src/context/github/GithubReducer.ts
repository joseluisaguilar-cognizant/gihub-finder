import UserInterface from '../../interfaces/User.interface';
import UserDetailInterface from '../../interfaces/UserDetail.interface';
import { UserRepo } from '../../interfaces/UserRepo';

export interface IGithubReducerState {
  users: Array<UserInterface>;
  user: UserDetailInterface;
  repos: Array<UserRepo>;
  loading: boolean;
}

export interface IGithubReducerAction {
  type: string;
  payload?: any;
}

const githubReducer = (
  state: IGithubReducerState,
  action: IGithubReducerAction
) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'GET_SINGLE_USER':
      console.log('eee', action.payload);
      return { ...state, user: action.payload, loading: false };
    case 'GET_USER_REPOS':
      return { ...state, repos: action.payload, loading: false };
    case 'CLEAR_USERS':
      return { ...state, users: [], loading: false };
    case 'ENABLE_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default githubReducer;
