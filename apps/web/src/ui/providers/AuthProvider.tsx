"use client";

import { useEffect, useState } from "react";
import { authService } from "@/src/states/auth/auth.machine";
import { authFacade } from "@/src/core/auth/auth.facade";
import { authFacadeManager } from "@/src/states/auth/auth.facade";
import { AuthContext } from "../contexts/auth.context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState(() => authService.getSnapshot());
     
    useEffect(() => {
        authFacade.setManager(authFacadeManager);
        authService.start();

        const subscription = authService.subscribe((newState) => {
            setState(newState);
        });
        
        return () =>  {
            subscription.unsubscribe();
            authService.stop(); 
            authFacade.setManager(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, send: authService.send }}>
            {children}
        </AuthContext.Provider>
    );
}