import { Status } from "@/lib/global/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chapters: [],
    status:Status.IDLE
}

const chapterSlice = createSlice({
    name: "chapter",
    initialState,
    reducers: {}
})