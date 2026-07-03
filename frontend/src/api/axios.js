import axios from "axios"

export const BaseURL = import.meta.env.VITE_BASE_URL

export const getCSRF = async () => {
    await axios.get(`${BaseURL}/sanctum/csrf-cookie`, {
        withCredentials: true
    })
}

const appURL = import.meta.env.VITE_APP_URL
export default axios.create({
    baseURL: appURL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
})