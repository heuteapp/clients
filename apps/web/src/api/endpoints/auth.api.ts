import { serverApi } from "@/src/api/server";
import { SignInRequest, SignUpRequest } from "../models/auth.request";
import { SignInResponse, SignUpResponse } from "../models/auth.response";

export const authApi = {
  signIn: (request: SignInRequest): Promise<SignInResponse> =>
      serverApi.post<SignInResponse>("/auth/sign-in", request).then(res => res.data),
  
  signUp: (request: SignUpRequest): Promise<SignUpResponse> =>
      serverApi.post<SignUpResponse>("/auth/sign-up", request).then(res => res.data),
};