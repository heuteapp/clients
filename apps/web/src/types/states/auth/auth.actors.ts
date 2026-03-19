import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export type SignInActorEvents = 
  | { type: 'SIGN_IN_SUCCESS'; accessToken: string; profile: ProfileData }
  | { type: 'SIGN_IN_FAILURE'; error: string };