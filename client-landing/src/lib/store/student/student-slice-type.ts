import { Status } from "@/lib/global-types/type"

export interface IStudentData{
    id?:number,
    studentName:string,
    studentEmail:string,
    studentPhoneNo:string,
    studentAddress:string,
    enrolledDate:string,
    studentImage:File | string | null,
    aboutStudent:string,
    studentInstituteName:string,
    studentInstituteAddress:string,
    studentInstituteImage:string
}

export interface IStudentSliceState{
    student:IStudentData | null,
    status:Status
}