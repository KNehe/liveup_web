import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import patientReducer from '../features/patients/patientSlice'

export const store =  configureStore({
    reducer: {
        auth: authReducer,
        patient: patientReducer
    }
})