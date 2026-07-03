import axios from "axios"

export const BaseURL = "http://localhost:8000"

export const getCSRF = async () => {
    await axios.get(`${BaseURL}/sanctum/csrf-cookie`,{
        withCredentials: true
    })
}

export default axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
})