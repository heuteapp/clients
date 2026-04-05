import { createActor, createMachine, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";

export const workspaceDailyboardMachine = setup({
    types: {
        context: {} as WorkspaceDailyboardMachineContext,
        events: {} as WorkspaceDailyboardMachineEvent
    }
}).createMachine({
    context: {
        metadata: null
    },
    id: "workspace-dailyboard",
    initial: "fetching",
    states: {
        "fetching": {
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);