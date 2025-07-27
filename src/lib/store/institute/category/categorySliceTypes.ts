import { Status } from "@/lib/GlobalTypes/type"

export interface ICategoryDataModal{
    categoryName:string,
    categoryDescription:string
}

export interface ICategoryData extends ICategoryDataModal{
    id:string,
    createdAt:string
}

export interface IInitialCategoryData{
    data:ICategoryData[],
    status:Status
}