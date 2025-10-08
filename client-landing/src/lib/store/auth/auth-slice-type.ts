import { Status } from "@/lib/global-types/type";


export interface IUserData {
  userName?: string;
  userEmail: string;
  userPassword?:string,
  token?: string;
  OTP?:string | number,
  newPassword?:string,
  confirmNewPassword?:string
}


export interface IAuthSliceState{
    user:IUserData | null,
    status:Status
}