import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth/auth-slice"
import teacher from "./teacher/teacherSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        teacher:teacher
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>