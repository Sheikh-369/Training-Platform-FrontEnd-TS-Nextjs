import { Status } from "@/lib/global/types"

export interface IAuthData{
    instituteNumber:number,
    teacherEmail:string,
    teacherPassword:string
}

export interface IInitialAuthData{
    auth:IAuthData[],
    status:Status
}