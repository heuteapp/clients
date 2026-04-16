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
            registration: null,
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
            registration: null,
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
            error: null,
            temp: {
                accessToken: event.input.accessToken,
            }
        }
    }
);

export const sessionRefreshSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SESSION_REFRESH_SUCCESS") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("session", JSON.stringify(event.output));

        return {
            session: event.output,
            registration: null,
            error: null,
            temp: {
                accessToken: null,
            }
        }
    }
);

export const sessionRefreshFailureAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SESSION_REFRESH_FAILURE") {
            throw new Error("Invalid event");
        }

        localStorage.removeItem("session");

        return {
            session: null,
            registration: null,
            error: event.error,
            temp: {
                accessToken: null,
            }
        }
    }
);

export const entryUnauthenticatedAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    () => {
        localStorage.removeItem("session");

        return {
            session: null,
            registration: null,
            error: null,
            temp: {
                accessToken: null,
            }
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
            registration: null,
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
            registration: null,
            error: event.error,
        }
    }
);

export const signUpSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_UP_SUCCESS") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("registration", JSON.stringify(event.output));

        return {
            session: null,
            registration: event.output,
            error: null,
        }
    }
);

export const signUpFailureAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_UP_FAILURE") {
            throw new Error("Invalid event");
        }

        localStorage.removeItem("registration");

        return {
            session: null,
            registration: null,
            error: event.error,
        }
    }
);