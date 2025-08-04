import { Status } from "@/lib/GlobalTypes/type"

export interface ITeacherDataModal{
    teacherName:string,
    teacherEmail:string,
    teacherPhoneNumber:string,
    teacherExpertise:string,
    teacherJoinDate:string,
    teacherSalary:string,
    teacherImage:File |string | null //3
}

export interface ITeacherData extends ITeacherDataModal{
    id:string,
    teacherId:string | number,
    
}

export interface IInitialTeacherData{
    teacher:ITeacherData[],
    status:Status
}