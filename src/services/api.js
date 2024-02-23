import axios from "axios";
import { getItem } from "../componnets/helpers/persistance-storage";


axios.defaults.baseURL = 'http://localhost:3200'
 axios.interceptors.request.use(config => {
     const token = getItem('token')
   
    const authorization = token ? `Token ${token}` : ''
    config.headers.Authorization = authorization
    return config
    })
export default axios