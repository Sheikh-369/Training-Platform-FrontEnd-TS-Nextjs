import { Status } from "@/lib/GlobalTypes/type"

export interface ICourseData{
    id:string | number,
    courseName:string,
    coursePrice:string,
    courseDuration:string,
    courseDescription:string,
    courseLevel:string,
    categoryName:string,
    teacherName:string,
    teacherId:string | number
}

export interface IInitialStateCourseData{
    course:ICourseData[],
    status:Status
}