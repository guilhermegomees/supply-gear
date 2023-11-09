import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/userReducers';

const store = configureStore({
  reducer: rootReducer,
});

export const isUserLoggedIn = (state : any) => state.userId !== null;

export default store;