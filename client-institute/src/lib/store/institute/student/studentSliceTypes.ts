import { Status } from "@/lib/GlobalTypes/type"

export interface IStudentDataModal{
    studentName:string,
    studentPhoneNo:string,
    studentAddress:string,
    enrolledDate:string
}

export interface IStudentData extends IStudentDataModal{
    id:string
}

export interface IInitialStudentData{
    student:IStudentData[],
    status:Status
}