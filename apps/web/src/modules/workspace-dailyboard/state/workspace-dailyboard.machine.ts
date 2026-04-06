import { createActor, setup } from "xstate";
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
    initial: "waiting",
    states: {
        "waiting": {
            on: {
                FETCH: {
                    target: "fetching"
                }
            }
        },
        "fetching": {
            invoke: {
                src: "fetchDailyboard",
                onDone: {
                    target: "ready",
                },
                onError: {
                    target: "waiting"
                }
            }
        },
        "ready": {

        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);