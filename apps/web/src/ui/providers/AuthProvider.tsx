"use client";

import { useEffect, useState } from "react";
import { authService } from "@/src/states/auth/auth.machine";
import { authFacade } from "@/src/core/auth/auth.facade";
import { authFacadeManager } from "@/src/states/auth/auth.facade";
import { AuthContext } from "../contexts/auth.context";
import { usePathname, useRouter } from "next/dist/client/components/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
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

    useEffect(() => {
        if (state.matches("unauthenticated") && pathname?.startsWith("/workspace")) {
            router.push("/workspace/sign-in");
        }
    }, [router, pathname, state]);

    return (
        <AuthContext.Provider value={{ state, send: authService.send }}>
            {children}
        </AuthContext.Provider>
    );
}