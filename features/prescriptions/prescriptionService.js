import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/v1/'

const prescribe = async (accessToken, payload) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.post(`${API_URL}prescriptions/`, payload, config)

    return response.data
}


const prescriptionService = {
    prescribe,
}

export default prescriptionService