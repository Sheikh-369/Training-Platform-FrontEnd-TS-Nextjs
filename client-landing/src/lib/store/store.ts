import { configureStore } from "@reduxjs/toolkit"

import homeSlice from "./home-slice"


const store=configureStore({
    reducer:{
        home:homeSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>