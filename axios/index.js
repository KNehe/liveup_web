import axios from 'axios'
import { toast } from 'react-toastify';

const LOCAL_API_URL = 'http://127.0.0.1:8000/api/v1/'
const HOSTED_API_URL = 'http://127.0.0.1:8000/api/v1/'

const instance = axios.create({
    baseURL: LOCAL_API_URL
})
instance.interceptors.response.use(function(response){
    return response
}, function (error) {
    if (error.response.status === 401)
    {
        toast.error('Session expired')
        window.location = '/login'
        return
    }
    if (error.message === 'Network Error')
    {
        toast.error('Network error')
        return
    }
    return Promise.reject()
});


export default instance