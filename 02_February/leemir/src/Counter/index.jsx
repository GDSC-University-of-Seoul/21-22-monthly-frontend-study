import React from 'react';
import { AddButton, MinusButton } from './Buttons';
import Display from './Display';
import { Container, Wrapper } from './style';

const Counter = () => {
  return (
    <Container>
      <Display />
      <Wrapper>
        <MinusButton />
        <AddButton />
      </Wrapper>
    </Container>
  );
};

export default Counter;
