import React, { useEffect, useState } from 'react'
import Input from '../../ui/Input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signAdminSuccess, signUserSuccess } from '../../slice/auth'

const Adminlogin = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const {data} = await axios('http://localhost:3200/Admin')
    console.log(data);
    if (email === data.email && password === data.password) {
      dispatch(signAdminSuccess(data))
      
          navigate('/')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='mt-5 form-signin w-25 m-auto' >
      <Input setState={setEmail} label={"Email address"}/>
<Input setState={setPassword} label={"password"}/>
      <button  className='btn btn-primary w-100'>Login</button>
    </form>
  )
}

export default Adminlogin