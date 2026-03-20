import { BaseData } from "@/src/core/types/shared/data";

export interface ProfileData extends BaseData {
    username: string;
    email: string;
}