import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/v1/'

const getPatientsRegisteredByReceptionist = async (url, accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    let api_url;
    if (url) {
        api_url = url
    } else {
        api_url = API_URL + 'receptionist-patients/'
    }
    const response = await axios.get(api_url, config)

    return response.data
}

const updatePatientDetails = async (accessToken, patientUri, patientDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    const response = await axios.patch(patientUri, patientDetails, config)

    return response.data
}

const registerPatient = async (accessToken, patientDetails) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    const response = await axios.post(API_URL + 'patients/', patientDetails, config)

    return response.data
}

const deletePatient = async (accessToken, patient_uri) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const response = await axios.delete(patient_uri, config)

    return response.data
}


const patientService = {
    getPatientsRegisteredByReceptionist,
    updatePatientDetails,
    registerPatient,
    deletePatient,
}

export default patientService