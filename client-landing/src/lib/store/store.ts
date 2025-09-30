import { configureStore } from "@reduxjs/toolkit"

import homeSlice from "../store/home/home-slice"
import instituteCourseSlice from "../store/institute-course/institute-course"

const store=configureStore({
    reducer:{
        home:homeSlice,
        course:instituteCourseSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>