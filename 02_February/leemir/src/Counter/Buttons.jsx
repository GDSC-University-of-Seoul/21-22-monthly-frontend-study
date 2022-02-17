import React from 'react';
import { useSetRecoilState } from 'recoil';
import numberState from '../store';
import { Wrapper, Button } from './style';

export const AddButton = () => {
  const setNum = useSetRecoilState(numberState);
  const add = () => {
    setNum(cur => cur + 1);
  }

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
  const setNum = useSetRecoilState(numberState);
  const minus = () => {
    setNum(cur => cur - 1);
  }

  const onClickHandler = () => {
    minus();
  };
  return (
    <Wrapper>
      <Button onClick={onClickHandler}>-1</Button>
    </Wrapper>
  );
};
