import { Status } from "@/lib/GlobalTypes/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IUserData } from "./authSliceTypes";
import API from "@/lib/http";
import { AppDispatch } from "../store";
import { IUserLoginData } from "@/app/auth/login/loginTypes";

const initialState:IInitialState={
    user:{
        userName:"",
        userEmail:"",
        userPassword:""
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

export function userRegrister(data:IUserData){
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


export function userLogin(data:IUserLoginData){
    return async function userLoginThunk(dispatch:AppDispatch){
        try {
            const response=await API.post("auth/login",data)
            console.log(response)
            if(response.status===200){
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