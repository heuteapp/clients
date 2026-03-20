import { ProfileData } from "@/src/types/core/domain/profile/profile.data";

//
export type HYDRATE_EVENT = { type: "HYDRATE" };

//

export type SIGN_IN_EVENT = { type: "SIGN_IN"; identifier: string; password: string };

export type SIGN_IN_SUCCESS_EVENT = { type: "SIGN_IN_SUCCESS"; accessToken: string; profile: ProfileData };

export type SIGN_IN_FAILURE_EVENT = { type: "SIGN_IN_FAILURE"; error: string };

export type SIGN_IN_ALL_EVENTS = SIGN_IN_EVENT | SIGN_IN_SUCCESS_EVENT | SIGN_IN_FAILURE_EVENT;

//

export type SIGN_UP_EVENT = { type: "SIGN_UP"; username: string; email: string; password: string };

export type SIGN_UP_AWAITING_EVENT = { type: "SIGN_UP_AWAITING", email: string };

export type SIGN_UP_FAILURE_EVENT = { type: "SIGN_UP_FAILURE"; error: string };

export type SIGN_UP_COMPLETED_EVENT = { type: "SIGN_UP_COMPLETED"; accessToken: string; profile: ProfileData };

export type SIGN_UP_EXPIRED_EVENT = { type: "SIGN_UP_EXPIRED"; error: string };

export type SIGN_UP_ALL_EVENTS = SIGN_UP_EVENT | SIGN_UP_AWAITING_EVENT | SIGN_UP_FAILURE_EVENT | SIGN_UP_COMPLETED_EVENT | SIGN_UP_EXPIRED_EVENT;

//

export type SIGN_OUT_EVENT = { type: "SIGN_OUT" };

//

export type DONE_INVOKE_HYDRATE_EVENT = { type: "done.invoke.hydrate"; output: { accessToken: string; profile: ProfileData } };