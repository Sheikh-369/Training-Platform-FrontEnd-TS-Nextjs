import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryData, ICategoryDataModal, IInitialCategoryData } from "./categorySliceTypes";
import { Status } from "@/lib/GlobalTypes/type";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { AppDispatch } from "../../store";
const initialState:IInitialCategoryData={
    data:[],
    status:Status.LOADING
}
const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setData(state:IInitialCategoryData,action:PayloadAction<ICategoryData[]>){
            state.data=action.payload
        },
        setStatus(state:IInitialCategoryData,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

const {setData,setStatus}=categorySlice.actions
export default categorySlice.reducer

// fetch category
export function fetchCategory(){
    return async function fetchCategoryThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.get("institute/category")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                response.data.data.length>0 && dispatch(setData(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//add category
export function addCategory(categoryData:ICategoryDataModal){
    return async function addCategoryThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.post("institute/category",categoryData)
            if(response.status===200){
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

//delete category
export function deleteCategory(id:string){
    return async function deleteCategoryThunk(dispatch:AppDispatch){
        try {
            const response=await APIWITHTOKEN.delete("category"+id)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                response.data.data.length>0 && dispatch(setData(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}