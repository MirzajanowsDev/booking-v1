import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import './review.css'
import moment from 'moment'
const Reviews = () => {
  const {user,viewers} = useSelector(state => state.auth)
  const {register,handleSubmit,formState} = useForm({mode:"onChange"})
  const [state,setstate] = useState()
const onSubmit = async(data) => {
  const newrew = {
      user:user.username,
      ...data,
      data:new Date().toISOString()
  }

  const res = await axios.post('http://localhost:3200/viewers',newrew)

}
useEffect(()=>{
  const getviewers = async() => {

  }
  getviewers()
},[])
  return (
    <div className='container mt-5'>
        <form onSubmit={handleSubmit(onSubmit)} className='d-flex rewiew-form'>
            <input type="text"
              maxLength={130}
            {...register('review',{
              required:true,
              maxLength:130,
            })} className='w-50' id='message'/>
            <button type='submit' className='btn btn-primary'>Отправить</button>

        </form>
        <section>
          <h3 className='mt-5'>Отзывы:</h3>
          <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 align-items-stretch mt-2'>
            {viewers && viewers.map(el => {
              return <div className='view-card card p-4'>
                <div className=' card-dy d-flex align-items-center '>
                <img src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png" className='w25' alt="" />
                <strong className='mx-2'>{el.user}</strong>
                {moment(el.data).format('DD MMM, YYYY')} 
                </div>
                <div className='mt-3'>
                <p>{el.review}</p>
                </div>

              </div>
            })}
          </div>
        </section>
        </div>
  )
}

export default Reviews