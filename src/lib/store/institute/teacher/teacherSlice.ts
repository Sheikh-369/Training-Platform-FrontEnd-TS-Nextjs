import { Status } from "@/lib/GlobalTypes/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialTeacherData, ITeacherData, ITeacherDataModal } from "./teacherSliceTypes";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { AppDispatch } from "../../store";
const initialState:IInitialTeacherData={
    teacher:[],
    status:Status.LOADING
    
}
const teacherSlice=createSlice({
    name:"teacher",
    initialState,
    reducers:{
        setTeacher(state:IInitialTeacherData,action:PayloadAction<ITeacherData[]>){
            state.teacher=action.payload
        },

        setStatus(state:IInitialTeacherData,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setTeacher,setStatus}=teacherSlice.actions
export default teacherSlice.reducer

//fetch teachers
export function fetchTeacher(){
    return async function fetchTeacherThunk(dispatch:AppDispatch) {
       try {
        const response=await APIWITHTOKEN.get("institute/teacher")
       if(response.status===200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setTeacher(response.data.data))
       }else{
        dispatch(setStatus(Status.ERROR))
       }
       } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
       } 
    }
}

//add teacher
export function addTeacher(teacherData:ITeacherDataModal){
    return async function addTeacherThunk(dispatch:AppDispatch) {
       try {
        const response=await APIWITHTOKEN.post("institute/teacher",teacherData)
       if(response.status===200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(fetchTeacher());
       }else{
        dispatch(setStatus(Status.ERROR))
       }
       } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
       } 
    }
}