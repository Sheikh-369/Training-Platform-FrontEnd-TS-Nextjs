import { IInstituteData } from "@/app/institute/register/instituteTypes";
import { Status } from "@/lib/GlobalTypes/type";

export interface IInitialInstitute{
    institute:IInstituteData,
    status:Status
}