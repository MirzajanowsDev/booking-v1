import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading:false,
    articles:[],
    articles_price:[],
    articleDetail:null,
    error:null,
    articleStatus:null,
}


export const articleSlice = createSlice({
    name:'article',
    initialState,
    
    reducers:{
        getArticlesStart : state => {
            state.isLoading = true
        },
        getArticlesSuccess: (state,action) => {
            state.isLoading = false
            state.articles = action.payload
        },
        getArticlesFailure:(state,action) => {
            state.error = action.payload
            state.isLoading = false
        },
        sendArticlearticlesBusy:(state,action) => {
            return {
                ...state,
                articlesBusy:action.payload
            }
        },
        setArticlesSuccess:(state,action) => {
            state.articleStatus = action.payload
        },
        getArticleDetailStart: state => {
            state.isLoading = true
        },
        getArticleDetailSuccess: (state,action) => {
            state.isLoading = false
            state.articleDetail = action.payload
        },
        getArticleDetailFailure: state => {
            state.isLoading = false
        },
        postArticleSuccess: (state,action) =>{
            return {
                ...state,
                articles: [...state.articles,action.payload]
            }
        },
        getArticlePrice: (state,action) => {
            state.articles_price = action.payload
        },


        
        
        

        
    }   
})

export const {getArticlesStart,setArticlesSuccess,getArticlePrice,sendArticlearticlesBusy,postArticleSuccess,getArticlesSuccess,getArticleDetailFailure,getArticleDetailStart,getArticleDetailSuccess } = articleSlice.actions
export default articleSlice.reducer