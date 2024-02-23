import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AuthService from './services/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getviewers, logoutUser, setsuccessusers, signUserSuccess } from './slice/auth';
import ArticleService from './services/article';
import { getItem, removeItem } from './componnets/helpers/persistance-storage';
import { getArticlePrice, getArticlesStart, getArticlesSuccess } from './slice/article';
import ArticleDetail from './componnets/Admin/about-articles/article-detail';
import CreateArticle from './componnets/Admin/about-articles/create-acticle';
import EditArticle from './componnets/Admin/about-articles/edit-article';
import Main from './componnets/Admin/Main';
import Profice from './componnets/pages/profile';
import Login from './componnets/authorization/Login'
import Register from './componnets/authorization/Register'
import Formalization from './componnets/authorization/formalization'
import { ServicePrice } from './services/price';
import EditAboutUs from './componnets/Edit-AboutUs';
import Navbar from './componnets/Section/Header/Navbar';
import Description from './componnets/Description'
import Admin from './componnets/Admin/about-articles/admin';
import Adminlogin from './componnets/Admin/Admin.login';
import axios from 'axios';
import Footer from './componnets/Section/Footer/footer';
import Reviews from './componnets/navbar/reviews';

function App() {
const color = 'black'
const {loggedIn,loggedInAdmin,theme,user} = useSelector(state => state.auth)

const dispatch = useDispatch()
const [state,setstate] = useState()
const navigate = useNavigate()
const getUser = async () => {
  try{
    const res = await AuthService.getallusers()
    dispatch(setsuccessusers(res))
    const resss = await axios.get('http://localhost:3200/viewers')
    dispatch(getviewers(resss.data))
    console.log(res);
    const responce = await AuthService.getUser()
    dispatch(signUserSuccess(responce))
    setstate(responce.username)
  }catch(error){
    console.log(error);
    removeItem('token')
    dispatch(logoutUser())
    navigate('/login')
  }
}
const getAdmin = async () =>{
  try {
   const token = getItem('token')
    const {data} = axios(`http://localhost:3200/Admin?token=${token}`)
    console.log(data);
  } catch (error) {
    
  }
}
const getArticles = async ()=>{
  dispatch(getArticlesStart())
  try {
    const response = await ArticleService.getArticles()
    const res = await ServicePrice.getPrice()
    dispatch(getArticlePrice(res))
    dispatch(getArticlesSuccess(response))
  } catch (error) {

    console.log(error);
  }
}

useEffect(()=>{
  const token = getItem('token')  
  if (token) {
    getUser()
  }
  getArticles()
},[])


  return (
    <div style={{color:color}} className={'App'}>
      <div className='head'>
<Navbar/>
      </div>
    <main className='main'>
    <Routes>
      <Route path='/desc' element={<Main/>}/>
      <Route path='/*' element={<div>Not found </div>}/>
      <Route path='/formalization/:description/:id/:slug' element={<Formalization/>}/>
      <Route path='/Admin' element={<Adminlogin/>}/>
      <Route path='/reviews' element={<Reviews/>}/>

      <Route path='/profile' element={<Profice/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/article/:id' element={<ArticleDetail/>}/>
      <Route path='/edit-aboutus/:id' element={<EditAboutUs/>}/>
        <Route path='/' element={<Description/>}/>
        <Route path='/edit-article/:id' element={state === "faruh" ? <EditArticle/> : <div>Not fount</div>}/>
        <Route path='/create-article' element={state === "faruh" ? <CreateArticle/> : <div>Not fount</div>}/>
    </Routes>
    </main>
    <div className='footer'>
      <Footer/>
    </div>
    </div>
  );
}

export default App;
