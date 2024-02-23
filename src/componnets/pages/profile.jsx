import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AuthService from '../../services/auth'
import { signUserSuccess } from '../../slice/auth'
import { getItem } from '../helpers/persistance-storage'
import Post from '../../ui/moments'
import article from '../../slice/article'
import { Link } from 'react-router-dom'

const Profice = () => {
   const {user} = useSelector(state => state.auth)
    const getarticle = async() => {
         // const res = await axios(`ttp://localhost:3200/articles?userId=${user.id}`)
         // console.log(res);
      }
    useEffect(()=>{
getarticle()
    },[])
    const {acticles,articleStatus} = useSelector(state => state.article)
    

    const [state,setState] = useState()
// useEffect(()=>{
//     const setImageProfile =async () => {
//         const responce = await AuthService.getUser('/user')
//         signUserSuccess(responce.user)
//     }  
//     setImageProfile()
// },[])

   return (user !== null && <div class="p-3 bg-body-tertiary d-flex  rounded-3 container-fluid"> 
   <div className=''>
   <h1>username : {user.username}</h1>
    <p>email : {user.email}</p>
   </div>
  </div>
       
  )
}

export default Profice