import globalAxios from '../../axios/index'


const getAllClinicians = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await globalAxios.get('clinicians/', config)

    return response.data
}


const clinicianService = {
    getAllClinicians,
}

export default clinicianService