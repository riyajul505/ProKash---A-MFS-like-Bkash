import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.interceptors.response.use((res)=>{
            return res
        }, (error)=>{
            console.log('this is from axiosSecure', error);
            if(error.response.status == 401 || error.response.status == 403){
                // clear the token
                axiosSecure.get('/clear-token')
                navigate('/');
            }
        })
    },[])
    return axiosSecure;
};

export default useAxiosSecure;