import axios from 'axios'
import { toast } from 'react-toastify';

const LOCAL_API_URL = 'http://127.0.0.1:8000/api/v1/'
const HOSTED_API_URL = 'https://nehe-liveup-api.herokuapp.com/api/v1/'
const CURRENT_API_URL = HOSTED_API_URL

const instance = axios.create({
    baseURL: CURRENT_API_URL
})
instance.interceptors.response.use(function(response){
    return response
}, function (error) {
    if (error?.message == 'Network Error')
    {
        toast.error('Network error')
        return
    }
    if (error?.response?.status === 401)
    {
        toast.error('Session expired')
        window.location = '/login'
        return
    }

    return Promise.reject()
});

export {CURRENT_API_URL}
export default instance