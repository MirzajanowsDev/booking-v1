import React, { useEffect, useState } from 'react'
import Input from '../../ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserFailure, loginUserStart, loginUserSuccess, signUserFailure, signUserStart, signUserSuccess } from '../../slice/auth'
import AuthService from '../../services/auth'
import ValidationError from './validation.error'
import { useNavigate } from 'react-router-dom'
import { testuser } from './testregister'
import ArticleService from '../../services/article'
import axios from 'axios'
import article from '../../slice/article'

const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,seterror] = useState()
   const dispatch = useDispatch()
  const {isLoading,loggedIn} = useSelector(state => state.auth)
  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const data = {email,password}
    try {
      const responce = await testuser(email,password)
      console.log(responce);
if (responce.length === 1) {
  const addToHistory = (action, timestamp = new Date().toISOString()) => {
    responce[0].history.push({ action, timestamp });
  };
  addToHistory('Вы успешно вошли в Аккаунт')
  const res = AuthService.patchuser(responce[0].id,responce[0])
  dispatch(signUserSuccess(responce[0]))
  navigate('/')
  
}else if(responce){
seterror("логин или пароль неправильно")
}
      // const responce = await AuthService.userLogin(data)
      console.log(responce);
    } catch (error) {
      // dispatch(signUserFailure(error.response.data.errors))
      // console.log(error.response.data);
    }
  }
  useEffect(()=>{
    if(loggedIn){
      navigate('/')
    }
  },[loggedIn])
  return (
    <div>
    <main className="mt-5 form-signin w-25 m-auto container">
<form onSubmit={(e)=> handleSubmit(e)}>
<img className="mb-4 mx-auto" src="https://sammi.ac/favicon.svg
" alt="" width="72" height="57"/>
<h1 className="h3 mb-3 fw-normal">Please Login</h1>
<p className='text-danger bg-danger-subtle'>{error}</p>
<Input setState={setEmail} label={"username"}/>
<div className="form-floating">
      <input  required={true} value={password} onChange={e => setPassword(e.target.value)}type="password" className="form-control mb-1" id="floatingPassword" placeholder={"password"}/>
      <label className='mx-2 ' htmlFor="floatingPassword">password</label>
    </div>
<button className="btn btn-primary w-100 py-2"  type="submit">{
  isLoading ? 'Loading...' : 'Loading'
}</button>
</form>
</main>
</div>
  )
}

export default Login