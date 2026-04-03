import axios from "axios"

export const axiosInstance = new axios.create({
    baseURL:import.meta.env.MODE ==="development"? 'http://localhost:5000/api':"https://task-management-app-ats0.onrender.com/api",
    withCredentials:true,
})