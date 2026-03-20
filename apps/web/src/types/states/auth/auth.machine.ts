import { AuthRegistration } from "@/src/core/types/auth/auth.machine";
import { AuthState } from "@/src/core/types/auth/auth.state";
import { SignInActorEvents } from "./auth.actors";
import { DONE_INVOKE_HYDRATE_EVENT, HYDRATE_EVENT, SIGN_IN_ALL_EVENTS, SIGN_OUT_EVENT, SIGN_UP_ALL_EVENTS } from "./auth.events";

export interface AuthMachineContext {
  auth: AuthState | null;
  registration: AuthRegistration | null;
  error: string | null;
}

export type AuthMachineEvent =
  | SIGN_IN_ALL_EVENTS
  | SIGN_UP_ALL_EVENTS
  | SIGN_OUT_EVENT
  | HYDRATE_EVENT
  | DONE_INVOKE_HYDRATE_EVENT;

export type AuthMachineSignInEvent = 
  | { type: "SIGN_IN"; identifier: string; password: string }
  | SignInActorEvents;