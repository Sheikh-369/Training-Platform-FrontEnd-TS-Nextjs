import { Status } from "@/lib/GlobalTypes/type"

export interface ITeacherDataModal{
    teacherName:string,
    teacherEmail:string,
    teacherPhoneNumber:string,
    teacherExpertise:string,
    teacherJoinDate:string,
    teacherSalary:string
}

export interface ITeacherData extends ITeacherDataModal{
    id:string,
    
}

export interface IInitialTeacherData{
    teacher:ITeacherData[],
    status:Status
}