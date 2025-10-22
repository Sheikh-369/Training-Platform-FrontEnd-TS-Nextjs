import { Status } from "@/lib/global-types/type"


export interface ICourseData {
  id: number;
  courseName: string;
  coursePrice: string;
  courseDuration: string;
  courseDescription: string;
  courseLevel: string;
  courseThumbnail?: File | null | string;
  categoryName: string;
  teacherName: string;
  teacherId: string | number;
  categoryId: string | number;
}


export interface ICourseSliceState{
    course:ICourseData[] | null,
    selectedCourse: ICourseData | null,
    status:Status
}