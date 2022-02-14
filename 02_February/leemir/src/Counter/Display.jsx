import React from 'react';
import { useRecoilValue } from 'recoil';
import numberState from '../store';
import { Span, Wrapper } from './style';

const Display = () => {
  const count = useRecoilValue(numberState);
  return (
    <Wrapper>
      <Span>{count}</Span>
    </Wrapper>
  );
};

export default Display;
