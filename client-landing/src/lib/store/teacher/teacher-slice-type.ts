import { Status } from "@/lib/global-types/type"

export interface ITeacherData{
    id:number,
    teacherName:string,
    teacherEmail:string,
    teacherPhoneNumber:string,
    teacherExpertise:string,
    teacherJoinDate:string,
    teacherSalary:string,
    teacherAddress:string,
    aboutTeacher:string,
    teacherImage:string,
    teacherInstituteName:string,
    teacherInstituteAddress:string,
    teacherInstituteImage:string
}

export interface ITeacherSliceState{
    teacher:ITeacherData | null,
    status:Status
}