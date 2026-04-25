import { AuthMachineSend, AuthMachineState } from "@/src/modules/d-auth/types/auth.machine.types";

export interface AuthContextValue {
    state: AuthMachineState;
    send: AuthMachineSend;
}