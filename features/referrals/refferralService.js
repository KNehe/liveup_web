import axios from "axios"
import globalAxios from '../../axios/index'


const referPatient = async (accessToken, referral) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await globalAxios.post('referrals/', referral, config)

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


const getReferralsForPatient = async (accessToken, patientId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
    const response = await globalAxios.get(`referrals-info/?patient_id=${patientId}`, config)

    return response.data
}
const referralService = {
    referPatient,
    updateReferral,
    getReferralsForPatient,
}

export default referralService