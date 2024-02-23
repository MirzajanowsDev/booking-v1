import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ArticleService from '../services/article'
import AuthService from '../services/auth'
import { authSlice } from '../slice/auth'
    
const AddToHistory = ({text}) => {
        const {user} = useDispatch(state => state.auth)        
        const addToHistory = async(action, timestamp = new Date().toISOString()) => {
            const newdata = {action,timestamp}
            const updatedData = [...user.history,newdata]
            const updatedUser = {...user,history:updatedData}
            const res = await AuthService.patchuser(user.id,updatedUser)
        };
        
        useEffect(() => {
            addToHistory(text)
        },[])     
        return (
            <div></div>
        )
    }
    
    export default AddToHistory
