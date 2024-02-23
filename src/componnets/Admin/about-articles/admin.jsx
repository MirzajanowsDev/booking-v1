import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Admin = () => {
    const [users,setusers] = useState()
   
    const getAllusers = async() =>{
            const {data} = await axios('http://localhost:3200/users')
            setusers(data)

    } 
    useEffect(()=>{
getAllusers()
    },[])

  return (

    <div>
        {users && users.map(el => {

            return <div className=' p-3 d-flex justify-content-between align-items-center bg-body-secondary'>
            <p className='text-primary mx-2'> id: {el.userId}</p>
            <p>username :{el.username}</p>
            <p>E-mail :{el.email}</p>
            <p>password:{el.password}</p>
                </div>
        })}
    </div>
  )
}

export default Admin