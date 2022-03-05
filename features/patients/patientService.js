import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/v1/'

const getPatientsRegisteredByReceptionist = async (url, accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    
    const api_url = url ? url : API_URL + 'receptionist-patients/'
    
    const response = await axios.get(api_url, config)

    return response.data
}


const patientService = {
    getPatientsRegisteredByReceptionist
}

export default patientService