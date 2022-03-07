import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/v1/'

const getAllClinicians = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.get(`${API_URL}clinicians/`, config)

    return response.data
}


const clinicianService = {
    getAllClinicians,
}

export default clinicianService