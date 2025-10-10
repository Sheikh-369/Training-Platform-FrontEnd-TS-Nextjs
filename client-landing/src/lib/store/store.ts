import { configureStore } from "@reduxjs/toolkit"

import homeSlice from "../store/home/home-slice"
import instituteCourseSlice from "../store/institute-course/institute-course"
import authSlice from "../store/auth/auth-slice"
import instituteRegisterSlice from "../store/register-institute/register-institute-slice"
import ownerSlice from "../store/owner/owner-slice"

const store=configureStore({
    reducer:{
        home:homeSlice,
        course:instituteCourseSlice,
        auth:authSlice,
        instituteRegister:instituteRegisterSlice,
        owner:ownerSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>