import { Status } from "@/lib/GlobalTypes/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IUserData,  } from "./authSliceTypes";
import API from "@/lib/http/OnlyAPI";
import { AppDispatch } from "../store";
import { IUserLoginData } from "@/app/auth/login/loginTypes";
import { IRegisterUserData } from "@/app/auth/register/registerTypes";

const initialState:IInitialState={
    user:{
        userName:"",
        userEmail:"",
        token:""
    },
    status:Status.LOADING
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setUser(state:IInitialState,action:PayloadAction<IUserData>){
            state.user=action.payload
        },

        setStatus(state:IInitialState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setUser,setStatus}=authSlice.actions
export default authSlice.reducer
export {setUser,setStatus}

export function registerUser(data:IRegisterUserData){
    return async function userRegisterThunk(dispatch:AppDispatch){
        try {
            const response=await API.post("auth/register",data)
            console.log(response)
            if(response.status===201){
                //code if works fine
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}


export function loginUser(data:IUserLoginData){
    return async function userLoginThunk(dispatch:AppDispatch){
        try {
            const response=await API.post("auth/login",data)
            console.log(response)
            if(response.status===200){
                //code if works fine
                dispatch(setUser(response.data.data))
                localStorage.setItem("token",response.data.data.token)
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}