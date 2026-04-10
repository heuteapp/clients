import { ActorRefFrom } from "xstate";
import { FetchSourcesEvent, CreateCardEvent } from "./workspace-dailyboard.events.types";
import { workspaceDailyboardMachine } from "../../state/workspace-dailyboard.machine";
import { StoredDailyboardData } from "@/src/heute-store/types/dailyboard.types";
import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { GridSize } from "@/src/modules/shared/types/common";

export type WorkspaceDailyboardMachineContext = {
  dailyboardData: StoredDailyboardData | null;
  layoutData: StoredLayoutData | null;
  layoutStyle: StoredLayoutStyle | null;
  create: {
    size: GridSize;
  } | null;
  edit: {
    cardKey: string;
  } | null;
}

export type WorkspaceDailyboardMachineEvent = 
  | FetchSourcesEvent
  | CreateCardEvent

//

export type WorkspaceDailyboardMachineActor = ActorRefFrom<typeof workspaceDailyboardMachine>;

export type WorkspaceDailyboardMachineState = WorkspaceDailyboardMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type WorkspaceDailyboardMachineSend = WorkspaceDailyboardMachineActor["send"];