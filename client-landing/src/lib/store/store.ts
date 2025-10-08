import { configureStore } from "@reduxjs/toolkit"

import homeSlice from "../store/home/home-slice"
import instituteCourseSlice from "../store/institute-course/institute-course"
import authSlice from "../store/auth/auth-slice"

const store=configureStore({
    reducer:{
        home:homeSlice,
        course:instituteCourseSlice,
        auth:authSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>