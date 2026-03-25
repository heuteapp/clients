import { BaseData } from "@/src/types/shared/core/data";

export interface UserProfile extends BaseData {
    username: string;
    email: string;
}