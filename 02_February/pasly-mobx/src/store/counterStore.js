import { observable, action } from 'mobx';

const appState = observable({
  count: 0,
  decrement: action(function () {
    appState.count -= 1;
  }),
  increment: action(function () {
    appState.count += 1;
  }),
});
export default appState;
