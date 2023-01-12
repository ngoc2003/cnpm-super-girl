import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import rootReducer from './reducers';

import baseRtkApi from './services';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseRtkApi.middleware);
    if (process.env.NODE_ENV === 'development') {
      return middleware.concat(logger);
    }

    return middleware;
  },
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export { persistor, store };
