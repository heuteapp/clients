import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { createAssign } from "@/src/utils/xstate/create-assign";

export const resolveAuthData = (event: AuthMachineEvent) => {
    if (event.type === "SIGN_IN_SUCCESS" || event.type === "VERIFY_EMAIL_COMPLETED") {
        return {
            accessToken: event.accessToken,
            profile: event.profile,
        };
    }

    if (event.type === "xstate.done.actor.check-auth") {
        return event.output;
    }

    throw new Error("Invalid event type for auth: " + event.type);
};

//

export const setAuthAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    ({ event }) => {
        return {
            auth: resolveAuthData(event),
            error: null
        };
    }
);

export const unsetAuthAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    () => {
        return {
            auth: null,
            error: null,
        };
    }
);

export const persistAuthAction = ({ context }: { context: AuthMachineContext }) => {
    if (!context.auth) return;

    localStorage.setItem("auth", JSON.stringify(context.auth));
};

export const clearAuthAction = () => {
    localStorage.removeItem("auth");
};

//

export const setRegistrationAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    ({ event }) => {
        if (event.type === "SIGN_UP_SUCCESS") {
            return {
                registration: {
                    email: event.email,
                    expiredAt: Date.now() + 10 * 60 * 1000,
                },
            };
        }

        if (event.type === "xstate.done.actor.check-registration") {
            return {
                registration: event.output,
            };
        }

        throw new Error("Invalid event type for registration: " + event.type);
    }
);

export const unsetRegistrationAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    () => {
        return {
            registration: null,
        };
    }
);

export const persistRegistrationAction = ({ context }: { context: AuthMachineContext }) => {
    if (!context.registration) return;

    localStorage.setItem("registration", JSON.stringify(context.registration));
};

export const clearRegistrationAction = () => {
    localStorage.removeItem("registration");
};

//

export const setErrorAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    ({ event }) => {
        if (event.type !== "SIGN_IN_FAILURE" && event.type !== "SIGN_UP_FAILURE" && event.type !== "VERIFY_EMAIL_NOT_COMPLETED") {
            throw new Error("Invalid event type for setError action");
        }

        return {
            error: event.error,
        };
    }
);

export const unsetErrorAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    () => {
        return {
            error: null,
        };
    }
);