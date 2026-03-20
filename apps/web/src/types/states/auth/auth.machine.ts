import { AuthRegistration } from "@/src/core/types/auth/auth.state";
import { AuthState } from "@/src/core/types/auth/auth.state";
import { ProfileData } from "@/src/core/types/domain/profile/profile.data";
import { SignInActorEvents } from "./auth.actors";

export interface AuthMachineContext {
  auth: AuthState | null;
  registration: AuthRegistration | null;
}

export type AuthMachineEvent =
  | AuthMachineSignInEvent
  | { type: "SIGN_UP"; username: string; email: string; password: string }
  | { type: "SIGN_UP_COMPLETED"; accessToken: string; profile: ProfileData }
  | { type: "SIGN_UP_EXPIRED" }
  | { type: "SIGN_OUT" }
  | { type: "HYDRATE" }
  | { type: "done.invoke.hydrate"; output: { accessToken: string; profile: ProfileData } };

export type AuthMachineSignInEvent = 
  | { type: "SIGN_IN"; identifier: string; password: string }
  | SignInActorEvents;