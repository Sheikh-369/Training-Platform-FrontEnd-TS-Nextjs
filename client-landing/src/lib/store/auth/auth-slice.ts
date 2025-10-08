import { Status } from "@/lib/global-types/type";
import { IAuthSliceState, IUserData } from "./auth-slice-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import API from "@/lib/https/API";

const initialState:IAuthSliceState={
    user:null,
    status:Status.IDLE
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state:IAuthSliceState,action:PayloadAction<IUserData>){
            state.user=action.payload
        },

        setStatus(state:IAuthSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },

        logoutUser(state) {
            state.user = null;
            localStorage.removeItem("token");
            state.status = Status.IDLE;
        }

    }
})

export const {setUser,setStatus,logoutUser}=authSlice.actions
export default authSlice.reducer

//user register
export function userRegister(userData: IUserData) {
  return async function userRegisterThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("auth/register", userData);
      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: data.message || "Registered successfully!" };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: data.message || "Something went wrong." };
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
      return {
        success: false,
        message: error?.response?.data?.message || "Unexpected error occurred.",
      };
    }
  };
}

//user login
export function userLogin(userLoginData: IUserData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.post("auth/login", userLoginData);

      if (response.status === 200) {
        const user = response.data.data;

        // Save user data & token
        dispatch(setUser(user));
        localStorage.setItem("token", user.token);

        dispatch(setStatus(Status.SUCCESS));
        return {
          success: true,
          message: response.data.message || "Login successful!",
          user
        };
      } else {
        dispatch(setStatus(Status.ERROR));
        return {
          success: false,
          message: response.data.message || "Login failed.",
        };
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));

      return {
        success: false,
        message: error?.response?.data?.message || "Unexpected error occurred.",
      };
    }
  };
}

//user forgot password
export function forgotPassword(emailData:IUserData){
    return async function forgotPasswordThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("auth/forgot-password",emailData)
            console.log(response)
            if(response.status===200){
                //code if works fine
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

// user rset password
export function resetPassword(resetData:IUserData){
    return async function resetPasswordThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("auth/reset-password",resetData)
            console.log(response)
            if(response.status===200 || response.status===201){
                //code if works fine
                dispatch(setStatus(Status.SUCCESS))
                alert(response.data.message);
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
