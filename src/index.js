import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from './stores';
import './services/i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={<Spin />} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
