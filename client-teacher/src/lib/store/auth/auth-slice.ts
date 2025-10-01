// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IAuthLoginData, ITeacherAuthSliceState } from "./auth-slice-types";
// import { Status } from "@/lib/global/types";
// import { AppDispatch } from "../store";
// import teacherAPI from "@/lib/https/API";
// import { ITeacherLoginData } from "@/app/teacher/auth/login/page";

// const initialState:ITeacherAuthSliceState={
//     authData:{
//         teacherEmail:"",
//         teacherPassword:"",
//         instituteNumber:"",
//         token:"",
//         id:"",
//         teacherId:0
//     },
//     status:Status.IDLE
// }

// const authSlice=createSlice({
//     name:"auth",
//     initialState,
//     reducers:{
//         setAuthData(state:ITeacherAuthSliceState,action:PayloadAction<IAuthLoginData>){
//             state.authData=action.payload
//         },

//         setStatus(state:ITeacherAuthSliceState,action:PayloadAction<Status>){
//             state.status=action.payload
//         },
//         resetStatus(state: ITeacherAuthSliceState) {
//             state.status = Status.IDLE;
//         }

//     }
// })

// export const {setAuthData,setStatus,resetStatus}=authSlice.actions
// export default authSlice.reducer


// /*teacher login*/
// export function teacherLogin(teacherLoginData:ITeacherLoginData){
//     return async function teacherLoginThunk(dispatch:AppDispatch){
//         try {
//             const response  =await teacherAPI.post('teacher/login',teacherLoginData)
//             if(response.status === 200){
//                 localStorage.setItem("token",response.data.data.token)
//                 response.data.data && dispatch(setAuthData(response.data.data))
//                 dispatch(setStatus(Status.SUCCESS))
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//                 dispatch(setStatus(Status.ERROR))
            
//         }
//     }
// }


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthLoginData, ITeacherAuthSliceState } from "./auth-slice-types";
import { Status } from "@/lib/global/types";
import { AppDispatch } from "../store";
import teacherAPI from "@/lib/https/API";
import { ITeacherLoginData } from "@/app/teacher/auth/login/page";

// Initial state
const initialState: ITeacherAuthSliceState = {
  authData: {
    teacherEmail: "",
    teacherPassword: "",
    instituteNumber: "",
    token: "",
    id: "",
    teacherId: 0,
  },
  status: Status.IDLE,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Sets the authenticated user data
    setAuthData(state: ITeacherAuthSliceState, action: PayloadAction<IAuthLoginData>) {
      state.authData = action.payload;
    },

    // ✅ Sets status like SUCCESS or ERROR
    setStatus(state: ITeacherAuthSliceState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    // ✅ Reset status to IDLE
    resetStatus(state: ITeacherAuthSliceState) {
      state.status = Status.IDLE;
    },

    // ✅ Clears the auth state (logout or cleanup)
    resetAuth(state: ITeacherAuthSliceState) {
      state.authData = {
        teacherEmail: "",
        teacherPassword: "",
        instituteNumber: "",
        token: "",
        id: "",
        teacherId: 0,
      };
      state.status = Status.IDLE;
    },
  },
});

// Exports
export const { setAuthData, setStatus, resetStatus, resetAuth } = authSlice.actions;
export default authSlice.reducer;

//
// ✅ THUNK: Teacher login
//
export function teacherLogin(teacherLoginData: ITeacherLoginData) {
  return async function teacherLoginThunk(dispatch: AppDispatch) {
    try {
      const response = await teacherAPI.post("teacher/login", teacherLoginData);
      
      if (response.status === 200) {
        // ✅ Store token in localStorage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("authData", JSON.stringify(response.data.data));

        // ✅ Reset auth state before setting new
        dispatch(resetAuth());

        // ✅ Set new auth data
        dispatch(setAuthData(response.data.data));
        dispatch(setStatus(Status.SUCCESS));

        console.log("✅ Login Success:", response.data.data);
      } else {
        dispatch(setStatus(Status.ERROR));
        console.error("❌ Unexpected login response:", response);
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      dispatch(resetAuth()); // Reset if login fails
      console.error("❌ Login error:", error);
    }
  };
}
