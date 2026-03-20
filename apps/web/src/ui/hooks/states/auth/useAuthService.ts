import { authService } from "@/src/states/auth/auth.machine";
import { useEffect, useState } from "react";

export function useAuthService() {
    const [state, setState] = useState(() => authService.getSnapshot());

    useEffect(() => {
        const subscription = authService.subscribe((newState) => {
            setState(newState);
        });
        
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return [state, authService.send] as const;
}