import { ActorRefFrom } from "xstate";
import { FETCH_EVENT } from "./workspace-dailyboard.events.types";
import { workspaceDailyboardMachine } from "../../state/workspace-dailyboard.machine";
import { WorkspaceDailyboardMetadata } from "../workspace-dailyboard.types";

export type WorkspaceDailyboardMachineContext = {
  
}

export type WorkspaceDailyboardMachineEvent = 
  | FETCH_EVENT;

//

export type WorkspaceDailyboardMachineActor = ActorRefFrom<typeof workspaceDailyboardMachine>;

export type WorkspaceDailyboardMachineState = WorkspaceDailyboardMachineActor["getSnapshot"] extends () => infer R ? R : never;
    
export type WorkspaceDailyboardMachineSend = WorkspaceDailyboardMachineActor["send"];