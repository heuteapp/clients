import { WorkspaceDailyboardMachineSend, WorkspaceDailyboardMachineState } from "./state/workspace-dailyboard.machine.types";

export interface WorkspaceDailyboardContextValue {
    state: WorkspaceDailyboardMachineState;
    send: WorkspaceDailyboardMachineSend;
}