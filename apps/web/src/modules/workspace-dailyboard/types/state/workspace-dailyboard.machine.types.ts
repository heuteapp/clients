import { ActorRefFrom } from "xstate";
import { WorkspaceDailyboardEvent } from "./workspace-dailyboard.events.types";
import { workspaceDailyboardMachine } from "../../state/workspace-dailyboard.machine";
import { StoredDailyboardData } from "@/src/heute-store/types/dailyboard.types";
import { StoredCanvasData, StoredCanvasStyle } from "@/src/heute-store/types/canvas.types";
import { DraftCardInput } from "./workspace-dailyboard.types";

export type WorkspaceDailyboardMachineContext = {
  dailyboardData: StoredDailyboardData | null;
  canvasData: StoredCanvasData | null;
  canvasStyle: StoredCanvasStyle | null;
  draftCard: DraftCardInput | null;
}

export type WorkspaceDailyboardMachineEvent = WorkspaceDailyboardEvent;

//

export type WorkspaceDailyboardMachineActor = ActorRefFrom<typeof workspaceDailyboardMachine>;

export type WorkspaceDailyboardMachineState = WorkspaceDailyboardMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type WorkspaceDailyboardMachineSend = WorkspaceDailyboardMachineActor["send"];