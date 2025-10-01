import { Status } from "@/lib/global/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacher, ITeacherSliceState } from "./teacherSliceType";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";
const initialState: ITeacherSliceState = {
    teacher:null,
    status: Status.IDLE 
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


export function fetchTeacherData(id: string, instituteNumber: string) {
  return async function fetchTeacherDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(
        `institute/teacher/${instituteNumber}/${id}`
      );

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));

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
  };
}




export function editTeacherData(
  id: string,
  instituteNumber: string,
  teacherData: ITeacher
) {
  return async function editTeacherDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const formData = new FormData();

      // Append all teacher fields to formData
      Object.entries(teacherData).forEach(([key, value]) => {
        if (key === "teacherImage") {
          if (value instanceof File) {
            formData.append("teacherImage", value); // New file
          } else if (typeof value === "string") {
            formData.append("teacherImage", value); // Existing image path
          }
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as string); // Other fields
        }
      });

      // 🛠 PATCH request with correct URL
      const response = await APIWITHTOKEN.patch(
        `institute/teacher/${instituteNumber}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        // Refresh the updated teacher data
        dispatch(fetchTeacherData(id, instituteNumber));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Error updating teacher:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

