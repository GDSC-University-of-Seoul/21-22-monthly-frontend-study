import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appState from './store/counterStore';

ReactDOM.render(
  <React.StrictMode>
    <App appState={appState} />
  </React.StrictMode>,
  document.getElementById('root')
);
