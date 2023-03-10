import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./stylesheets/reset.css";
import "./stylesheets/global.css";
import App from './App';
import configureStore from './store';
import { ModalProvider } from './components/Modals/Modal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
