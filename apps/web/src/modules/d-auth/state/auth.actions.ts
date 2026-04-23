import { AuthMachineContext, AuthMachineEvent } from "@/src/modules/d-auth/types/auth.machine.types";
import { createAssign } from "@/src/modules/d-auth/utils/create-assign";

export const redirectingEntryAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if(event.type !== "REDIRECT_REQUEST") {
            throw new Error("Invalid event");
        }

        const sessionStr = localStorage.getItem("session");
        const session = sessionStr 
            ? JSON.parse(sessionStr) 
            : null;

        const registrationStr = localStorage.getItem("registration");
        const registration = registrationStr 
            ? JSON.parse(registrationStr) 
            : null;

        return {
            session,
            registration,
            error: null,
            temp: {
                accessToken: null
            }
        }
    }
);

export const sessionHydrateSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SESSION_HYDRATE_DONE") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("session", JSON.stringify(event.payload));

        return {
            session: event.payload,
            registration: null,
            error: null,
        }
    }
);

export const sessionHydrateFailureAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SESSION_HYDRATE_ERROR") {
            throw new Error("Invalid event");
        }

        return {
            error: {
                id: "sessionHydrate",
                message: event.error,
            },
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
        if (event.type !== "SESSION_REFRESH_DONE") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("session", JSON.stringify(event.payload));

        return {
            session: event.payload,
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
        if (event.type !== "SESSION_REFRESH_ERROR") {
            throw new Error("Invalid event");
        }

        return {
            error: {
                id: "sessionRefresh",
                message: event.error,
            },
        }
    }
);

export const unauthenticatedEntryAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    () => {
        localStorage.removeItem("session");
        localStorage.removeItem("registration");

        return {
            session: null,
            registration: null,
            temp: {
                accessToken: null,
            }
        }
    }
);

//

export const signInSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_IN_DONE") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("session", JSON.stringify(event.payload));

        return {
            session: event.payload,
            registration: null,
            error: null,
        }
    }
);

export const signInFailureAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_IN_ERROR") {
            throw new Error("Invalid event");
        }

        return {
            error: {
                id: "signIn",
                message: event.error,
            },
        }
    }
);

export const signUpSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_UP_DONE") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("registration", JSON.stringify(event.payload));

        return {
            session: null,
            registration: event.payload,
            error: null,
        }
    }
);

export const signUpFailureAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_UP_ERROR") {
            throw new Error("Invalid event");
        }

        return {
            error: {
                id: "signUp",
                message: event.error,
            },
        }
    }
);

export const verifyEmailRequestAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "VERIFY_EMAIL_REQUEST") {
            throw new Error("Invalid event");
        }

        return {
            error: null,
        }
    }
);

export const verifyEmailConfirmAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "VERIFY_EMAIL_CONFIRM") {
            throw new Error("Invalid event");
        }

        return {
            error: null,
            temp: {
                accessToken: event.accessToken,
            }
        }
    }
);

export const verifyEmailAssumeAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "VERIFY_EMAIL_ASSUME") {
            throw new Error("Invalid event");
        }

        return {
            error: {
                id: "verifyEmail",
                message: event.error || "Assumed email verification failure",
            },
        }
    }
);

export const verifyEmailDoneAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "VERIFY_EMAIL_DONE") {
            throw new Error("Invalid event");
        }

        localStorage.setItem("session", JSON.stringify(event.payload));
        localStorage.removeItem("registration");

        return {
            session: event.payload,
            registration: null,
            error: null,
        }
    }
);

export const verifyEmailErrorAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "VERIFY_EMAIL_ERROR") {
            throw new Error("Invalid event");
        }

        return {
            error: {
                id: "verifyEmail",
                message: event.error,
            },
        }
    }
);

export const verifyEmailExpiredAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ context, event }) => {
        if (event.type !== "VERIFY_EMAIL_EXPIRED") {
            throw new Error("Invalid event");
        }

        localStorage.removeItem("registration");

        return {
            registration: null,
            error: {
                id: "verifyEmail",
                message: `Verification timed out for ${context.registration?.email || "(unknown email)"}`,
            },
        }
    }
);