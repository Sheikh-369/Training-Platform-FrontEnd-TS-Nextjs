import { Status } from "@/lib/global/types"

export interface IAuthLoginData{
    instituteNumber:string | number,
    teacherEmail:string,
    teacherPassword:string,
    token:string,
    id:string | number,
    teacherId?:string | number
}

export interface ITeacherAuthSliceState{
    authData:IAuthLoginData,
    status:Status
}