import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { createAssign } from "@/src/utils/xstate/create-assign";

export const resolveAuthData = (event: AuthMachineEvent) => {
    if (event.type === "SIGN_IN_SUCCESS" || event.type === "SIGN_UP_COMPLETED") {
        return {
            accessToken: event.accessToken,
            profile: event.profile,
        };
    }

    if (event.type === "xstate.done.actor.check-hydration") {
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

export const persistRegistrationAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    ({ event }) => {
        if (event.type !== "SIGN_UP_AWAITING") {
            throw new Error("Invalid event type for persistRegistration action");
        }

        const data = {
            email: event.email,
            expiredAt: Date.now() + 10 * 60 * 1000, // 10 minutes from now
        };

        localStorage.setItem("registration", JSON.stringify(data));

        return {
            registration: data,
        };
    }
);

export const clearRegistrationAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    () => {
        localStorage.removeItem("registration");
        return {
            registration: null,
        };
    }
);