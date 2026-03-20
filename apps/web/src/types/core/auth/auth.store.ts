import { authMachine } from "@/src/states/auth/auth.machine";
import { AuthData } from "@/src/types/core/auth/auth.data";
import { ActorRefFrom } from "xstate";

export interface AuthStore {
    service: ActorRefFrom<typeof authMachine>
    auth: AuthData | null;

    setAuth: (auth: AuthData) => void;
    clearAuth: () => void;
}