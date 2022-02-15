import React, { Dispatch } from 'react';

export type NumberAction =
  | { type: 'UP'; payload: number }
  | { type: 'DOWN'; payload: number }
  | { type: 'ZERO'; payload: number };

export type State = {
  number: 0;
};

export type NumberDispatch = Dispatch<NumberAction>;

export interface INumberProvider {
  children: React.ReactNode;
}
