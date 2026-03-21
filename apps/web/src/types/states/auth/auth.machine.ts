import { AuthData } from "@/src/types/core/auth/auth.data";
import { DONE_ACTOR_CHECK_AUTH_EVENT, DONE_ACTOR_CHECK_REGISTRATION_EVENT, HYDRATE_EVENT, SIGN_IN_ALL_EVENTS, SIGN_OUT_EVENT, SIGN_UP_ALL_EVENTS } from "./auth.events";

export interface AuthMachineContext {
  auth: AuthData | null;
  registration: AuthRegistration | null;
  error: string | null;
}

export type AuthMachineEvent =
  | SIGN_IN_ALL_EVENTS
  | SIGN_UP_ALL_EVENTS
  | SIGN_OUT_EVENT
  | HYDRATE_EVENT
  | DONE_ACTOR_CHECK_AUTH_EVENT
  | DONE_ACTOR_CHECK_REGISTRATION_EVENT;

export interface AuthRegistration {
    email: string;
    expiredAt: number;
}