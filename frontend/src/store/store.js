import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  user: userReducer
})
const persistConfig = {
  "key": 'root',
  storage
}

const persistorReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistorReducer,
  middleware: [thunk]
})
