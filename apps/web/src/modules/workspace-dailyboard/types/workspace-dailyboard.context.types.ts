import { WorkspaceDailyboardMachineSend, WorkspaceDailyboardMachineState } from "./state/workspace-dailyboard.machine.types";
import { WorkspaceDailyboardMetadata } from "./workspace-dailyboard.types";

export interface WorkspaceDailyboardContextValue {
    metadata: WorkspaceDailyboardMetadata | null;
    state: WorkspaceDailyboardMachineState;
    send: WorkspaceDailyboardMachineSend;
}