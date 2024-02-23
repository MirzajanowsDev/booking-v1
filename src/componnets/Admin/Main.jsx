import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Loader from '../../ui/loader'
import ArticleService from '../../services/article'
import { getArticlesSuccess } from '../../slice/article'
import './Main.css'
import  Card  from '../Card/Card'
import Select from '../../ui/select'
import AuthService from '../../services/auth'
import{signUserSuccess } from '../../slice/auth'
const Main = () => {

  const dispatch = useDispatch()
  const {isLoading,articles} = useSelector(state => state.article)
  const navigate = useNavigate()
  
  const [state,setstate] = useState("")
 const {loggedIn,user} = useSelector(state => state.auth)
 const [description,setdescription] = useState("Все")
 const [modalIsOpen, setModalIsOpen] = useState(false);
 const [selectedPost, setSelectedPost] = useState(null);
useEffect(()=>{
   
},[])

 const openModal = (postId) => {
   setSelectedPost(postId)
   setModalIsOpen(true)
 }; 

 const closeModal = () => {
   setModalIsOpen(false);

 };
 const closeModalRequest = async() => {
  try{
    const getuser = await AuthService.getUser(user.token)
    const response = await ArticleService.getArticlesDetail(selectedPost);
    const currentPost = response;
    currentPost.favorited = "Забронирован"
    currentPost.color = "rgb(255, 204, 0)"
    currentPost.userId =  user.id
    
    const addToHistory = (action, timestamp = new Date().toISOString()) => {
      getuser.history.push({ action, timestamp });
    };
    addToHistory(`забронировал ${response.title} `)
    const rses =  await AuthService.patchuser(user.id,getuser)
    dispatch(signUserSuccess(rses))
    const responc = await ArticleService.patchArticle(selectedPost,
      currentPost
     )
    const res = await ArticleService.getArticles()
 dispatch(getArticlesSuccess(res))


     setModalIsOpen(false);

   }catch(error){
     console.log(error);
   }


 };
 useEffect(()=>{
  
 const getArticle = async() => {
  
  try {
    const response = await ArticleService.getArticles()
   const result =  response.sort((a, b) => a.title - b.title);
    dispatch(getArticlesSuccess(result))
  } catch (error) {
    console.log(error);
  }
  }

  getArticle()
  },[])

  return !user ? <Loader/> :(
  <div>

    {
      modalIsOpen ? <div className="modals bg-body-secondary ">
      <div class="modal-dialog" role="document">
      <div class="modal-content rounded-3 shadow">
        <div class="modal-body p-4 text-center">
          <h5 class="mb-0">Вы хотите забронировать?</h5>
        </div>
        <div class="modal-footer flex-nowrap p-0">
          <button type="button" onClick={closeModalRequest} class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"><strong>Да</strong></button>
          <button type="button" onClick={closeModal} class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0">Не</button>
        </div>
      </div>
    </div>
      </div>  : ""
    }
    {user.username === "faruh" ? (
      <div>


      <div className='container'>
        <Select setdescription={setdescription}/>

    </div>
      <div class="album py-5 bg-body-tertiary container">
       <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3  row-cols-xl-4 g-3 align-items-stretch">
       {articles && articles.map(el => {
         if (el.description === description) {
           
           return ( 
            <Card item={el}/>
          )
        } else if (description === "Все"){
          return (
            <Card item={el} openModal={openModal}/>
          )
        }
        
      })}
  
                    </div>
                    </div>
      </div>
      ) 
      : <div >
        {user.isSelect ?
          <div className='container album'>

        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3  row-cols-xl-4 g-3 align-items-stretch'>
          {articles.map(el => {
            if (el.userId === user.id) {
              return<div className='col'>
              <Card item={el}/> 
              </div>
            }
          })}
          </div>
        </div>
        :
        <div className='row row-cols-1 row-cols-lg-4 align-items-stretch container mx-auto'>
      {articles && articles.map(el => {
        if (el.favorited !== "Оформлен") {
          return <Card item={el} openModal={openModal}/>
          
        }
      })}
      </div>
    }
    </div>
    
    }
      </div>
      
  )
}

export default Main