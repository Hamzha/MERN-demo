import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import userReducer from './userSlice';

const reducers = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: 'root',
  storage,
};

const persistorReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistorReducer,
  middleware: [thunk],
});
