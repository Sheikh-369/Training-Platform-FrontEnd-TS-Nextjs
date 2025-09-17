import { Status } from "@/lib/global/types";

export interface ITeacher {
    id?: string;
    teacherName: string;
    teacherEmail: string;
    teacherPhoneNumber: string;
    teacherExpertise: string;
    teacherJoinDate?: string;
    teacherImage:File |string | null;
    teacherAddress: string;
    teacherInstituteName?: string;
    aboutTeacher?: string;
}

export interface ITeacherSliceState {
    teacher: ITeacher | null;
    status:Status
}
