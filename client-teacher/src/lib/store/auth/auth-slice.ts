import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthLoginData, IInitialAuthData } from "./auth-slice-types";
import { Status } from "@/lib/global/types";
import { AppDispatch } from "../store";
import teacherAPI from "@/lib/https/API";

const initialState:IInitialAuthData={
    authData:{
        teacherEmail:"",
        teacherPassword:"",
        instituteNumber:"",
        token:""
    },
    status:Status.LOADING
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthData(state:IInitialAuthData,action:PayloadAction<IAuthLoginData>){
            state.authData=action.payload
        },

        setStatus(state:IInitialAuthData,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setAuthData,setStatus}=authSlice.actions
export default authSlice.reducer


/*teacher login*/
export function teacherLogin(data:IAuthLoginData){
    return async function teacherLoginThunk(dispatch:AppDispatch){
        try {
            const response  =await teacherAPI.post('institute/teacher/login',data)
            if(response.status === 201){
                dispatch(setStatus(Status.SUCCESS))
                response.data.data && dispatch(setAuthData(response.data.data))
                localStorage.setItem("token",response.data.data.token)
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
                dispatch(setStatus(Status.ERROR))
            
        }
    }
}