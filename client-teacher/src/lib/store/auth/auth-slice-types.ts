import { Status } from "@/lib/global/types"

export interface IAuthLoginData{
    instituteNumber:number,
    teacherEmail:string,
    teacherPassword:string
}

export interface IInitialAuthData{
    authData:IAuthLoginData[],
    status:Status
}