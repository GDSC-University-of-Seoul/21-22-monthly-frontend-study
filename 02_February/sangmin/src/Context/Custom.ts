import { useContext } from 'react';
import { NumberDispatchContext, NumberStateContext } from './NumberContext';

export const useNumberState = () => {
  const state = useContext(NumberStateContext);
  if (!state) console.log('error');
  return state;
};

export const useNumberDispatch = () => {
  const dispatch = useContext(NumberDispatchContext);
  if (!dispatch) console.log('error');
  return dispatch;
};
