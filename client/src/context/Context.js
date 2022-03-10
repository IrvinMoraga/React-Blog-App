import { createContext, useEffect, useReducer, useState } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const toggleMobile = () => {
    setIsMobile(!isMobile);
  };

  const setToDesktopMode = () => {
    setIsMobile(false);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        isMobile,
        toggleMobile,
        setToDesktopMode,
      }}
    >
      {children}
    </Context.Provider>
  );
};
