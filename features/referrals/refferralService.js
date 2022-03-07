import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/v1/'

const referPatient = async (accessToken, referral) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.post(`${API_URL}referrals/`, referral, config)

    return response.data
}


const referralService = {
    referPatient,
}

export default referralService