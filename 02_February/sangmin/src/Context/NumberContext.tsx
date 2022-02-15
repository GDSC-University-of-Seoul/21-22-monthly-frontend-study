import React, { createContext, useReducer } from 'react';
import { State, NumberDispatch, NumberAction, INumberProvider } from './type';

const initialState = {
  type: '',
  number: 0,
};

const numberReducer = (state: State, action: NumberAction): any => {
  switch (action.type) {
    case 'UP':
      return { ...state, number: action.payload };
    case 'DOWN':
      return { ...state, number: action.payload };
    case 'ZERO':
      return { ...state, number: action.payload };
    default:
      break;
  }
};

export const NumberStateContext = createContext<State | null>(null);
export const NumberDispatchContext = createContext<NumberDispatch | null>(null);

export const NumberProvider: React.FC<INumberProvider> = ({ children }) => {
  const [number, dispatch] = useReducer(numberReducer, initialState);

  return (
    <NumberStateContext.Provider value={number}>
      <NumberDispatchContext.Provider value={dispatch}>
        {children}
      </NumberDispatchContext.Provider>
    </NumberStateContext.Provider>
  );
};
