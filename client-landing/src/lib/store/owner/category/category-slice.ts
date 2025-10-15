import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../../store";
import { ICategoryData, ICategorySliceState } from "./category-slice-type";
import { Status } from "@/lib/global-types/type";
import APIWITHTOKEN from "@/lib/https/APIWithToken";
const initialState:ICategorySliceState={
    category:[],
    status:Status.LOADING
}
const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategory(state:ICategorySliceState,action:PayloadAction<ICategoryData[]>){
            state.category=action.payload
        },
        setStatus(state:ICategorySliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },
        //deleting category(step1)
        removeCategory(state: ICategorySliceState, action: PayloadAction<number>){
            state.category = state.category.filter(category => category.id !== action.payload);
        }
    }
})

export const {setCategory,setStatus,removeCategory}=categorySlice.actions
export default categorySlice.reducer

// fetch category
export function fetchCategory(instituteNumber:string){
    return async function fetchCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get(`institute/category/${instituteNumber}`)
            if(response.status===200){
                dispatch(setCategory(response.data.data))
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

//add category
// export function addCategory(categoryData:ICategoryData){
//     return async function addCategoryThunk(dispatch:AppDispatch){
//         dispatch(setStatus(Status.LOADING))
//         try {
//             const response=await APIWITHTOKEN.post("institute/category",categoryData)
//             if(response.status===200){
//                 dispatch(setStatus(Status.SUCCESS))
//                 dispatch(fetchCategory());//all data gets fetched after addition in UI
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }          
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }

//delete category
export function deleteCategory(id:number){
    return async function deleteCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.delete(`institute/category/+id`)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(removeCategory(id))// Update UI immediately
            }else{
                dispatch(setStatus(Status.ERROR))
            }          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

// updateCategory
// export function updateCategory(id: number, name: ICategoryData) {
//   return async function updateCategoryThunk(dispatch: AppDispatch) {
//     try {
//       const response = await APIWITHTOKEN.patch("institute/category/"+id, name);
//       if (response.status === 200) {
//         dispatch(setStatus(Status.SUCCESS));
//         dispatch(fetchCategory()); // Refresh data
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }