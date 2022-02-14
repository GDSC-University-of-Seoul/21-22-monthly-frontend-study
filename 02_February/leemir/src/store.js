import { atom } from 'recoil';

const numberState = atom({
  key: 'numberState',
  default: 1
});

export default numberState;
