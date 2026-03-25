import { AuthData } from "@/src/features/auth/types/auth.data";
import { DONE_ACTOR_CHECK_AUTH_EVENT, DONE_ACTOR_CHECK_REGISTRATION_EVENT, HYDRATE_EVENT, SIGN_IN_ALL_EVENTS, SIGN_OUT_EVENT, SignUpEvents, VerifyEmailEvents } from "./auth.events";
import { ActorRefFrom } from "xstate";
import { authMachine } from "@/src/features/auth/state/auth.machine";

export interface AuthMachineContext {
  auth: AuthData | null;
  registration: AuthRegistration | null;
  error: string | null;
}

export type AuthMachineEvent =
  | SIGN_IN_ALL_EVENTS
  | SignUpEvents
  | VerifyEmailEvents
  | SIGN_OUT_EVENT
  | HYDRATE_EVENT
  | DONE_ACTOR_CHECK_AUTH_EVENT
  | DONE_ACTOR_CHECK_REGISTRATION_EVENT;

export interface AuthRegistration {
    email: string;
    expiredAt: number;
}

//

export type AuthMachineActor = ActorRefFrom<typeof authMachine>;

export type AuthMachineState = AuthMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type AuthMachineSend = AuthMachineActor["send"];