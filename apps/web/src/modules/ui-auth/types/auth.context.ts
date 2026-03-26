import { AuthMachineSend, AuthMachineState } from "@/src/modules/auth/types/auth.machine.types";

export interface AuthContextValue {
    state: AuthMachineState;
    send: AuthMachineSend;
}