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

const updateReferral = async (accessToken, referralUri, referralData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await axios.patch(referralUri, referralData, config)

    return response.data
}

const referralService = {
    referPatient,
    updateReferral,
}

export default referralService