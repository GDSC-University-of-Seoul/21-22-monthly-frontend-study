import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Span = styled.span`
  width: 15rem;
  height: 15rem;
  text-align: center;
  line-height: 15rem;
  font-size: 5rem;
  font-family: cursive;
  color: green;
  border: 1px solid grey;
  border-radius: 10px;
`;

export const Button = styled.button`
  width: 5rem;
  height: 3rem;
  background: none;
  border: 1px solid grey;
  border-radius: 10px;
  color: snow;
  cursor: pointer;
  &:hover {
    background-color: #222;
  }

  transition: all 0.3s ease-in-out;
`;
