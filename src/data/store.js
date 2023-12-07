import { configureStore } from '@reduxjs/toolkit'
import loginSlice  from './slices/login-slice'

const rootReducer = {
  auth: loginSlice.reducer,
  // other reducers if present
};

const store = configureStore({
  reducer: rootReducer,
  // other store configurations
});

export default store
