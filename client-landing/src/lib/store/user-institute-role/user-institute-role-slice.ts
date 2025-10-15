import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInstituteRoleData, IUserInstituteRoleSliceState } from "./user-institute-role-type";
import { Status } from "@/lib/global-types/type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/https/APIWithToken";

const initialState:IUserInstituteRoleSliceState={
    institutes:[],
    status:Status.IDLE
}

const userInstituteRoleSlice=createSlice({
    name:"userInstituteRole",
    initialState,
    reducers:{
        setUserInstituteRole(state:IUserInstituteRoleSliceState,action:PayloadAction<IUserInstituteRoleData[]>){
            state.institutes=action.payload
        },

        setStatus(state:IUserInstituteRoleSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },

        // //user logout vaesi usko data pani display nagrne(hataune) code
        // clearUserInstituteRole(state) {
        //     state.institutes = [];
        //     state.status = Status.IDLE;
        // }

    }
})

export const{setStatus,setUserInstituteRole}=userInstituteRoleSlice.actions
export default userInstituteRoleSlice.reducer

//fetching all institutes where user is linked with as teacher/student/owner
export function fetchUserInstitutes(){
    return async function fetchUserInstitutesThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("user-institutes")
            if(response.status===200){
                dispatch(setUserInstituteRole(response.data))
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