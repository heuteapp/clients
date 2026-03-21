"use client";

import { useEffect } from "react";
import { authService } from "@/src/states/auth/auth.machine";
import { authFacade } from "@/src/core/auth/auth.facade";
import { authFacadeManager } from "@/src/states/auth/auth.facade";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        authFacade.setManager(authFacadeManager);
        authService.start();
        return () =>  {
            authService.stop(); 
            authFacade.setManager(null);
        }
    }, []);

    return (
        <>{children}</>
    );
}