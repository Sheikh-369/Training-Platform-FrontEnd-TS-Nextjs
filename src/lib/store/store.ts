import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import instituteSlice from "./institute/instituteSlice"
import categorySlice from "./institute/category/categorySlice";
import courseSlice from "./institute/course/courseSlice"
import teacherSlice from "./institute/teacher/teacherSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        institute:instituteSlice,
        category:categorySlice,
        course:courseSlice,
        teacher:teacherSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>