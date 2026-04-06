import { ActorRefFrom } from "xstate";
import { FETCH_EVENT } from "./workspace-dailyboard.events.types";
import { workspaceDailyboardMachine } from "../../state/workspace-dailyboard.machine";
import { StoredDailyboard } from "@/src/heute-store/types/dailyboard.types";
import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";

export type WorkspaceDailyboardMachineContext = {
  dailyboardData: StoredDailyboard | null;
  layoutData: StoredLayoutData | null;
  layoutStyle: StoredLayoutStyle | null;
}

export type WorkspaceDailyboardMachineEvent = 
  | FETCH_EVENT;

//

export type WorkspaceDailyboardMachineActor = ActorRefFrom<typeof workspaceDailyboardMachine>;

export type WorkspaceDailyboardMachineState = WorkspaceDailyboardMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type WorkspaceDailyboardMachineSend = WorkspaceDailyboardMachineActor["send"];