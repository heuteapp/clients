import { AuthMachineContext, AuthMachineEvent } from "@/src/modules/auth/types/auth.machine.types";
import { createAssign } from "@/src/modules/auth/utils/create-assign";

export const signInSuccessAction = createAssign<AuthMachineContext, AuthMachineEvent>(
    ({ event }) => {
        if (event.type !== "SIGN_IN_SUCCESS") {
            throw new Error("Invalid event");
        }

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

        return {
            session: null,
            error: event.error,
        }
    }
);