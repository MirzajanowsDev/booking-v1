import React, { useState } from 'react'

const Input = ({label,setState,state,register,type}) => {
  
  return (
    <div className="form-floating">
      <input  required={true} value={state} onChange={e => setState(e.target.value)}type="text" className="form-control mb-1" id="floatingPassword" placeholder={label}/>
      <label className='mx-2 ' htmlFor="floatingPassword">{label}</label>
    </div>
  )
}

export default Input