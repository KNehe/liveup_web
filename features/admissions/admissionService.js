import axios from "axios"
import globalAxios from '../../axios/index'


const admitPatient = async (accessToken, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await globalAxios.post(`admissions/`, data, config)

    return response.data
}

// Get admissions for a particular patient
const getAdmissions = async (accessToken, patient_id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await globalAxios.get(`admissions-info/?patient_id=${patient_id}`, config)

    return response.data
}

const updateAmission = async (accessToken, admissionUri, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.patch(admissionUri, data, config)

    return response.data
}

const admitService = {
    admitPatient,
    getAdmissions,
    updateAmission,
}

export default admitService