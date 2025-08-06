import { Status } from "@/lib/GlobalTypes/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseData, IInitialStateCourseData } from "./courseSliceTypes";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { AppDispatch } from "../../store";


const initialState:IInitialStateCourseData={
    course:[],
    status:Status.LOADING
    
}
const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setCourse(state:IInitialStateCourseData,action:PayloadAction<ICourseData[]>){
            state.course=action.payload
        },

        setStatus(state:IInitialStateCourseData,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setCourse,setStatus}=courseSlice.actions
export default courseSlice.reducer

//fetch course
export function fetchCourse(){
    return async function fetchCourseThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.get("institute/course")
        if(response.status===200){
            dispatch(setCourse(response.data.data))
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


//add course
export function addCourse(courseData:ICourseData){
    return async function addCourseThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.post("institute/course",courseData)
        if(response.status===200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(fetchCourse())
        }else{
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//delete course
export function deleteCourse(id:string){
    return async function deleteCourseThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.delete("institute/course/"+id)
        if(response.status===200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(fetchCourse())
        }else{
            dispatch(setStatus(Status.ERROR))
        }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}