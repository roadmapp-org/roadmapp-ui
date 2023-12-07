import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from './slices/login-slice'

export default configureStore({
  reducer: {
    user: loginReducer
  }
})
