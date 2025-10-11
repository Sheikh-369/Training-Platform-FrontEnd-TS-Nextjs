// types.ts

import { Status } from "@/lib/global-types/type";

export interface IUserInstituteRoleData {
  instituteNumber: string;
  instituteName: string;
  instituteAddress: string;
  instituteImage: string;
  role: 'teacher' | 'student' | 'institute' | 'super-admin' | string;
}

export interface IUserInstituteRoleSliceState {
  institutes: IUserInstituteRoleData[];
  status: Status;
}
