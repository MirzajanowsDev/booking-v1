import { configureStore } from "@reduxjs/toolkit";
import Authreducer from '../slice/auth'
import ArticleReducer from "../slice/article";


export default configureStore({
    reducer:{
        auth:Authreducer,
        article: ArticleReducer
    },
    devTools:process.env.NODE_ENV !== 'production'
})  