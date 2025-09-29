import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../global-types/type";
import { IHomeData, IHomeSliceState } from "./home-slice-type";
import { AppDispatch } from "./store";
import API from "../https/API";

const initialState:IHomeSliceState={
    institute:[],
    status:Status.IDLE
}

const homeSlice=createSlice({
    name:"home",
    initialState,
    reducers:{
        setInstitute(state:IHomeSliceState,action:PayloadAction<IHomeData[]>){
            state.institute=action.payload
        },

        setStatus(state:IHomeSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setInstitute,setStatus}=homeSlice.actions
export default homeSlice.reducer

export function homePage(){
    return async function homePageThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.get("/student/institute")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setInstitute(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }

        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}