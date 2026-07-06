import axios from "axios"

export const BaseURL = import.meta.env.VITE_BASE_URL

// export const getCSRF = async () => {
//     await axios.get(`${BaseURL}/sanctum/csrf-cookie`, {
//         withCredentials: true
//     })
// }

const appURL = import.meta.env.VITE_APP_URL

const api = axios.create({
    baseURL: appURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api 