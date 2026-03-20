import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { createAssign } from "@/src/utils/xstate/create-assign";

export const persistAuthAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    ({ event }) => {
        let data: { accessToken: string; profile: any };

        if (event.type === "SIGN_IN_SUCCESS" || event.type === "SIGN_UP_COMPLETED") {
        data = {
            accessToken: event.accessToken,
            profile: event.profile,
        };
        } else if (event.type === "done.invoke.hydrate") {
        data = event.output;
        } else {
        throw new Error("Invalid event type for persistAuth action");
        }

        localStorage.setItem("auth", JSON.stringify(data));

        return {
            auth: data,
        };
    }
);

export const clearAuthAction = createAssign<
    AuthMachineContext, AuthMachineEvent
>(
    () => {
        localStorage.removeItem("auth");
        return {
            auth: null,
        };
    }
);

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