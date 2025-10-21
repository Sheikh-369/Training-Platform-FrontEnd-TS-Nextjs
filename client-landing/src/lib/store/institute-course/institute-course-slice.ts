import { Status } from "@/lib/global-types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteCourseData, IInstituteCourseSliceState } from "./institute-course-type";
import { AppDispatch } from "../store";
import API from "@/lib/https/API";

const initialState:IInstituteCourseSliceState={
    instituteCourse:[],
    selectedCourse: null, 
    status:Status.IDLE
}

const instituteCourseSlice=createSlice({
    name:"instituteCourse",
    initialState,
    reducers:{
        setInstituteCourse(state:IInstituteCourseSliceState,action:PayloadAction<IInstituteCourseData[]>){
            console.log("Setting institute courses:", action.payload);
            state.instituteCourse=action.payload
        },

        setStatus(state:IInstituteCourseSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },

            // xuta xutai institute page auna ko lagi
        resetInstituteCourse(state) {
            state.instituteCourse = [];
            state.status = Status.IDLE;
        },

        setSelectedCourse(state, action: PayloadAction<IInstituteCourseData | null>) {
            state.selectedCourse = action.payload;
        }
    }
})

export const {setInstituteCourse,setStatus,resetInstituteCourse,setSelectedCourse}=instituteCourseSlice.actions
export default instituteCourseSlice.reducer

//fetch all courses of an institute
// export function fetchAllCourses(instituteId:number){
//     return async function fetchAllCourses(dispatch:AppDispatch){
//         dispatch(setStatus(Status.LOADING))
//         try {
//             const response=await API.get(`student/${instituteId}/course`)
//             console.log("API response:", response);
//             if(response.status===200){
//                 dispatch(setInstituteCourse(response.data.data))
//                 dispatch(setStatus(Status.SUCCESS))
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }
//fetch all courses of an institute
export function fetchAllCourses(instituteId: number) {
  return async function fetchAllCourses(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`student/${instituteId}/course`);
      console.log("API response:", response);

      if (response.status === 200) {
        // Wrap single object in array if it's not already an array
        const courses = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        dispatch(setInstituteCourse(courses));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}


//fetch course by id
export function fetchCourseById(instituteId: number, id: number) {
  return async function fetchCourseById(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`student/${instituteId}/course/${id}`);
      if (response.status === 200) {
        dispatch(setSelectedCourse(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}