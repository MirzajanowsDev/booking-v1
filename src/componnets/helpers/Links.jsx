import React from 'react'
import { Link } from 'react-router-dom'

const Links = () => {
  return (
      <div>
        <h1>Выберите тип квартир</h1>
        
    <Link to={'/'} className='btn btn-outline-primary active'>Эконом</Link>
<Link to={'/lux-article'} className='btn btn-outline-success'>Комфорт</Link>
<Link to={'/premium-article'}  className='btn btn-outline-danger'>Премиум</Link>
      </div>
  )
}

export default Links