import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import About from '../ui/about'
import { ServicePrice } from '../services/price'
import  Carousel  from '../ui/carousel/carousel';
import { useNavigate } from 'react-router-dom';
import SimpleMap from '../ui/google map/Simplemap';
import LeafletMap from '../ui/google map/Simplemap';
import MapboxMap from '../ui/google map/Simplemap';
import Hotel from '../ui/modal/hotel';
import MapComponent from '../ui/google map/Simplemap';

const Description = () => {
  const {user,isLoading,loggedIn} = useSelector(state => state.auth)
    const [state,setstate] = useState()
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    const {articles_price} = useSelector(state => state.article)
  useEffect(()=>{
    if (!loggedIn) {
      navigate('/login')
    }
    const getArticlePrice = async () =>{

      const responce = await ServicePrice.getPrice()

    } 
    getArticlePrice()
  },[])    
  return user !== null &&(
    <div className='header '>
        <div class="">
  <header className='header-style d-flex  align-items-center'>
  

    <div class="pricing-header p-5  mx-auto text-center">
  <div class="px-4  my-5 text-center">
    <h1 class="display-4 fw-bold text-light ">Добро пожаловать в нашу гостиницу!</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead text-light mb-4"> Наша гостиница является истинным уголком уюта и комфорта в самом сердце города. С момента своего открытия мы стремимся предоставить нашим гостям неповторимый опыт пребывания. Наша история началась 2024 года с мечтой создать место, где каждый гость почувствует себя как дома.</p>
    
    </div>
   
  </div>
    {/* <Carousel /> */}
    </div>
  </header>

  <main className='container'>
    <div className='mt-5'>
      <h1 className='text-center pb-5'>Какие удобства вас ждут</h1>
    <Hotel/>
    </div>
      <h1 class="display-4 fw-normal text-center mt-5 text-body-emphasis">Цeны</h1>
    <div className='w-100 h-50 mx-auto'>

    </div>
    <div class="row row-cols-1 row-cols-md-3 mb-3 mt-5 text-center">
    
      {articles_price && articles_price.map(el => <About el={el}></About>)}
      
    </div>

    <h2 class="display-6 text-center mb-4">Compare plans</h2>

    <div class="table-responsive">
      <table class="table text-center">
        <thead>
          <tr>
            <th style={{style:"width:25%"}}></th>
            <th style={{style:"width:25%"}}>Эконом</th>
            <th style={{style:"width:25%"}}>Комфорт</th>
            <th style={{style:"width:25%"}}>Премиум</th>
          </tr>
        </thead>
        <tbody>
          <tr>
             <th scope="row" class="text-start">Обслуживание</th>
            <td><i class="fa-solid fa-check"></i></td>

            <td><i class="fa-solid fa-check"></i></td>
            <td><i class="fa-solid fa-check"></i></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Еда</th>
            <td></td>  
            <td><i class="fa-solid fa-check"></i></td>
            <td><i class="fa-solid fa-check"></i></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" class="text-start">Бассейн</th>
            <td><svg class="bi" width="24" height="24"><use href="#check"></use></svg></td>
            <td><i class="fa-solid fa-check"></i></td>
            
            <td><i class="fa-solid fa-check"></i></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Мойка машин</th>
            <td></td>
            <td><svg class="bi" width="24" height="24"><use href="#check"></use></svg></td>
            <td><i class="fa-solid fa-check"></i></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Аренда машин</th>
            <td></td>

            <td><svg class="bi" width="24" height="24"><use href="#check"></use></svg></td>
        
            <td><i class="fa-solid fa-check"></i></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Все условия</th>
            <td></td>
            <td></td>
            <td><i class="fa-solid fa-check"></i></td>

          </tr>
        </tbody>
      </table>
    </div>
  </main>

  <footer class="pt-4 my-md-5 pt-md-5 border-top  d-flex  container">
    <div class="col">
      <h1>Гостиница Звезда</h1>
      <p>132Б ул. Моминова, Ош 723500</p>
<p>
Количество номеров: 40
</p>
<p>
Удобства: парковка, фитнес-центр, конференц-зал
</p>
    </div>
    <div className='col'>
    <img className='w-100' src="https://www.google.com/maps/vt/data=LOJOgyrMaXqNy-stm-ZeHvkpWO8kazOCFdUI3xTo9h9C0kUP__6bfjBchNhDwm_yG2PxGo5l0oCOX3I4xMjwJpV1IrZ5O-8tOfAWvwcUyfXKsK0qhAp3rXmVAplVXP9NM8AvUsC5kZTGj2ltxy9dCzQgCR9sJpy8948ZYn1RMJ1CDHY7QQ5uXmtv3YH6nPgbT2HuM-N2GaP2F_cSXdGrNI_xh6HEIfOYtGsUpokGEXffegFv9aoykdgUTcSEKGB8LXUKA5cCHB1EI-3msYj1Ciltrvulbh4" alt="" />

    </div>
  </footer>
</div>
    </div>
  )
}

export default Description