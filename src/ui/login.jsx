import axios from 'axios'
import React, { useState } from 'react'

const Loginn = () => {
  const [email,setemail] = useState()
  const [password,setpassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const res = await axios.post('http://localhost:3000/src/ui/login_process',{email:email,password:password})
    } catch (error) {
      
    }
  }
  return (
    <form  action='register_process.php' method='post' className='d-flex row w-50 mx-auto  align-items-center'>
        <input  type="text" name="email"  id="email" />
        <input  type="password" name="password"  id='password'/>
        <button type='submit' className='btn btn-success'>post</button>
    </form>
  )
}

export default Loginn