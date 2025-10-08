import { Status } from "@/lib/global-types/type";

export interface IInstituteRegisterData {
  id?:number,
  instituteName: string;
  instituteEmail: string;
  institutePhoneNumber: string;
  instituteAddress: string;
  institutePanNumber: string;
  instituteVatNumber: string;
  instituteImage:File | string | null
}

export interface IInstituteRegisterSliceState{
    instituteRegister:IInstituteRegisterData | null,
    status:Status
}