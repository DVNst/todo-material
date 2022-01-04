import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from "redux";
import { Provider } from 'react-redux';
import reducer from './redux/reducer';

import App from './App';

import './index.scss';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// console.log('store', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
