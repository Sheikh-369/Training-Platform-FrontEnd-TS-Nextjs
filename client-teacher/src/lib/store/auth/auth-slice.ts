import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthLoginData, ITeacherAuthSliceState } from "./auth-slice-types";
import { Status } from "@/lib/global/types";
import { AppDispatch } from "../store";
import teacherAPI from "@/lib/https/API";
import { ITeacherLoginData } from "@/app/teacher/auth/login/page";

const initialState:ITeacherAuthSliceState={
    authData:{
        teacherEmail:"",
        teacherPassword:"",
        instituteNumber:"",
        token:"",
        id:""
    },
    status:Status.IDLE
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuthData(state:ITeacherAuthSliceState,action:PayloadAction<IAuthLoginData>){
            state.authData=action.payload
        },

        setStatus(state:ITeacherAuthSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },
        resetStatus(state: ITeacherAuthSliceState) {
            state.status = Status.IDLE;
        }

    }
})

export const {setAuthData,setStatus,resetStatus}=authSlice.actions
export default authSlice.reducer


/*teacher login*/
export function teacherLogin(teacherLoginData:ITeacherLoginData){
    return async function teacherLoginThunk(dispatch:AppDispatch){
        try {
            const response  =await teacherAPI.post('teacher/login',teacherLoginData)
            if(response.status === 200){
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