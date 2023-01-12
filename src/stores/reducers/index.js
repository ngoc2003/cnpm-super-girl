import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import baseRtkApi from '../services';
import { authReducer } from '../slices/auth';
import { bookReducer } from '../slices/book';

const rootReducer = combineReducers({
  auth: persistReducer(
    { key: 'auth', whitelist: ['user'], storage: storageSession },
    authReducer,
  ),
  book: bookReducer,
  [baseRtkApi.reducerPath]: baseRtkApi.reducer,
});

export default rootReducer;
