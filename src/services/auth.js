import { getItem } from "../componnets/helpers/persistance-storage"
import axios from "./api"

const AuthService = {
    async userRegister(user){
        const {data} = await axios.post('/users',user)
        return data

    },
    async getallusers(user){
        const {data} = await axios('http://localhost:3200/users')
        return data
    },
    async userLogin(user){
        const {data} = await axios.post('/users/login',{user})
        return data
    },
    async patchuser(id,user){
        const {data} = await axios.put(`http://localhost:3200/users/${id}`,user)
        return data
    },
    async getUser(){
            const token = getItem('token')
            const {data} = await axios.get(`http://localhost:3200/users?token=${token}`)
            return data[0]
        
        
    },
    
}
export default AuthService