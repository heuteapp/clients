import { BaseData } from "@/src/types/shared/core/data";

export interface ProfileData extends BaseData {
    username: string;
    email: string;
}