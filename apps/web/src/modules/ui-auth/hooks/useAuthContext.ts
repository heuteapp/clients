import { useContext } from "react";
import { AuthContext } from "@/src/modules/ui-auth/contexts/auth.context";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
};