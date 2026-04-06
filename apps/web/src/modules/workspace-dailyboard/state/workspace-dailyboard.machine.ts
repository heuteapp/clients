import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { fetchDataActor } from "./workspace-dailyboard.actors";
import { saveSourcesAction, setSourcesAction } from "./workspace-dailyboard.actions";

export const workspaceDailyboardMachine = setup({
    types: {
        context: {} as WorkspaceDailyboardMachineContext,
        events: {} as WorkspaceDailyboardMachineEvent
    },
    actors: {
        fetchData: fetchDataActor
    }, 
    actions: {
        saveSources: saveSourcesAction,
        setSources: setSourcesAction
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
                src: "fetchData",
                id: "fetch-sources",
                input: ({ event }) => {
                    const fetchEvent = event as Extract<WorkspaceDailyboardMachineEvent, { type: "FETCH_SOURCES" }>;

                    return {
                        dailyboardPath: fetchEvent.dailyboardPath,
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