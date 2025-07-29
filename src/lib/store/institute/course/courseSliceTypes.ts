import { Status } from "@/lib/GlobalTypes/type"

export interface ICourseData{
    id:string,
    courseName:string,
    coursePrice:string,
    courseDuration:string,
    courseDescription:string,
    courseLevel:string,
    categoryId:string,
    teacherId:string
}

export interface IInitialStateCourseData{
    course:ICourseData[],
    status:Status
}