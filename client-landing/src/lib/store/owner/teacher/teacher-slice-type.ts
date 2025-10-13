import { Status } from "@/lib/global-types/type";

export interface IInstituteTeacherData{
    id?:number,
    teacherName:string,
    teacherEmail:string,
    teacherPhoneNumber:string,
    teacherExpertise:string,
    teacherJoinDate:string,
    teacherImage:File | string | null,
    teacherSalary:string,
    teacherAddress:string,
}

export interface IInstituteTeacherSliceState{
    instituteTeacher:IInstituteTeacherData[] | null,
    status:Status
}