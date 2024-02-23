import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const About = ({state,el}) => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)
  return (
    <div>
        <div class="col mt-5" key={el.id}>
        <div class="card mb-4 rounded-5 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">{el.name}</h4>
          </div>
          <div class="card-body">

        <div>
            <h1 class="card-title pricing-card-title">${el.sub_title}<small class="text-body-secondary fw-light">/день</small></h1>
            </div>
            <Link to={`/desc`} type="button" class="w-100 mt-2 btn btn-lg btn-primary">Перейти</Link>
          {user.username === "faruh" ? <button onClick={() => navigate(`/edit-aboutus/${el.id}`)}  className='btn btn-primary w-100 mt-1'>Изменить</button>
          : ''}

   </div>
        </div>
      </div>
    </div>
  )
}

export default About