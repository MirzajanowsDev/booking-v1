import React, { useEffect, useState } from 'react'
import Input from '../../../ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { articleSlice, getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess, getArticlesSuccess } from '../../../slice/article'
import { createBrowserRouter, unstable_HistoryRouter, useLocation, useNavigate, useParams } from 'react-router-dom'
import ArticleService from '../../../services/article'
import { useForm } from 'react-hook-form'
const EditArticle = () => {
  const [title,setTitle] = useState('')
  const [description,setdescription] = useState('')
  const [body,setbody] = useState('')
  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const {register,handleSubmit} = useForm()
  const {articleDetail} = useSelector(state => state.article)
  const [state,setState] = useState()
  const {id} = useParams()
  console.log(id);
  const dispatch = useDispatch()
  const getArticlesDetail = async () => {
    const article = await ArticleService.getArticlesDetail(id)
    setTitle(article.title)
    setbody(article.body)
    setdescription(article.description)
    dispatch(getArticleDetailStart())
    console.log(article);
    setState(article.favorited)
    try {
      dispatch(getArticleDetailSuccess(article))
      
    } catch (error) {
      dispatch(getArticleDetailFailure())
      
    }
  }
  const handleSwitch = () => {
    
  }
  
  
  const onsubmit = async(e)=> {
    e.preventDefault()
    const article = {
      title,
      body,
      description:description,
  
    }
    try {
      ;
      const responce = await ArticleService.patchArticle(id,article)
      console.log(responce);
      getArticleDetailSuccess(responce)
      navigate(-1)
      
    } catch (error) {
     console.log(error); 
    }
   }
     useEffect(()=>{
       getArticlesDetail()
       
       },[])
  return (
    <div className='container text-center'>
        <h1>EditArticle</h1>
        <div className='w-75 mx-auto'>
      {articleDetail !== null && (

        <form onSubmit={e=>onsubmit(e)}>
     
        <Input register={register} state={title} setState={setTitle} label={"Название квартиры"}/>

        <Input state={body} setState={setbody} label={"Сколько мест"}/>
        <select class="form-select"  value={description} onChange={(e) => setdescription(e.target.value)} aria-label="Default select example">
  <option selected>Тип квартира</option>
  <option value="Эконом">Эконом</option>
  <option value="Комфорт">Комфорт</option>
  <option value="Премиум">Премиум</option>
</select>
        
        <button className='btn btn-primary w-100'>Сохранить</button>
       </form>
          )}
         
        </div>
    </div>
  )
}

export default EditArticle