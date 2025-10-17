import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteTeacherData, IInstituteTeacherSliceState } from "./teacher-slice-type";
import { Status } from "@/lib/global-types/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";
const initialState:IInstituteTeacherSliceState={
    instituteTeacher:null,
    status:Status.IDLE
}
const instituteTeacherSlice=createSlice({
    name:"institutTeacher",
    initialState,
    reducers:{
        setInstituteTeacher(state:IInstituteTeacherSliceState,action:PayloadAction<IInstituteTeacherData[]>){
            state.instituteTeacher=action.payload
        },
        setStatus(state:IInstituteTeacherSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setInstituteTeacher,setStatus}=instituteTeacherSlice.actions
export default instituteTeacherSlice.reducer

//fetch teachers
export function fetchAllTeachers(instituteNumber:string){
    return async function fetchAllTeachersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`institute/${instituteNumber}/teacher`)
            if(response.status===200){
                dispatch(setInstituteTeacher(response.data.data))
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

//create teacher
export function createTeacher(instituteNumber:string,teacherData:IInstituteTeacherData){
    return async function createTeacherThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.post(`institute/${instituteNumber}/teacher`,teacherData,{
                headers: {
                "Content-Type": "multipart/form-data"
                }})
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchAllTeachers(instituteNumber))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}