import axios from "axios";

const api = axios.create({
    baseURL: "http://4.187.183.182/",
    headers:{
        'Content-Type':'application/json'
    }
})

// Interceptor
api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

export default api;