import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ArticleService from '../../services/article'
import { getArticlesSuccess } from '../../slice/article'
import Loader from '../../ui/loader'
import Post from '../../ui/post'
import './card.css'
const   Card = ({item,openModal}) => {
  const dispatch = useDispatch()
  const {articles} = useSelector(state => state.article)
  const {loggedIn,user} = useSelector(state => state.auth)
  const handleDelete =async (id) => {
    const responce = await ArticleService.deletArticle(id) 
    dispatch(getArticlesSuccess(articles.filter(el => el.id !== id))) 

    
  }
  const modal = () => {

  }
  const navigate = useNavigate()
 
  return (
    
    <div class="col mt-2 " key={item.id} onClick={() => navigate(`/article/${item.id}`)}>
         <div  class="card  h-100 position-relative"  >
         <i class="fa-regular fa-heart position-absolute"></i>
          <img src={item.img} className=' rounded-1 h-100' alt="" />
         <div class="card-body d-flex justify-content-between ">
          <div>

           <p class="card-text fw-bold ">${item.price}</p>
          
           {item.favorited === "Оформлен" && <h6 className=' fw-bolder'>{item.favorited}</h6>}
            <div>
              <p>{item.title}</p>
            </div>
           </div>
           {item.createdAt ?
            <Post timestamp={item.createdAt}/>
            :''}
            </div>
        
                 </div>
                 
                 </div>
       
     
     
                 
                 
                 
               
   
  )
}

export default Card