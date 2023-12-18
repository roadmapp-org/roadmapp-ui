import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from './login-slice'
import logReducer from "./log-slice.js"
import homeReducer from './levels-slice.js'

export default configureStore({
  reducer: {
    user: loginReducer,
    home: homeReducer,
    log: logReducer
  }
})
