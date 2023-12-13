import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from '../pages/login/login-slice'
import logReducer from '../components/logs/log-slice.js'
import homeReducer from '../pages/home/home-slice.js'

export default configureStore({
  reducer: {
    user: loginReducer,
    home: homeReducer
  }
})
