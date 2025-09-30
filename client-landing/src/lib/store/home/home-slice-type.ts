import { Status } from "../../global-types/type";

export interface IHomeData {
  id: number;
  instituteName: string;
  instituteAddress: string;
  institutePhoneNumber: string;
  instituteImage: string;
  instituteNumber?: string | number;
}

export interface IHomeSliceState {
  institute: IHomeData[];
  status: Status;
}
