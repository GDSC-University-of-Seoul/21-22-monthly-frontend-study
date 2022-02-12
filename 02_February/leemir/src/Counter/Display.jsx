import React from 'react';
import { Span, Wrapper } from './style';

const Display = () => {
  const count = 1;
  return (
    <Wrapper>
      <Span>{count}</Span>
    </Wrapper>
  );
};

export default Display;
