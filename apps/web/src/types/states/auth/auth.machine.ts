import { AuthRegistration } from "@/src/core/types/auth/auth.state";
import { AuthState } from "@/src/core/types/auth/auth.state";
import { SignInActorEvents } from "./auth.actors";
import { DONE_INVOKE_HYDRATE_EVENT, HYDRATE_EVENT, SIGN_IN_EVENT, SIGN_IN_FAILURE_EVENT, SIGN_IN_SUCCESS_EVENT, SIGN_OUT_EVENT, SIGN_UP_COMPLETED_EVENT, SIGN_UP_EVENT, SIGN_UP_EXPIRED_EVENT } from "./action.events";

export interface AuthMachineContext {
  auth: AuthState | null;
  registration: AuthRegistration | null;
}

export type AuthMachineEvent =
  | SIGN_IN_EVENT
  | SIGN_IN_SUCCESS_EVENT
  | SIGN_IN_FAILURE_EVENT
  | SIGN_UP_EVENT
  | SIGN_UP_COMPLETED_EVENT
  | SIGN_UP_EXPIRED_EVENT
  | SIGN_OUT_EVENT
  | HYDRATE_EVENT
  | DONE_INVOKE_HYDRATE_EVENT;

export type AuthMachineSignInEvent = 
  | { type: "SIGN_IN"; identifier: string; password: string }
  | SignInActorEvents;