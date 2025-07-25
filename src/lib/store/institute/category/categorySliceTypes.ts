import { Status } from "@/lib/GlobalTypes/type"

export interface ICategoryData{
    id:string,
    categoryName:string,
    categoryDescription:string,
    createdAt:string
}

export interface IInitialCategoryData{
    data:ICategoryData[],
    status:Status
}