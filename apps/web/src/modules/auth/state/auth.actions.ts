import { AuthMachineContext, AuthMachineEvent } from "@/src/modules/auth/types/auth.machine.types";
import { createAssign } from "@/src/modules/auth/utils/create-assign";

export const sessionHydrateSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SESSION_HYDRATE_SUCCESS") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("session", JSON.stringify(event.output));

        return {
            session: event.output,
            error: null,
        }
    }
);

export const sessionHydrateFailureAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SESSION_HYDRATE_FAILURE") {
            throw new Error("Invalid event");
        }

        localStorage.removeItem("session");

        return {
            session: null,
            error: event.error,
        }
    }
);

export const sessionRefreshRequestAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SESSION_REFRESH_REQUEST") {
            throw new Error("Invalid event");
        }

        return {
            session: event.input,
            error: null,
        }
    }
);

//

export const signInSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_IN_SUCCESS") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("session", JSON.stringify(event.output));

        return {
            session: event.output,
            error: null,
        }
    }
);

export const signInFailureAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_IN_FAILURE") {
            throw new Error("Invalid event");
        }

        localStorage.removeItem("session");

        return {
            session: null,
            error: event.error,
        }
    }
);