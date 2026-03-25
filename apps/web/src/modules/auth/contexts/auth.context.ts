import { createContext } from "react";
import { AuthContextValue } from "@/src/modules/auth/types/auth.context";

export const AuthContext = createContext<AuthContextValue | null>(null);