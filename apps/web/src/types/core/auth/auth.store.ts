import { AuthData } from "@/src/types/core/auth/auth.data";

export interface AuthStore extends AuthData {
    setState: (state: AuthData) => void;
}