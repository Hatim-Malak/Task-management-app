import axios from "axios"

export const axiosInstance = new axios.create({
    baseURL:import.meta.env.MODE ==="development"? 'http://localhost:5000/api':"https://starlit-stationary-backend.onrender.com/api",
    withCredentials:true,
})