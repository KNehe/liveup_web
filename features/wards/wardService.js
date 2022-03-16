import globalAxios from '../../axios/index'


const getAllWards = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
        
    const response = await globalAxios.get('wards/', config)

    return response.data
}


const wardService = {
    getAllWards,
}

export default wardService