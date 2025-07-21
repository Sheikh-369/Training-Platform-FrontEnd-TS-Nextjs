import { IInstituteData } from "@/app/institute/instituteTypes";
import { Status } from "@/lib/GlobalTypes/type";

export interface IInitialInstitute{
    institute:IInstituteData,
    status:Status
}