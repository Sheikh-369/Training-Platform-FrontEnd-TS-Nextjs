import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteStudentData, IInstituteStudentSliceState } from "./student-slice-type";
import { Status } from "@/lib/global-types/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";

const initialState:IInstituteStudentSliceState={
    instituteStudent:null,
    status:Status.IDLE
}

const instituteStudentSlice=createSlice({
    name:"instituteStudent",
    initialState,
    reducers:{
        setInstituteStudent(state:IInstituteStudentSliceState,action:PayloadAction<IInstituteStudentData[]>){
            state.instituteStudent=action.payload
        },

        setStatus(state:IInstituteStudentSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },

        removeStudentById(state, action: PayloadAction<number>) {
            if (state.instituteStudent) {
                state.instituteStudent = state.instituteStudent.filter(
                (student) => student.id !== action.payload
                );
            }
        }


    }
})

export const{setInstituteStudent,setStatus,removeStudentById}=instituteStudentSlice.actions
export default instituteStudentSlice.reducer

//fetchAllStudents
export function fetchAllStudents(instituteNumber:string){
    return async function getAllStudentsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`institute/${instituteNumber}/student`)
            if(response.status===200){
                dispatch(setInstituteStudent(response.data.students))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//add student/s
export function addStudent(instituteNumber:string,studentData:IInstituteStudentData){
    return async function addStudentThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.post(`institute/${instituteNumber}/student`,studentData)
            if(response.status===200 || response.status===201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchAllStudents(instituteNumber))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//edit student
export function updateStudent(instituteNumber: string, studentId: number, studentData: IInstituteStudentData) {
  return async function updateStudentThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`institute/${instituteNumber}/student/${studentId}`, studentData);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllStudents(instituteNumber));  // Refresh list after update
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//delete student
export function deleteStudent(instituteNumber: string, studentId: number) {
  return async function deleteStudentThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete(`institute/${instituteNumber}/student/${studentId}`);
      if (response.status === 200) {
        dispatch(removeStudentById(studentId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };
}