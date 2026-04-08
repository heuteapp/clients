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
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOymfIkpgAxADEAogBUAwgAkA+gGUA8gFUASlLEKA2gAYAuolA5Uscp1RcjIAB6IAjLoAsAdmYBmJ+5eeXT+wBM9vYANCDUiACs9gAczLouAGzRiZ4xAU4ZAL5ZYWhYuIQkZFR0DEysHNy8AGZg7AQAFtUABLCoAK7oRLBCEJZgfFwAbqiYg3UNjcTtXT16hkggJmYWVkt2CJEBYREIMfbMkbon9i4AnO7Rkck5eRjY+ESkFDT0jCxs5tXMk02ts26cCEYHQ6AwzBwlDw7BqGAAtr96k0Zp0gbAFtYVt9LNZNo5XB4vD5XP4gqFwohXLojklIk5EjFkuldJFIncQPlHkUXqV3hV0GA8BBqHwBMIpGoxABBCRiORSaVqAAimKW2LWeMQ7kSNMi7kCvjJjnOTl2iAC50O5zpyTOqUSficHK5hWeJTe5RYguFov4glEklkilUGi0auMphx61Am0S5ziugNASNgRN5oQnnOzHSyUSQQyuvOiRdDzdxVeZQ+zB9IuYBB9nB4LQIHyEkplcoVSuVihUUk0YmVQ4jyyjmo2FsS1pixMiGc8AWYrjz0SSOqdpYKTwrfK9NaFdYbQqbUBbbY7svlipVchE0oAkgAZEcGLHj8i4ycIALT5gJucF3OJcbWSTxmRcGJLi3bl3UrflvUPUVjxhVpWyYdspSvbtb0VAA5TQnxfVU33VD8v1jKcZ0AykECcLxlzpcDIhiSDoI5LhUAgOBrFdHdeU9D531WT8Y1sRBiHODNiBLXJOTLfiPSrCovlPYToy1fYXCXTxvFTIJdCk2irjiSIkmnM53ELexUhg8sBOUz4qh4MVBHUidKIQYCaV0kk-DTQyM1cSJmHsSIE0SJxTSTSKmTsxT4P3VSfj+Zpm0BHp3NEzTAn8I4wqLfzySChl4jpBkmRYgJWXZOS+J5JSEIPX0soo8TMyMvZqqcRjV3tDd6PihrEurWs-XFVqxM2elDiTQ1SQCzrtWODxfxuAsGUM2T7m3Ya91GpD60bNChLIkS2s2ViF10Jdtj69dHQZHIciAA */
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null
    },
    id: "workspace-dailyboard",
    initial: "waiting",
    states: {
        "waiting": {
            initial: "idle",
            states: {
                "idle": {
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
                            target: "#workspace-dailyboard.ready",
                            actions: ["resolveSources"]
                        },
                        onError: {
                            target: "idle"
                        }
                    }
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
                            target: "#workspace-dailyboard.waiting.fetching sources"
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

export const isWaitingIdle = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ waiting: "idle" });

export const isWaitingFetchingSources = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ waiting: "fetching sources" });

export const isReady = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches("ready");

export const isReadyIdle = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ ready: "idle" });

export const isReadyCreatingCard = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ ready: "creating card" });