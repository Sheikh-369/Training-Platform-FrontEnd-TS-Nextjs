import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { ICourseData, ICourseSliceState } from "./course-slice-type";
import { Status } from "@/lib/global-types/type";
import APIWITHTOKEN from "@/lib/https/APIWithToken";


const initialState:ICourseSliceState={
    course:null,
    selectedCourse: null,
    status:Status.LOADING
    
}
const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setCourse(state:ICourseSliceState,action:PayloadAction<ICourseData[]>){
            state.course=action.payload
        },

        setSelectedCourse(state, action: PayloadAction<ICourseData>) {
            state.selectedCourse = action.payload;
        },

        setStatus(state:ICourseSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setCourse,setStatus,setSelectedCourse}=courseSlice.actions
export default courseSlice.reducer

//fetch course
export function fetchCourse(instituteNumber:string){
    return async function fetchCourseThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`institute/${instituteNumber}/course`)
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

//fetch single course for student in public page
export function fetchSingleCourse(instituteNumber:string,courseId:number){
    return async function fetchSingleCourseThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`institute/${instituteNumber}/course/${courseId}`)
        if(response.status===200 && response.data.data?.length > 0){
            dispatch(setSelectedCourse(response.data.data[0]));
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
export function addCourse(instituteNumber:string,courseData:ICourseData){
    return async function addCourseThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.post(`institute/${instituteNumber}/course`,courseData,{
                headers: {
                "Content-Type": "multipart/form-data"
                }
            })
        if(response.status===200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(fetchCourse(instituteNumber))
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
// export function deleteCourse(id:string){
//     return async function deleteCourseThunk(dispatch:AppDispatch){
//         try {
//             const response=await APIWITHTOKEN.delete("institute/course/"+id)
//         if(response.status===200){
//             dispatch(setStatus(Status.SUCCESS))
//             dispatch(fetchCourse())
//         }else{
//             dispatch(setStatus(Status.ERROR))
//         }
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }

// updateCourse
// export function updateCourse(id: string, name: ICourseData) {
//   return async function updateCourseThunk(dispatch: AppDispatch) {
//     try {
//       const response = await APIWITHTOKEN.patch("institute/course/"+id, name);
//       if (response.status === 200) {
//         dispatch(setStatus(Status.SUCCESS));
//         dispatch(fetchCourse()); // Refresh data
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }