import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ArticleService from '../../../services/article';
import { useDispatch, useSelector } from 'react-redux';
import article, { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess, setArticlesSuccess } from '../../../slice/article';
import  Carousel  from '../../../ui/carousel/carousel';
import AuthService from '../../../services/auth';
import DatePickerComponent from '../../../ui/dashboard/datapicker';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ArticleDetail = () => {
  const { register, formState } = useForm({mode:"onChange"});
  const {articleDetail,articles} = useSelector(state => state.article)
  const {articles_price} = useSelector(state => state.article)
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

   
  const navigate = useNavigate()
  const {user} = useSelector(state => state.auth) 
    const {id} = useParams()  
    const putuser = {...user}
    const dispatch = useDispatch()
    const getArticlesDetail = async () => {
      const responce = await ArticleService.getArticlesDetail(id)
      dispatch(getArticleDetailStart())
      try {
      dispatch(getArticleDetailSuccess(responce))
        
      } catch (error) {
      dispatch(getArticleDetailFailure())
        
      }
    }
    useEffect(()=>{
      getArticlesDetail()
    },[])
    const handleSubmit = async(e) =>{
      const addToHistory = (action, timestamp = new Date().toISOString()) => {
        putuser.history.push({ action, timestamp });
      };
      addToHistory(`Вы забронили № ${articleDetail.title}`)

      e.preventDefault()
      const article = {
        favorited:"Оформлен",
        createdAt:new Date().toISOString(),
        userId:user && user.id,
        lodger:user && user.username,
        
        
      }
   
      const res = await AuthService.patchuser(user.id,putuser)
      const responce = await ArticleService.patchArticle(id,article)
      dispatch(setArticlesSuccess(responce))
      navigate('/desc')
      
    }
    const onlyNumbers = (value) => /^\d*$/.test(value);
    
    
  
  return articleDetail !== null && user !== null && (
    <div className='container'>
      <div className=' bg-body-secondary p-3 mb-4 rounded-3 content-article '>
     {/* {user.username === "faruh" &&(

       <div className="sidebar rounded-3 col  bg-body-secondary">
        <div className='sidebar w-100'>
          <ul className='text-center   overflow-y-auto list-unstyled'>
            {articles.map(el => {
              return <li onClick={()=> navigate(`/article/${el.id}`)} className='sidebar-li  p-3'>{el.title}</li>
            })}
          </ul>
        </div>
        
      </div>
          )} */}

        <div className="pb-5 px-4 col">
          <h5 className="display-5 fw-bold">Номер {articleDetail.title}</h5>
          <p className="col-md-8 fs-4">Тариф {articleDetail.description}</p>
          <p>
          Площадь: 30 кв. м.
          </p>
         {articleDetail.lodger?
           <p>Квартирант :{articleDetail.lodger}</p>
         : ''}
        <div>{articleDetail.body}</div>
        </div>
        <div className='col'> 
        <Carousel/>
        </div>
      </div>
        <div className="abouts d-flex ">
          <form onSubmit={handleSubmit} className='payment d-flex row  col mx-auto'>
            <p>в сутку <strong>$ {articleDetail.price}</strong></p>
            <input type="text" 
               {...register('number', {
                required: 'Это поле обязательно',
                minLength:16,
                validate: {
                  
                  onlyNumbers: (value) => onlyNumbers(value) || 'Пожалуйста, введите только цифры',
                },
                
              })}
            className='' placeholder='Введите номер карты' />
            <DatePickerComponent dateRange={dateRange} state={articleDetail}  setDateRange={setDateRange}/>
            <button className='btn btn-primary'  disabled={!formState.isValid}>Оплатить</button>
          </form>
          <form className='viewers bg-body-tertiary w-100 col  shadow-lg'>
           <h1>Оставьте отзыв</h1>
            <div className=''>
            <input type="text"className='w-100' />
            <button className='btn btn-primary mt-3' >Отправить</button>
            </div>
          </form>
        </div> 
    </div>
  )
}

export default ArticleDetail
