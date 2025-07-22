import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialInstitute } from "./instituteSliceTypes";
import { Status } from "@/lib/GlobalTypes/type";
import { IInstituteData } from "@/app/institute/register/instituteTypes";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { AppDispatch } from "../store";
const initialState:IInitialInstitute={
    institute:{
        instituteName:"",
        instituteEmail:"",
        institutePhoneNumber:"",
        instituteAddress:"",
        institutePanNumber:"",
        instituteVatNumber:""
    },
    status:Status.LOADING
}
const instituteSlice=createSlice({
    name:"institute",
    initialState,
    reducers:{
        setInstitute(state:IInitialInstitute,action:PayloadAction<IInstituteData>){
            state.institute=action.payload
        },
        setStatus(state:IInitialInstitute,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setInstitute,setStatus}=instituteSlice.actions
export default instituteSlice.reducer

export function createInstitute(data:IInstituteData){
    return async function createInstituteThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.post("institute")
            if(response.status===200){
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