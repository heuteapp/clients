import { AuthFacadeManager } from "@/src/states/auth/auth.facade";
import { AuthFacade } from "@/src/types/core/auth/auth.facade";
import { useRef } from "react";

export function useAuthFacade() : AuthFacade {
    const facade = useRef(new AuthFacade(
        new AuthFacadeManager()
    ));

    return facade.current;
}