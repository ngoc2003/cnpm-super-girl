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
    <PersistGate
      loading={
        <div className='h-screen flex items-center justify-center'>
          <Spin />
        </div>
      }
      persistor={persistor}
    >
      <BrowserRouter>
        <Suspense
          fallback={
            <div className='h-screen flex items-center justify-center'>
              <Spin />
            </div>
          }
        >
          <App />
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
