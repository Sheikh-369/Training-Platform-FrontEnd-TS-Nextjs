import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global-types/type";
import { IOrderData, IOrderResponse, IOrderSliceState } from "./order-slice-type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";

const initialState: IOrderSliceState = {
  orderResponse: null,
  status: Status.IDLE,
  error: null,
};

const studentOrderSlice = createSlice({
      name: "studentOrder",
  initialState,
  reducers: {
        setOrder(state: IOrderSliceState, action: PayloadAction<IOrderResponse>) {
            state.orderResponse = action.payload;
        },


        setStatus(state:IOrderSliceState,action:PayloadAction<Status>){
            state.status=action.payload   
        }
    }
});

export const { setOrder,setStatus } = studentOrderSlice.actions;
export default studentOrderSlice.reducer;

//order thunk
export function placeStudentOrder(instituteId:string,orderData:IOrderData,courseId:number){
  return async function placeStudentOrder(dispatch: AppDispatch){
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post(`student/${instituteId}/order/${courseId}`,orderData);
      if(response.status===200 || response.status===201){
        dispatch(setOrder(response.data));
        dispatch(setStatus(Status.SUCCESS));
      }else{
        dispatch(setStatus(Status.ERROR));
      }
    } catch (err: any) {
      dispatch(setStatus(Status.ERROR));
      console.error("Error placing student order:", err);
    }
  };
};