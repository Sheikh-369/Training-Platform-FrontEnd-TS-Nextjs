import { Status } from "@/lib/global-types/type";

export interface IInstituteCourseData{
    id:number,
    courseName:string, 
    coursePrice:string, 
    courseDuration:string, 
    courseDescription:string,
    categoryName:string,
    instituteName:string,
    instituteImage:string | null            
}

export interface IInstituteCourseSliceState{
    instituteCourse:IInstituteCourseData[],
    status:Status
}