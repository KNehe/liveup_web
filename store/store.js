import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import patientReducer from '../features/patients/patientSlice'
import clinicianReducer from '../features/clinicians/clinicianSlice'
import referralReducer from '../features/referrals/refferralSlice'
import statsRedcuer from '../features/stats/statSlice'
import pageReducer from '../features/pages/pageSlice'
import assignedPatientReducer from '../features/patients/assigned_patientsSlice'
import wardReducer from '../features/wards/wardSlice'
import admissionReducer from '../features/admissions/admissionSlice'


export const store =  configureStore({
    reducer: {
        auth: authReducer,
        patient: patientReducer,
        clinician: clinicianReducer,
        referral: referralReducer,
        stat: statsRedcuer,
        page: pageReducer,
        assigned: assignedPatientReducer,
        ward: wardReducer,
        admit: admissionReducer
    }
})