export interface IAlertMessage {
  msg: string;
  type: string;
}

export interface IAlertReducerState {
  alertMessage: IAlertMessage | null;
}

interface IAlertReducerAction {
  type: any;
  payload?: any;
}

const alertReducer = (
  state: IAlertReducerState,
  action: IAlertReducerAction
) => {
  switch (action.type) {
    case 'SET_ALERT':
      return { ...state, alertMessage: action.payload };
    case 'REMOVE_ALERT':
      return { ...state, alertMessage: null };
    default:
      return state;
  }
};

export default alertReducer;
