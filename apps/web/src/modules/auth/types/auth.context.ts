import { AuthMachineSend, AuthMachineState } from "@/src/authentication/types/auth.machine.types";

export interface AuthContextValue {
    state: AuthMachineState;
    send: AuthMachineSend;
}