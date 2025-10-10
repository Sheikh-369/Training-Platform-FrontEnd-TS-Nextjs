import { Status } from "@/lib/global-types/type"

export interface IOwnerData{
    id?:number,
    instituteName:string,
    instituteImage:File | string | null,
    instituteEmail:string,
    institutePhoneNumber:string,
    instituteAddress:string,
    instituteVatNumber?:string,
    institutePanNumber?:string,
    instituteNumber:string | number,
    createdAt:string
}

export interface IOwnerSliceState{
    owner:IOwnerData | null,
    status:Status
}