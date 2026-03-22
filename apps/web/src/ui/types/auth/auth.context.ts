import { AuthMachineSend, AuthMachineState } from "@/src/types/states/auth/auth.machine";

export interface AuthContextValue {
    state: AuthMachineState;
    send: AuthMachineSend;
}