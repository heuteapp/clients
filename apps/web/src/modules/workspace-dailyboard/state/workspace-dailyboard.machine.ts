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
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOygGIAxAKIAVAMIAJAPoBlAPIBVAEqjB0gNoAGALqJQOVLHKdUXXSAAeiAIwA2AJwAaENWsBWDcwDsAJhuub3q4AvkFOaFi4hCRkVHQMTMwAZmDsBAAW3FAABLCoAK7oRLC8ECZgzNwAbqiY5cmpacS5BUWaOkgg+obGph2WCDYAHB5Wg56uTi4IVgDM3iFhGNj4RKQUNPSMLPXpmTn5hXC8YOjoGMw4lHjsiRgAtkkp6U0HrdpmXUbkJmb9to7OawaGbMby+fyBBYgcLLKJrWKbBLoMB4CDUAQiCQyBTKVRtD4GL4-PqIIYgmZ2DQBCaAhCDKzMYJQrioCBwMwwyKrGIbeIQAndb69UD9Yg2SaIMVQzkraLrOJbVgcTIConCiyIAAs3gl001IKs+rBdlsNjNZrs0qWXLlCL5jwae2ah3gHU+PV+iBmNgNnlG411VkNzBmGjsgzsrkGMxjsc1VoisvhvMVyNRUz0hI9JLp4y8wKsgUDmsGzENc28JvN5stISCQA */
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