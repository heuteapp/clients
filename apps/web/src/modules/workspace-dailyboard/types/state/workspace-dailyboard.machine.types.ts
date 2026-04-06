import { ActorRefFrom } from "xstate";
import { FetchSourcesEvents, CreateCardEvents } from "./workspace-dailyboard.events.types";
import { workspaceDailyboardMachine } from "../../state/workspace-dailyboard.machine";
import { StoredDailyboardRoot } from "@/src/heute-store/types/dailyboard.types";
import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";

export type WorkspaceDailyboardMachineContext = {
  dailyboardData: StoredDailyboardRoot | null;
  layoutData: StoredLayoutData | null;
  layoutStyle: StoredLayoutStyle | null;
}

export type WorkspaceDailyboardMachineEvent = 
  | FetchSourcesEvents
  | CreateCardEvents

//

export type WorkspaceDailyboardMachineActor = ActorRefFrom<typeof workspaceDailyboardMachine>;

export type WorkspaceDailyboardMachineState = WorkspaceDailyboardMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type WorkspaceDailyboardMachineSend = WorkspaceDailyboardMachineActor["send"];