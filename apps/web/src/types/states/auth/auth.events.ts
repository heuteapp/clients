import { ProfileData } from "@/src/types/core/domain/profile/profile.data";
import { DoneActorEvent } from "xstate";

//
export type HYDRATE_EVENT = { type: "HYDRATE" };

//

export type SIGN_IN_EVENT = { type: "SIGN_IN"; identifier: string; password: string };

export type SIGN_IN_SUCCESS_EVENT = { type: "SIGN_IN_SUCCESS"; accessToken: string; profile: ProfileData };

export type SIGN_IN_FAILURE_EVENT = { type: "SIGN_IN_FAILURE"; error: string };

export type SIGN_IN_ALL_EVENTS = SIGN_IN_EVENT | SIGN_IN_SUCCESS_EVENT | SIGN_IN_FAILURE_EVENT;

//

export type SIGN_UP_EVENT = { type: "SIGN_UP"; username: string; email: string; password: string };

export type SIGN_UP_SUCCESS_EVENT = { type: "SIGN_UP_SUCCESS", email: string };

export type SIGN_UP_FAILURE_EVENT = { type: "SIGN_UP_FAILURE"; error: string };

export type SignUpEvents = SIGN_UP_EVENT | SIGN_UP_SUCCESS_EVENT | SIGN_UP_FAILURE_EVENT;

//

export type VERIFY_EMAIL_EVENT = { type: "VERIFY_EMAIL"; };

export type VERIFY_EMAIL_COMPLETED_EVENT = { type: "VERIFY_EMAIL_COMPLETED"; accessToken: string; profile: ProfileData };

export type VERIFY_EMAIL_SUCCESS_EVENT = { type: "VERIFY_EMAIL_SUCCESS"; accessToken: string; profile: ProfileData };

export type VERIFY_EMAIL_FAILED_EVENT = { type: "VERIFY_EMAIL_FAILED"; error: string };

export type VERIFY_EMAIL_EXPIRED_EVENT = { type: "VERIFY_EMAIL_EXPIRED"; email: string };

export type VerifyEmailEvents = VERIFY_EMAIL_EVENT | VERIFY_EMAIL_COMPLETED_EVENT | VERIFY_EMAIL_SUCCESS_EVENT | VERIFY_EMAIL_FAILED_EVENT | VERIFY_EMAIL_EXPIRED_EVENT;

//

export type SIGN_OUT_EVENT = { type: "SIGN_OUT" };

//

export type DONE_ACTOR_CHECK_AUTH_EVENT = DoneActorEvent<{ accessToken: string, profile: ProfileData }, "check-auth">;

export type DONE_ACTOR_CHECK_REGISTRATION_EVENT = DoneActorEvent<{ email: string, expiredAt: number } | null, "check-registration">;