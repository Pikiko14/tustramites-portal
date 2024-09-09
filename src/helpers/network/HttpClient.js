import axios from 'axios'
import LocalStorage from '../storage/LocalStorage'

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://api.tustramitesvip.com,http://localhost:4000'
      }
})

httpClient.interceptors.request.use(function (config) {
    const token = LocalStorage.getToken()
    config.headers.Authorization =  token ? `Bearer ${token}` : ''
    return config
})

export default httpClient
