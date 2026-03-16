import { AuthActions, AuthState } from "@/src/core/types/auth/auth.store";

export type AuthManager = React.RefObject<AuthState & AuthActions | null>