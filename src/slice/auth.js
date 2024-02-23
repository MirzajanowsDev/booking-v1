import { createSlice } from "@reduxjs/toolkit"
import { setItem } from "../componnets/helpers/persistance-storage"
const initialState ={
    isLoading:false,
    loggedIn:false,
    loggedInAdmin:false,
    user:null,
    users:[],
    error:null,
    theme:null,
    viewers:[],
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        signUserStart: state => {
            state.isLoading = true
        },  
        getviewers : (state,action) => {
            state.viewers = action.payload  
        },
        signAdminSuccess: (state,action) => {
            setItem('token',action.payload.token);
            state.loggedInAdmin = true
            state.isLoading = false
            state.user =  action.payload
        },
        setsuccessusers: (state,action) => {
            state.users = action.payload
        },
        switchthemer: (state,action) => {
            state.theme = action.payload
        },
        signUserSuccess: (state,action) => {
            state.loggedIn = true
            state.isLoading = false
            state.user =  action.payload
            setItem('token',action.payload.token);
        },
        
        signUserFailure: (state,action) => {
            state.isLoading = false
            state.error = 'error'
            state.error = action.payload
        },
        logoutUser: state =>{
            state.user = null
            state.loggedIn = false
        }
    

        
    }
})
export const {setsuccessusers,getviewers,signAdminSuccess,switchthemer,logoutUser,signUserFailure,signUserStart,signUserSuccess} = authSlice.actions
export default authSlice.reducer