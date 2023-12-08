import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from '../pages/login/login-slice'

export default configureStore({
  reducer: {
    user: loginReducer
  }
})
