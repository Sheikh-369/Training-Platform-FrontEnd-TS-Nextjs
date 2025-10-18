import { Status } from "@/lib/global-types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudentData, IStudentSliceState } from "./student-slice-type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";

const initialState:IStudentSliceState={
    student:null,
    status:Status.IDLE
}

const studentSlice=createSlice({
    name:"student",
    initialState,
    reducers:{
        setStudent(state:IStudentSliceState,action:PayloadAction<IStudentData>){
            state.student=action.payload
        },

        setStatus(state:IStudentSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setStatus,setStudent}=studentSlice.actions
export default studentSlice.reducer

export function fetchStudentInfo(instituteNumber:string){
    return async function fetchStudentInfoThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`institute/${instituteNumber}/student/`)
            if(response.status===200){
                dispatch(setStudent(response.data.students[0]))
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

export function editStudentInfo(instituteNumber:string,studentData:FormData){
    return async function editStudentInfoThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.patch(`institute/${instituteNumber}/student`,studentData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchStudentInfo(instituteNumber))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}