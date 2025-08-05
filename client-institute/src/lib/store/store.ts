import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import instituteSlice from "./institute/instituteSlice"
import categorySlice from "./institute/category/categorySlice";
import courseSlice from "./institute/course/courseSlice"
import teacherSlice from "./institute/teacher/teacherSlice"
import studentSlice from "./institute/student/studentSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        institute:instituteSlice,
        category:categorySlice,
        course:courseSlice,
        teacher:teacherSlice,
        student:studentSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>