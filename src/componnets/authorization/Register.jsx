import React, { useEffect, useState } from 'react'
import Input from '../../ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserStart,registerUserFailure,registerUserStart, registerUserSuccess, signUserFailure, signUserStart, signUserSuccess} from '../../slice/auth'
import AuthService from '../../services/auth'
import ValidationError from './validation.error'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { setItem } from '../helpers/persistance-storage'
import { registerUser, testuser } from './testregister'
import { registeruser } from '../../server/apiregister'
const Register = () => {
  const [erroremail,seterroremail] = useState()
  const [errorpassword,seterrorpassword] = useState()
  const [errorname,seterrorname] = useState()
  
  const [name,setname] = useState('')
  const [emailadress,setemail] = useState('')
  const [password,setpassword] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {isLoading,loggedIn} = useSelector(state => state.auth)

const validateEmail = () => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  seterroremail(emailRegex.test(emailadress) ? '' : "некорректный емайл")
  seterrorpassword(password.length >= 8 ? "" :  "Пароль должен быть не менне символов 8")

}

  const handleRegister =async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {username:name,email:emailadress,password,
    bio:'',
    createdAt:new Date().toISOString(),
      userId:Date.now(),
      token:uuidv4(),
      room:'',
      history:[],
      isSelect:false,
      
    }
    try {
      
      const addToHistory = (action, timestamp = new Date().toISOString()) => {
        user.history.push({ action, timestamp });
      };
      const response = await registeruser(name,user)
      validateEmail()
        seterrorname(response.message)
      if(response.state === true  && erroremail === '' && errorpassword === ""){
        navigate('/')
        addToHistory('Вы успешно зарегистрирововались')
        const {data} = await axios.post('http://localhost:3200/users',user)
        dispatch(signUserSuccess(data))

      }


      // dispatch(signUserFailure(response.message))
      // console.log(response);
      
      // const responce = await AuthService.userRegister(user)
      // console.log(responce);
    } catch (error) {
    }
  }
  useEffect(()=>{
    if(loggedIn){
      navigate('/desc')
    }
    
  },[loggedIn])
  return (
    <div>
              <main className="mt-5 form-signin w-25 m-auto container">
  <form onSubmit={(e) => handleRegister(e)}>
    <img className="mb-4" src="https://sammi.ac/favicon.svg
" alt="" width="72" height="57"/>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <p className='text-danger bg-danger-subtle'>{erroremail}</p>
      <p className='text-danger bg-danger-subtle'>{errorname}</p>
      <p className='text-danger bg-danger-subtle'>{errorpassword}</p>

    <Input setState={setname}  label={"Username"}/>

    <Input setState={setemail} label={"Email address"}/>
    <div className="form-floating">
      <input  required={true} value={password} onChange={e => setpassword(e.target.value)}type="password" className="form-control mb-1" id="floatingPassword" placeholder={"password"}/>
      <label className='mx-2 ' htmlFor="floatingPassword">password</label>
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit"> Register
</button>
  </form>
</main>
    </div>
  )
}

export default Register