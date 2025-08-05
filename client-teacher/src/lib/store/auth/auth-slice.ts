import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData, IInitialAuthData } from "./auth-slice-types";
import { Status } from "@/lib/global/types";

const initialState:IInitialAuthData={
    auth:[],
    status:Status.LOADING
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth(state:IInitialAuthData,action:PayloadAction<IAuthData[]>){
            state.auth=action.payload
        },

        setStatus(state:IInitialAuthData,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setAuth,setStatus}=authSlice.actions
export default authSlice.reducer