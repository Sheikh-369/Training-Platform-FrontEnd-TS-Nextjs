import { Status } from "@/lib/global/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacher, ITeacherSliceState } from "./teacherSliceType";
import App from "next/app";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";
const initialState: ITeacherSliceState = {
    teacher:null,
    status: Status.IDLE // or use an enum for better type safety
}
const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        setTeacher: (state, action:PayloadAction<ITeacher>) => {
            state.teacher = action.payload;
        },

        setStatus(state: ITeacherSliceState, action: PayloadAction<Status>) {
            state.status = action.payload;
        }
    }
});

export const { setTeacher, setStatus } = teacherSlice.actions;
export default teacherSlice.reducer;

//fetch single teacher data by id
export function fetchTeacherData(id: string) {
  return async function fetchTeacherDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get('institute/teacher/' + id);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));

        // ✅ Extract first teacher from array
        const teacher = response.data.data[0];
        if (teacher) {
          dispatch(setTeacher(teacher));
        } else {
          dispatch(setStatus(Status.ERROR));
          console.error("No teacher found in response array");
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
      dispatch(setStatus(Status.ERROR));
    }
  }
}

//edit teacher data by id
export function editTeacherData(id: string, teacherData: ITeacher) {
  return async function editTeacherDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch('institute/teacher/' + id, teacherData);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchTeacherData(id)); // Refetch the updated teacher data
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error editing teacher:", error);
      dispatch(setStatus(Status.ERROR));
    }
  }
}