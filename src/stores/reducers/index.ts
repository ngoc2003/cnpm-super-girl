import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import baseRtkApi from '../services';
import { authReducer } from '../slices/auth';

const rootReducer = combineReducers({
  auth: persistReducer(
    { key: 'auth', whitelist: ['user'], storage: storageSession },
    authReducer,
  ),
  [baseRtkApi.reducerPath]: baseRtkApi.reducer,
});

export default rootReducer;
