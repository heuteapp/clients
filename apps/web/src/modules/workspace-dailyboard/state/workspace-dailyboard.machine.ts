import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { fetchDataActor } from "./workspace-dailyboard.actors";

export const workspaceDailyboardMachine = setup({
    types: {
        context: {} as WorkspaceDailyboardMachineContext,
        events: {} as WorkspaceDailyboardMachineEvent
    },
    actors: {
        fetchData: fetchDataActor
    }, 
    actions: {

    }
}).createMachine({
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null
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
                src: "fetchData",
                input: ({ event }) => {
                    return {
                        dailyboardPath: event.dailyboardPath,
                    };
                },
                onDone: {
                    target: "ready",
                    actions: []
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