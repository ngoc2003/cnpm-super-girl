import { createRoot } from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from './stores';
import './services/i18n';
import React, { Suspense } from 'react';

const App = React.lazy(() => import('./App'));

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={<Spin />} persistor={persistor}>
      <BrowserRouter>
        <Suspense fallback={<Spin />}>
          <App />
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
