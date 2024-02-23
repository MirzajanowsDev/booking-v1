import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Router, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import { removeItem } from '../../helpers/persistance-storage'
import { logoutUser, switchthemer } from '../../../slice/auth'
import { Modal } from 'bootstrap'
import Input from '../../../ui/Input'
import axios from 'axios'
import GetCurrentTime from '../../../ui/getcuurentTime'
import moment from 'moment'

const Navbar = () => {
  const time = new Date()

  const {loggedIn , user} = useSelector(state => state.auth)
  const users = {...user}
  const [name,setname] = useState()
  const [emailadress,setemail] = useState()
  const [password,setpassword] = useState()
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);
  const [isprofile,setprofile] = useState(false)
  const [drag,setdrag] = useState(true)
  

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';

    setModalOpen(false);
  };

  const [state,setstate] = useState(false)
  const [active,setactive] = useState(true)
  const dispatch = useDispatch()
  
    const loggouthandle = async() =>{
          
        removeItem('token')
        dispatch(logoutUser())
      navigate('/login')
      
    }
  return (
    <div className='header_nav position-fixed'>
        <header className="d-flex p-4 flex-wrap justify-content-between  align-items-center py-3 container">
   <div>
     <Link style={{textDecoration:"none"}} to={'/'}>
    <div className='d-flex'>
    <img width={90} src="https://res.cloudinary.com/admitad-gmbh/image/upload/v1557915446/tl1yzp6kkf1srgvhyvow.png" alt="" />
    </div>
   </Link>
  
   </div>
    
    <div className={state ? "overlay" : ''}>
      {loggedIn ? (
        
        <div className={`d-flex align-items-center ${state ? "usernav active" : "usernav" }`}>
      <Link to={'/reviews'} className='btn mx-1 '>Отзывы</Link>
          
        <button onClick={openModal} className='btn'>История</button>
      <Link to={'/desc'} className='btn mx-1 '>Квартиры</Link>
       
        {user.username == 'faruh' ? 
        
        <Link to={'/create-article'} className='btn'>Добавить кв</Link>: ''}
        
        <button onClick={loggouthandle} className={'logout'}>Выйти</button>
        
        </div>
      ) :
      (
        
        <ul className="nav nav-pills">
        <Link to={'/login'}  onClick={()=> setactive(true)} className={`nav-item nav-link ${active ? 'active': "active"}`}>Login</Link>
        <Link to={'/register'} onClick={()=> setactive(false)} className={`nav-item nav-link ${active ? '': ''}`}>Register</Link>
        
        </ul>
        )}
        </div> 
        <div onClick={() => setstate(prev => !prev)} className={state ? "burger active": 'burger'}>
<span></span>
<span></span>
<span></span>
        </div>
        </header>
       {
        isModalOpen && user ?
        <div onClick={closeModal}  className='modals__overlay'>
          <div className='modal__content' onClick={(e) => e.stopPropagation()}>

         <div className='col p-4 position-relative overflow-y-auto'>
          <h1 className='pb-4 text-center text-black-50'>История</h1>
          {user.history.map(({action,timestamp}) => {

           return<div className='d-flex justify-content-between text-black'>
           <div>
           {action}
           </div>
           <div>
            {moment(timestamp).format('DD MMM, YYYY')} 
          
            </div>
           </div>

          })}
          </div> 
          <button className=' position-absolute btn-close btn-closer ' onClick={closeModal}>
          </button>
          </div>
          
        </div> :''
       }
    </div>
  )
}

export default Navbar