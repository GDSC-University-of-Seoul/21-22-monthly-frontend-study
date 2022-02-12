import React from 'react';
import { Wrapper, Button } from './style';

export const AddButton = () => {
  const add = () => {

  };

  const onClickHandler = () => {
    add();
  };
  return (
    <Wrapper>
      <Button onClick={onClickHandler}>+1</Button>
    </Wrapper>
  );
};

export const MinusButton = () => {
  const minus = () => {

  };

  const onClickHandler = () => {
    minus();
  };
  return (
    <Wrapper>
      <Button onClick={onClickHandler}>-1</Button>
    </Wrapper>
  );
};
