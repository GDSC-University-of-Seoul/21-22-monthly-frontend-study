import { observer } from 'mobx-react';

const App = observer(({ appState }) => {
  return (
    <div className='app'>
      <h1>{appState.count}</h1>
      <button onClick={appState.increment}>+</button>
      <button onClick={appState.decrement}>-</button>
    </div>
  );
});

export default App;
