import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Storage } from './context/StorageContext';

ReactDOM.render(
  <React.StrictMode>
    <Storage>
      <App />
    </Storage>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
