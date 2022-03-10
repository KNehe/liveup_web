import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/v1/'

const admitPatient = async (accessToken, data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.post(`${API_URL}admissions/`, data, config)

    return response.data
}

// Get admissions for a particular patient
const getAdmissions = async (accessToken, patient_id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.get(`${API_URL}admissions-info/?patient_id=${patient_id}`, config)

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