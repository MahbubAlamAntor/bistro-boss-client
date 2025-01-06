import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {signOutHandle} = useAuth();
    const navigate = useNavigate();
    
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log(token);
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // interceptor 401 and 403 status

    axiosSecure.interceptors.response.use(function(response) {
        return response
    }, async(error) => {
        const status = error.response.status;
        // for the 401 and 403 logout the user  and move the user to the login page
        if(status === 401 || status === 403){
            await signOutHandle();
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;