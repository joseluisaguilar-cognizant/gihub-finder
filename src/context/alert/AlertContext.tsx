import { createContext, FunctionComponent, ReactNode, useReducer } from 'react';

import alertReducer, {
  IAlertReducerState,
  IAlertMessage,
} from './AlertReducer';

interface IAlertContext {
  alertMessage: IAlertMessage;
  setAlert: (msg: string, type: string) => void;
}

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertContext = createContext<IAlertContext>({} as IAlertContext);

export const AlertProvider: FunctionComponent<AlertProviderProps> = ({
  children,
}) => {
  // Reducer implementation
  const initialState: IAlertReducerState = { alertMessage: null };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set an alert
  const setAlert = (msg: string, type: string): void => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ALERT',
      });
    }, 3000);

    // TODO: Clear interval!
  };

  return (
    <AlertContext.Provider
      value={{ alertMessage: state.alertMessage, setAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};
