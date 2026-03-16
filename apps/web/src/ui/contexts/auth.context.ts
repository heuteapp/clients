import { createContext } from "react";
import { AuthContextValue } from "@/src/ui/types/auth/auth.context";

export const AuthContext = createContext<AuthContextValue | null>(null);