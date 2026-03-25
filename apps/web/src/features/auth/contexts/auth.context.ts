import { createContext } from "react";
import { AuthContextValue } from "@/src/features/auth/types/auth.context";

export const AuthContext = createContext<AuthContextValue | null>(null);