import { AuthRegistration, AuthSession } from "@/src/modules/auth/types/auth.types";
import { ActorRefFrom } from "xstate";
import { authMachine } from "@/src/modules/auth/state/auth.machine";
import { AuthEvent } from "./auth.events.types";

export interface AuthMachineContext {
  session: AuthSession | null;
  refreshedOnce?: boolean;
  registration: AuthRegistration | null;
  error: string | null;
}

export type AuthMachineEvent =
  | AuthEvent

//

export type AuthMachineActor = ActorRefFrom<typeof authMachine>;

export type AuthMachineState = AuthMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type AuthMachineSend = AuthMachineActor["send"];