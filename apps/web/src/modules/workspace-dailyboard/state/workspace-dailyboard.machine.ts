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
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOygGIAxAKIAVAMIAJAPoBlAPIBVAEqjB0gNoAGALqJQOVLHKdUXXSAAeiAGwBOABzMNAZgCMAJjdW3AFisuArHZuADQg1IjuDjbR0RpWGjb+GslWAL6poWhYuIQkZFR0DEzMAGZg7AQAFtxQAASwqACu6ESwvBAmYMzcAG6omF1lFZXEDc2tmjpIIPqGxqbTlgj+IWGI-jZWzPFWAOxObk7e0S776ZkY2PhEpBQ09IwsQ1U19U0tcLxg6OgYzDiUPDsEoYAC2pXKVVG7wm2jMsyM5BMZiWtgczncnh8fkCq3CCDsLmYxxidg0gQ0QQ0LnOICyV1ytwKD2K6DAeAg1G6EEoYF4okUggAgsJBJJRELFAARSbwgyI5GLRBOeLMfyuTzedUrFw2byhfGufxquxOA6BXbHLUuNIZOmXHI3fL3IosNkcrnkHl8oRiKRyJQqdRw6YI+Yo6z2RwarG+AJBA3KqwOQJmpw2JwWmynWn0x15O6FR7Md2c5gEd2cHi1AiPfmCkViiXSmTyUQqQRSzuy0Py8NKhCeIn2bxOS1a7O63yJhAqraUtMZrM2-y5h3XAvM10l9llivsqt1WtMevC0XiyVSyT8IUASQAMt2Q3o+0iFqAlkPmCOx94Jy4pysGdvBtE0zRWOxvE8JxCScNdsg3JkXWLUsuX3IFXmPCBT0bC8WwlAA5FR70fGVnxmV9FQ-RAvx-ccNgAvUgLWBBfF2RxTXAhddn8Fw7HSO0uFQCA4DMPNEOdIsmDlOY3wjBBiBsGdiFtC4EMZSSWRYNhER4GSFXfCxECgmc7HnTi3FNXZNlcZx4IZJ1Cy0iFhleMYPngXtZKooyEBsZJmCOX8-C1DZXBnAD5ySZIfACcl-BWez8yQqS3V3fEX28wylnTGcPHRCyvCggCXA0XYkokpzt1Q7leX0-tqOWEDo3cKxR1sPiNDxJMbA4xdMzsaycztcSNKqlD0vLStMMeeq5IHQaZwOLYXDTNxojcZITgE1IgA */
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
            initial: "idle",
            states: {
                "idle": {
                    on: {
                        CREATE_CARD: {
                            target: "creating card"
                        },
                        FETCH_SOURCES: {
                            target: "#workspace-dailyboard.fetching sources"
                        }
                    }
                },
                "creating card": {
                    on: {
                        CREATE_CARD_SUCCEEDED: {
                            target: "idle"
                        },
                        CREATE_CARD_FAILED: {
                            target: "idle"
                        },
                        CREATE_CARD_CANCELLED: {
                            target: "idle"
                        }
                    }
                }
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);

export const isWaiting = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches("waiting");

export const isFetchingSources = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches("fetching sources");

export const isReady = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches("ready");

export const isReadyIdle = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ ready: "idle" });

export const isReadyCreatingCard = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ ready: "creating card" });