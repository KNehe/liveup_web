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


const admitService = {
    admitPatient,
}

export default admitService