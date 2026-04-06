import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent, WorkspaceDailyboardMachineState } from "../types/state/workspace-dailyboard.machine.types";
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
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOygGIAxAKIAVAMIAJAPoBlAPIBVAEqjB0gNoAGALqJQOVLHKdUXXSAAeiAIwA2ABzMAnM5cAWGwGYrrq3YBMADQg1IgeAKwezADsfjY2GmFWjjauMR4AvulBaFi4hCRkVHQMTMwAZmDsBAAW3FAABLCoAK7oRLC8ECZgzNwAbqiYPRVV1cRNre2aOkgg+obGprOWCFEaGsy+UWF+fh6OGt47QSEIfnaRYesafgc2UVZ+D5nZGNj4RKQUNPSMLCM1OqNFptOC8MDodAYZg4Sh4dhlDAAW3KlRq4xBU20ZnmRnIJjMK1sDhcbk83l8gWCoQ0NmYuxsYQO-jCUTsSReIBy73yXyKv1K6DAeAg1AEIgkMgUylU0xxBjxBOWiCiUTpjj8SXWtz8GlcuxOoTVzFcEVsNkcYUST053Lyn0KPxKLCFIrFokUggAgsJBJJRF7FAAROWzXGLQkqxwOKIeVweeKxM2OQ0IdnMK7aw4xRl7Oy2t72grfYp-ZgEV2cHj1Ah-Xge72+-2BoMyeSiFSCINd0N6BUR5WrdabOzbXb7Q6mqmnKwePzMa4aDy001hfX3Au5D7F-nO8uVoG1pj1z0+v0B4OSfhegCSABke9iw-38UtQCs1hstjs9gcjtPrH8DNF3ZTU40ZfMsi5Qttz5J0ywrYUqwaI8IBPRtzxbZsADkVDvB8QyfPsFlfSMhy-Ucfwnf9Uz2SJF18Jl9QTOwwkyKCuFQCA4DMO1YMdUsmHlEilXfRBiBsVMJM3HkHRLAUWDYPEeGExU3wsRB9VTLwNjsDRnCeVi42SZIZKLODBP+NFamrCZQXgZ8RPUlYE0iKwHjsUctSsdYwkk6kzkcKJmBSOdPE1G5HFcMz+PkvdXVFVSBzEhBo0cek4x8Ud1lsdzU18Ol-G8DwolcVwNAuUdoqgvjeQEhT9yQw8-iS0jBx2MJ6SXWcouXbYwjsVMNQXTME0SDxwnKjJ2KAA */
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
                },
                CREATE_CARD: {
                    target: "creating card"
                }
            }
        },
        "creating card": {
            on: {
                CREATE_CARD_SUCCEEDED: {
                    target: "ready"
                },
                CREATE_CARD_FAILED: {
                    target: "ready"
                },
                CREATE_CARD_CANCELLED: {
                    target: "ready"
                }
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);

export const isWaiting = (state: WorkspaceDailyboardMachineState): boolean => state.matches("waiting");

export const isFetchingSources = (state: WorkspaceDailyboardMachineState): boolean => state.matches("fetching sources");

export const isReady = (state: WorkspaceDailyboardMachineState): boolean => state.matches("ready");

export const isCreatingCard = (state: WorkspaceDailyboardMachineState): boolean => state.matches("creating card");