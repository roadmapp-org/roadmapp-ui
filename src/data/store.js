import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from '../pages/login/login-slice'
import logReducer from '../pages/login/log-slice.js'

export default configureStore({
  reducer: {
    user: loginReducer,
    log: logReducer
  }
})
