import { Status } from "@/lib/global/types";

export interface ITeacher {
    id: string;
    teacherName: string;
    teacherEmail: string;
    teacherPhoneNumber: string;
    teacherExpertise: string;
    teacherJoinDate: string;
    teacherImage: string;
    teacherAddress: string;
    teacherInstituteName: string;
    aboutTeacher?: string;
}

export interface ITeacherSliceState {
    teacher: ITeacher | null;
    status:Status
}
