import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from './login-slice'
import logReducer from "./log-slice"
import levelsReducer from "./levels-slice"
import layoutReducer from "./layout-slice"

export default configureStore({
  reducer: {
    user: loginReducer,
    levels: levelsReducer,
    log: logReducer,
    layout: layoutReducer
  }
})
