import { Status } from "@/lib/GlobalTypes/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IUserData,  } from "./authSliceTypes";
import API from "@/lib/http/OnlyAPI";
import { AppDispatch } from "../store";
import { IUserLoginData } from "@/app/auth/login/loginTypes";
import { IRegisterUserData } from "@/app/auth/register/registerTypes";
import { IForgotPasswordData } from "@/app/auth/forgot-password/page";
import { IResetPasswordData } from "@/app/auth/reset-password/page";

const initialState:IInitialState={
    user:{
        userName:"",
        userEmail:"",
        token:""
    },
    status:Status.IDLE
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
        },
        //used in redirecting after success or error
        resetStatus(state: IInitialState) {
            state.status = Status.IDLE;
        }
    }
})

export const {setUser,setStatus,resetStatus}=authSlice.actions
export default authSlice.reducer

export function registerUser(data:IRegisterUserData){
    return async function userRegisterThunk(dispatch:AppDispatch){
        try {
            const response=await API.post("auth/register",data)
            console.log(response)
            if(response.status===201){
                //code if works fine
                dispatch(setStatus(Status.SUCCESS))
                alert(response.data.message);
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

export function forgotPassword(emailData:IForgotPasswordData){
    return async function forgotPasswordThunk(dispatch:AppDispatch){
        try {
            const response=await API.post("auth/forgot-password",emailData)
            console.log(response)
            if(response.status===200){
                //code if works fine
                // dispatch(setUser(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                alert(response.data.message);
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function resetPassword(resetData:IResetPasswordData){
    return async function resetPasswordThunk(dispatch:AppDispatch){
        try {
            const response=await API.post("auth/reset-password",resetData)
            console.log(response)
            if(response.status===200){
                //code if works fine
                // dispatch(setUser(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                alert(response.data.message);
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
