import { StoredDailyboardModel } from "@/src/heute-store/types/board.types";
import { WorkspaceDailyboardMachineSend, WorkspaceDailyboardMachineState } from "./state/workspace-dailyboard.machine.types";
import { WorkspaceDailyboardMetadata } from "./workspace-dailyboard.types";
import { StoredCanvasModel } from "@/src/heute-store/types/canvas.types";

export interface WorkspaceDailyboardContextValue {
    metadata: WorkspaceDailyboardMetadata;
    state: WorkspaceDailyboardMachineState;
    send: WorkspaceDailyboardMachineSend;
    dailyboard: StoredDailyboardModel | null;
    canvas: StoredCanvasModel | null;
}