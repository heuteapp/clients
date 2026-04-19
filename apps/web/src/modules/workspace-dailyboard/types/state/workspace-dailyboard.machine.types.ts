import { ActorRefFrom } from "xstate";
import { WorkspaceDailyboardEvent } from "./workspace-dailyboard.events.types";
import { workspaceDailyboardMachine } from "../../state/workspace-dailyboard.machine";
import { StoredDailyboardData } from "@/src/heute-store/types/dailyboard.types";
import { StoredLayoutData, StoredLayoutStyle } from "@/src/heute-store/types/layout.types";
import { GridSize } from "@/src/modules/shared/types/common";
import { YYMMDDDate } from "@/src/modules/shared/types/date.types";

export type WorkspaceDailyboardMachineContext = {
  dailyboardData: StoredDailyboardData | null;
  layoutData: StoredLayoutData | null;
  layoutStyle: StoredLayoutStyle | null;
  sessions: {
    cardCreation: {
      size: GridSize;
    } | null;
    cardEditing: {      
      categoryPath: string;
      date: YYMMDDDate;
      cardKey: string;
    } | null;
    cardPlacing: {
      categoryPath: string;
      date: YYMMDDDate;
      cardKey: string;
    } | null;
  }
}

export type WorkspaceDailyboardMachineEvent = WorkspaceDailyboardEvent;

//

export type WorkspaceDailyboardMachineActor = ActorRefFrom<typeof workspaceDailyboardMachine>;

export type WorkspaceDailyboardMachineState = WorkspaceDailyboardMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type WorkspaceDailyboardMachineSend = WorkspaceDailyboardMachineActor["send"];