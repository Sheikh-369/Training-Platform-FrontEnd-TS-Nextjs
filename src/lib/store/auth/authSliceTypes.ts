import { Status } from "@/lib/types/type"

export interface IUserData{
    userName:string,
    userEmail:string,
    userPassword:string
}

export interface IInitialState{
    user:IUserData,
    status:Status
}