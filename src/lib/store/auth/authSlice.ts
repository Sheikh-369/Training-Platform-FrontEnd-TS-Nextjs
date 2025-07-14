import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IUserData } from "./authSliceTypes";
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

        setState(state:IInitialState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setUser,setState}=authSlice.actions
export default authSlice
export {setUser,setState}