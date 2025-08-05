import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialStudentData, IStudentData, IStudentDataModal } from "./studentSliceTypes";
import { Status } from "@/lib/GlobalTypes/type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:IInitialStudentData={
    student:[],
    status:Status.LOADING
}
const studentSlice=createSlice({
    name:"student",
    initialState,
    reducers:{
        setStudent(state:IInitialStudentData,action:PayloadAction<IStudentData[]>){
            state.student=action.payload
        },

        setStatus(state:IInitialStudentData,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setStudent,setStatus}=studentSlice.actions
export default studentSlice.reducer


//fetch Students
export function fetchStudent(){
    return async function fetchStudentThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.get("institute/student")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setStudent(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
        
    }
}

//addStudent
export function addStudent(studentData:IStudentDataModal){
    return async function addStudentThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.post("institute/student",studentData)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchStudent())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//deleteStudent
export function deleteStudent(id:string){
    return async function deleteStudentThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.delete("institute/student/"+id)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchStudent())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

// updateStudent
export function updateStudent(id: string, name: IStudentDataModal) {
  return async function updateStudentThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.patch("institute/student/"+id, name);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchStudent()); // Refresh data
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
