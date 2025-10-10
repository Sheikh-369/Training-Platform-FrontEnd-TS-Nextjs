import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOwnerData, IOwnerSliceState } from "./owner-slice-type";
import { Status } from "@/lib/global-types/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";

const initialState:IOwnerSliceState={
    owner:null,
    status:Status.IDLE
}

const ownerSlice=createSlice({
    name:"owner",
    initialState,
    reducers:{
        setOwner(state:IOwnerSliceState,action:PayloadAction<IOwnerData>){
            state.owner=action.payload
        },

        setStatus(state:IOwnerSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setOwner,setStatus}=ownerSlice.actions
export default ownerSlice.reducer

//fetch institute data
export function ownerData() {
  return async function ownerDataThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`/institute`);
      if (response.status === 200) {
        dispatch(setOwner(response.data.data?.[0]));
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
