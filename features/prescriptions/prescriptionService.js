import axios from "axios"
import globalAxios from '../../axios/index'


const prescribe = async (accessToken, payload) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await globalAxios.post('prescriptions/', payload, config)

    return response.data
}

// Get prescriptions for a particular patient
const getPatientPrescriptions = async (accessToken, patient_id) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await globalAxios.get(`prescriptions-info/?patient_id=${patient_id}`, config)

    return response.data
}

// update prescription
const updatePrescription = async (accessToken, prescriptionUri, payload) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.patch(prescriptionUri, payload, config)

    return response.data
}

const prescriptionService = {
    prescribe,
    getPatientPrescriptions,
    updatePrescription,
}

export default prescriptionService