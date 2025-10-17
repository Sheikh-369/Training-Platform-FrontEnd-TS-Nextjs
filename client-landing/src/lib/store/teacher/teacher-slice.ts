import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacherData, ITeacherSliceState } from "./teacher-slice-type";
import { Status } from "@/lib/global-types/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";

const initialState: ITeacherSliceState = {
  teacher: null,
  status: Status.IDLE,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacher(state: ITeacherSliceState, action: PayloadAction<ITeacherData>) {
      state.teacher = action.payload;
    },

    setStatus(state: ITeacherSliceState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setStatus, setTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;

//fetch teacher information
export function fetchTeacherInfo(instituteNumber:string) {
  return async function fetchTeacherInfoThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`institute/${instituteNumber}/teacher`);
      if (response.status === 200) {
        dispatch(setTeacher(response.data.data[0]));
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
