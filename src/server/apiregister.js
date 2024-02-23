import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export async function registeruser(username,user){
    const {data} = await axios('http://localhost:3200/users')
    // Проверка наличия пользователя в массиве users

    const isUserNameExists = data.some(user => user.username === username);
    console.log(isUserNameExists);
    if (isUserNameExists) {
        return {message:'такое имя существует'}
    }else{
        return {state:true}
       
        // return data
    }
}