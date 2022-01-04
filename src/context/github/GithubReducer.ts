import UserInterface from '../../interfaces/User.interface';

const githubReducer = (
  state: { users: Array<UserInterface>; loading: boolean },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, users: action.payload, loading: false };

    case 'ENABLE_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default githubReducer;
