import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global-types/type";
import { IInstituteRegisterData, IInstituteRegisterSliceState } from "./register-institut-slice-type";
import APIWITHTOKEN from "@/lib/https/APIWithToken";
import { AppDispatch } from "../store";

const initialState:IInstituteRegisterSliceState={
    instituteRegister:null,
    status:Status.IDLE
}

const instituteRegisterSlice=createSlice({
    name:"institute",
    initialState,
    reducers:{
        setInstituteRegister(state:IInstituteRegisterSliceState,action:PayloadAction<IInstituteRegisterData>){
            state.instituteRegister=action.payload
        },

        setStatus(state:IInstituteRegisterSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setInstituteRegister,setStatus}=instituteRegisterSlice.actions
export default instituteRegisterSlice.reducer


//register institute
export function createInstitute(instituteRegisterData: IInstituteRegisterData) {
  return async function createInstituteThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await APIWITHTOKEN.post("institute", instituteRegisterData);
      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: data.message || "Institute registered successfully!",
          instituteNumber: data.instituteNumber,  // <-- important for redirect
        };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: data.message || "Something went wrong." };
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message: error?.response?.data?.message || "Unexpected error occurred.",
      };
    }
  };
}

