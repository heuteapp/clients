import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export interface AuthMachineContext {
  accessToken: string | null;
  profile: ProfileData | null;
}

export type AuthMachineEvent =
  | { type: "SIGN_IN"; identifier: string; password: string }
  | { type: "SIGN_IN_SUCCESS"; accessToken: string; profile: ProfileData }
  | { type: "SIGN_IN_FAILURE" }
  | { type: "SIGN_UP"; username: string; email: string; password: string }
  | { type: "SIGN_UP_COMPLETED"; accessToken: string; profile: ProfileData }
  | { type: "SIGN_UP_EXPIRED" }
  | { type: "SIGN_OUT" }
  | { type: "HYDRATE" };