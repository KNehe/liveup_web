import {RECEPTIONIST, STUDENT_CLINICIAN, DOCTOR, NURSE} from '../utils/roles'

const CLINICIAN_ROLES = [DOCTOR, NURSE, STUDENT_CLINICIAN]

const useNavigator = (router, authDetails) => {
    if (CLINICIAN_ROLES.includes(authDetails?.user?.role)) {
        router.replace('/medics')
    } else if (authDetails?.user?.role === RECEPTIONIST) {
        router.replace('/receptionists')
    } else {
        router.replace('/login')
    }
}

export {useNavigator}