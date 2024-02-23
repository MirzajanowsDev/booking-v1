import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../ui/Input'
import { ServicePrice } from '../services/price'


const EditAboutUs = () => {
    const {id,type} = useParams()
    const [state,setstate] = useState()
    const [inpname, setinpName] = useState()
    const navigate = useNavigate()
    const [inp, setinp] = useState()
    const [inp2, setinp2] = useState()
const handleSubmit = async(e) =>{
    e.preventDefault()
    const post = {title:inp,sub_title:inp2,name:inpname}
    const responce = await ServicePrice.PostPrice(id,post)
    navigate(-1)
}
    useEffect(()=> {
        const get = async()=>{
            const responce = await ServicePrice.getPriceDetail(id)
            setstate(responce)   
            setinp(responce.title) 
            setinp2(responce.sub_title)
            setinpName(responce.name)

        }
        get()
    },[])
  return state && (
    
    <form onSubmit={(e) => handleSubmit(e) } className='w-50 mx-auto'>
        {/* <Input  state={inpname}  label={"название"}/> */}
        <Input setState={setinp} state={inp} label={"В месяц"}/>

        <Input setState={setinp2} state={inp2}  label={"В день"}/>
        <button className='btn btn-primary w-100 mt-1'>Сохранить</button>
    </form>
  )
}

export default EditAboutUs