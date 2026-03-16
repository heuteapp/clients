import { AuthActions, AuthState } from "@/src/core/types/auth/auth.store";
import { RefObject } from "react";

export type AuthStoreController = RefObject<AuthStoreContent | null>;

export type AuthStoreContent = AuthState & AuthActions;