import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/v1/auth/'

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login/', userData)

    if (response.data) {
        localStorage.setItem('authDetails', JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    login
}

export default authService