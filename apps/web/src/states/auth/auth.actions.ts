import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { createAssign } from "@/src/utils/xstate/create-assign";

export const persistAuth = createAssign<
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