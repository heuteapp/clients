import { ActorRefFrom } from "xstate";
import { authMachine } from "@/src/states/auth/auth.machine";

export interface AuthStore {
    service: ActorRefFrom<typeof authMachine>
}