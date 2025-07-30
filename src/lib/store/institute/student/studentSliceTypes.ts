import { Status } from "@/lib/GlobalTypes/type"

export interface IStudentData{
    id:string,
    studentName:string,
    studentPhoneNo:string,
    studentAddress:string,
    enrolledDate:string
}

export interface IInitialStudentData{
    student:IStudentData[],
    status:Status
}