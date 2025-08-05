import { Status } from "@/lib/GlobalTypes/type"


export interface IUserData {
  userName: string;
  userEmail: string;
  token: string;
}


export interface IInitialState{
    user:IUserData,
    status:Status
}