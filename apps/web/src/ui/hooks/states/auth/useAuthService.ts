import { authMachine } from "@/src/states/auth/auth.machine";
import { useMachine } from "@xstate/react";

export function useAuthService() {
    const [state, send] = useMachine(authMachine);
    
    return [
        state,
        send
    ] as const;
}