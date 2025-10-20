import { Status } from "@/lib/global-types/type";

export interface IInstituteCourseData{
    id:number,
    courseName:string,
    courseThumbnail:string, 
    coursePrice:string, 
    courseDuration:string, 
    courseDescription:string,
    categoryName:string,
    instituteName:string,
    instituteImage:string | null            
}

export interface IInstituteCourseSliceState{
    instituteCourse:IInstituteCourseData[],
    selectedCourse: IInstituteCourseData | null;
    status:Status
}