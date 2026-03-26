import { createContext } from "react";
import { AuthContextValue } from "@/src/modules/ui-auth/types/auth.context";

export const AuthContext = createContext<AuthContextValue | null>(null);