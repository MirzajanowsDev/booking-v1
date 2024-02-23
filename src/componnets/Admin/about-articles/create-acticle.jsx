import React, { useEffect, useState } from 'react'
import Input from '../../../ui/Input'
import ArticleService from '../../../services/article'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getArticlesSuccess, postArticleSuccess } from '../../../slice/article'

const CreateArticle = () => {
  let img
  const [title,setTitle] = useState('')
  const [description,setdescription] = useState('')
  const [body,setbody] = useState(2)
  const [price,setprice] = useState(false)
  const [number,setnumer] = useState()
  const [image,setimg]= useState('')
 const dispatch = useDispatch()
  const navigate = useNavigate()
  
   

  const {user} = useSelector(state => state.auth)
  const onSubmit = async(e) => {
    e.preventDefault()

      const article = {
        id: Date.now(),
      slug: Date.now(),
      title,
      body,
      description:description,
      author: {
          username: user.username,
          bio: "",
          image: "",
          following: false
        },
        viewers:[],
        favorited:"Свободен",
        color: '#009900',
        img:image,
        createdAt:'',
        price
    }
    try {
      if (article.body && article.title && article.description) {
        const response = await ArticleService.postArticle(article)
       navigate(-1)
       
      }
      
    } catch (error) {
      
    }
 
    
  }

  
  
  return (
    <div className='container text-center mt-5'>
    
        <div className='w-75 mx-auto'>

        <form onSubmit={e => onSubmit(e)}>
        <Input setState={setimg} label={"Изображение url"}/>
        <Input setState={setprice} label={"Цена"}/>

        <Input setState={setTitle} label={"Номер квартиры"}/>
        <Input setState={setbody}  label={"Сколько мест"}/>
        <select class="form-select" onChange={(e) => setdescription(e.target.value)} aria-label="Default select example">
  <option selected>Тип квартира</option>
  <option value="Эконом">Эконом</option>
  <option value="Комфорт">Комфорт</option>
  <option value="Премиум">Премиум</option>
</select>
            <button className='btn btn-primary w-100'>Create</button>
        </form>
        </div>
      </div>
  )
}

export default CreateArticle