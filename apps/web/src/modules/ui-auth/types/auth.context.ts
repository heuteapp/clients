import { AuthMachineSend, AuthMachineState } from "@/src/modules/authentication/types/auth.machine.types";

export interface AuthContextValue {
    state: AuthMachineState;
    send: AuthMachineSend;
}