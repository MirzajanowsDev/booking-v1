import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
const Footer = () => {
  return (
             <div className='footers'>
     <Link to={'https://www.instagram.com/'} className=''>
     <i class="fa-brands fa-instagram"></i>
     </Link>   
     <Link to={'https://getbootstrap.com/docs/5.3/components/card/'} className=''>
     <i class="fa-brands fa-telegram"></i>
     </Link> 
     <Link to={'https://www.youtube.com/'} className=''>
     <i class="fa-brands fa-youtube"></i>
     </Link> 
     <Link to={'https://getbootstrap.com/docs/5.3/components/card/'} className=''>
     <i class="fa-brands fa-tiktok"></i>
     </Link> 
    
      </div>
  )
}

export default Footer