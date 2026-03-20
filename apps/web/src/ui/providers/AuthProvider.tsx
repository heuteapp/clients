import { useEffect } from "react";
import { authService } from "@/src/states/auth/auth.machine";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        authService.start();
        return () =>  {authService.stop(); }
    }, []);

    return (
        <>{children}</>
    );
}