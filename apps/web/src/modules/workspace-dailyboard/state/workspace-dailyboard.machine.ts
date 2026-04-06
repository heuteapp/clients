import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { fetchSourcesActor } from "./workspace-dailyboard.actors";
import { resolveSourcesAction } from "./workspace-dailyboard.actions";

export const workspaceDailyboardMachine = setup({
    types: {
        context: {} as WorkspaceDailyboardMachineContext,
        events: {} as WorkspaceDailyboardMachineEvent
    },
    actors: {
        fetchSources: fetchSourcesActor
    }, 
    actions: {
        resolveSources: resolveSourcesAction,
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
                FETCH_SOURCES: {
                    target: "fetching sources"
                }
            }
        },
        "fetching sources": {
            invoke: {
                src: "fetchSources",
                id: "fetch-sources",
                input: ({ event }) => {
                    const fetchEvent = event as Extract<WorkspaceDailyboardMachineEvent, { type: "FETCH_SOURCES" }>;

                    return {
                        dailyboardPath: fetchEvent.dailyboardPath,
                    };
                },
                onDone: {
                    target: "ready",
                    actions: ["resolveSources"]
                },
                onError: {
                    target: "waiting"
                }
            }
        },
        "ready": {
            on: {
                FETCH_SOURCES: {
                    target: "fetching sources"
                }
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);