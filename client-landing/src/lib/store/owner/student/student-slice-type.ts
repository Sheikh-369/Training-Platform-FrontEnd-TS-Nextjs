import { Status } from "@/lib/global-types/type"

export interface IInstituteStudentData{
    id?:number,
    studentName:string,
    studentEmail:string,
    studentPhoneNo:string,
    studentAddress:string,
    studentImage:string,
    enrolledDate:string
}

export interface IInstituteStudentSliceState{
    instituteStudent:IInstituteStudentData[] | null,
    status:Status
}