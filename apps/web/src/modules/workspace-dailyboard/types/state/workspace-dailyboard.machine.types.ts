import { ActorRefFrom } from "xstate";
import { DONE_FETCH_SOURCES_EVENT, FETCH_SOURCES_EVENT } from "./workspace-dailyboard.events.types";
import { workspaceDailyboardMachine } from "../../state/workspace-dailyboard.machine";
import { StoredDailyboard } from "@/src/heute-store/types/dailyboard.types";
import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";

export type WorkspaceDailyboardMachineContext = {
  dailyboardData: StoredDailyboard | null;
  layoutData: StoredLayoutData | null;
  layoutStyle: StoredLayoutStyle | null;
}

export type WorkspaceDailyboardMachineEvent = 
  | FETCH_SOURCES_EVENT
  | DONE_FETCH_SOURCES_EVENT

//

export type WorkspaceDailyboardMachineActor = ActorRefFrom<typeof workspaceDailyboardMachine>;

export type WorkspaceDailyboardMachineState = WorkspaceDailyboardMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type WorkspaceDailyboardMachineSend = WorkspaceDailyboardMachineActor["send"];