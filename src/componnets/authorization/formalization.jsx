import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ArticleService from '../../services/article'
import { setArticlesSuccess } from '../../slice/article'
import AuthService from '../../services/auth'
import AddToHistory from '../../ui/addtohistory'
import { signUserSuccess } from '../../slice/auth'
import RentApartment from '../../ui/Rantmentpayment'

const Formalization = () => {
  const dispatch = useDispatch()
  
  const {user} = useSelector(state => state.auth)
  const {id,slug,description} = useParams()
    const {articles_price} = useSelector(state => state.article)
    const navigate = useNavigate()
    const [state,setState] = useState()
    const putuser = {...user}
    const [startDate, setStartDate] = useState(new Date());
  const [paymentType, setPaymentType] = useState('month'); // По умолчанию оплата в месяц

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };
    const {handleSubmit,register,formState,control} = useForm({mode:"onChange"})
    useEffect(() => {
      if (articles_price && articles_price.length > 0) {
        switch (description) {
          case "Эконом":
            setState(articles_price[0]?.title);
            break;
          case "Комфорт":
            setState(articles_price[1]?.title);
            break;
          default:
            setState(articles_price[2]?.title);
            break;
        }
      }
    }, [description, articles_price]);

    const onSubmit = async(data) => {
      const article = {
        color:'#FF0000',    
        favorited:"Оформлен",
        ...data,
        createdAt:new Date().toISOString(),
        userId:user.id,
        lodger:user.username,
        
      }
      
      if (!articles_price) {
        return <div>Loading...</div>
      }
      
      putuser.isSelect = true
      
      // addToHistory(`Вы успешно оформили ${id} комнату`)
      const res = await AuthService.patchuser(user.id,putuser)
      const post = await axios.post('http://localhost:3200/Wallet',{userId:putuser.id,amount:data.password})
      const responce = await ArticleService.patchArticle(slug,article)
      dispatch(setArticlesSuccess(responce))
      navigate('/desc')
      
    }
    
    return user !== null &&(
    <div class="row g-5">
    <div class="col-md-5 col-lg-4 order-md-last">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
      </h4>
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 class="my-0">Тип кв : {description}</h6>
            <small class="text-body-secondary">Brief description</small>
          </div>
          <span clas    s="text-body-secondary">{paymentType === "month" ? `в месяц $${state}` : `в день ${state}`}</span>
        </li>
        
        
        <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
          <div class="text-success">
            <h6 class="my-0">Promo code</h6>
            <small>EXAMPLECODE</small>
          </div>
          <span class="text-success">-$0</span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>${state}</strong>
        </li>
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} class="card p-2">
        <div class="input-group">
          <input {...register('promo')} type="text"  class="form-control" id='promocode' placeholder="Promo code"/>
          <button  type="submit" id='Promobtn' class="btn btn-secondary">Redeem</button>
        </div>
      </form>
    </div>
    <div class="col-md-7 col-lg-8">

      <h4 class="mb-3">Оформление</h4>
      <form onSubmit={handleSubmit(onSubmit)} class="needs-validation">
        <div class="row g-3">
         

        <div>   
    

  </div>
          <div class="col-12">
            <label  for="number" class="form-label">Номер квартиры <span class="text-body-secondary">(обязательно)</span></label>
            <input type="number" value={id} class="form-control" id="email" placeholder=""/>
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
          
          <div class="col-12">
            <label  for="email"  class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
            <input type="email" {...register('email',{ required : true, pattern: /^\S+@\S+$/i})} value={user.email} class="form-control" id="email" placeholder="you@example.com"/>
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

        
        </div>


      


        <div class="row gy-3">
          <div class="col-md-6">
        <h4 class=" mt-2">Оплата</h4>
            <label for="cc-number" class="form-label">Введите сумму</label>
            <input {...register('number',{ required : true, min:state})} value={paymentType === "month" ? state : ''} type="text" class="form-control" id="cc-number" placeholder="" required=""/>
            <div class="invalid-feedback">
              Credit card number is required
            </div>
          </div>

        
        </div>

        <button class="w-100 btn mt-4 btn-primary btn-lg" disabled={!formState.isValid} type="submit">Оплатить</button>
      </form>
    </div>
  </div>
  )
}

export default Formalization