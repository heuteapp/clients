import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent, WorkspaceDailyboardMachineState } from "../types/state/workspace-dailyboard.machine.types";
import { fetchSourcesActor } from "./workspace-dailyboard.actors";
import { fetchingSourcesDoneAction } from "./workspace-dailyboard.actions";

export const workspaceDailyboardMachine = setup({
    types: {
        context: {} as WorkspaceDailyboardMachineContext,
        events: {} as WorkspaceDailyboardMachineEvent
    },
    actors: {
        fetchSources: fetchSourcesActor
    }, 
    actions: {
        fetchingSourcesDone: fetchingSourcesDoneAction,
    }
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOymYDMw7AgAtuvchEpgAxAGUA8gFUASgGEAorID6AMXUAVVQAkty9QEVFm-QG0ADAF1EoHKljlOqLs5AAPRACMAEwAnABszAAcACwAzJF2AQFxofEANCDUiGEA7EHMdtGh0WGxJbE5OQC+VRloWLiEJGRUdAxMrBxi-IIi3bCoAK7oRLDSEF5gzNwAbqiYUwJCwsQDw6P2Tkggru6e3tv+CACsQRlZCJEBzNEhd8fHJQEPkTmRNXUY2PhEpBQ09EYLDYHm6Sz6PGYaxGcGkYHQ6AwzBwlDw7D4GAAtj1lqshjDYJsfLtQV4fEcAhV8kFjnY6TljiEAjkQpFjudskFosxHqlcrEwtEcnEPiB6t8mn9WoCOugwHgINRppIZAoVBptHpDCYzJZrETtiT9uTEJFYsdmEEwscwmFIqU7LE7iEOSdHcwWcVHrEKuagqLxY1fi0Ae0WHKFUqJFJpKoAILKAAiWlUZjj+nUpgsVlktkcxLcpIOoCOIRyrtC1zLgttoUKQVidmOAa+Qea-zaQOYEcVzAIXYIEc4PFjCeTqfU6cz8YAchoADIGlyF42HRAVbl0umN6LROwJR5hV3RB7MQWhMIBfeRBLRd61MWtn7t6Vh7vy3v9jqD+XD3gowgxFHJMUzTDMtAABXnOMNC0RN5BndQlx2FdyDJNcEHiTctx3PcDxKV1aQiZJigFEIijNAIWwaZ8pVDLseyVL8WB-NFugAgggPjECJynSDoNg2cF2Qo00OLPx1xiAocMKPCmwIzJEAeCJzxCK1QmrZIagfLhUAgOAfEDWiQ07JgCz2MSTQQYggjsV1iAtZ0nOcssQmoiVgw7GVgS6HhzKLKyrxyWIojiFl7TyNlKmPGkCjiQoBQFQVoi0h8jMlEzvM6UFIXBUQ-MNVD0JLQJgmuGIKlZXIgii8tFJOYIeSKZ07FZWzQncts6NMnyct4PLumjMB-NXEqECSMIQlCyqIpq45ovqsJQmYYIloSaqQliDq0qfDKvLfEE-xxCFeGhUYRssjDnltG4ggCTakii44AiPRa6Ti0JHgeTTqh2mi9tfBiPwuZcLOKiSEBqitChuHJrSvSIavtEU-o8l96NlYHlSkC7waOXJIkta1bUvRlwnSeraW5UIvTiX1ns64z9qByM+yBXHxKOOHXQqC08kFebGViF6gn9VGusyt9GLZ78hzEDnAq5Y9SktK0UsbR48io8WmcBzHWeYvs5chDj5cKsHOcCPJCNpD11KW44toCK5m20oA */
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null,
        sessions: {
            card: null
        }
    },
    id: "workspace-dailyboard",
    initial: "waiting",
    states: {
        waiting: {
            initial: "fetching",
            states: {
                fetching: {
                    initial: "idle",
                    states: {
                        idle: {
                            on: {
                                SOURCES_FETCH_REQUEST: {
                                    target: "sources"
                                }
                            }
                        },
                        sources: {
                            invoke: {
                                src: "fetchSources",
                                id: "fetch-sources",
                                input: ({ event }) => {
                                    const fetchEvent = event as Extract<WorkspaceDailyboardMachineEvent, { type: "SOURCES_FETCH_REQUEST" }>;
                                    return {
                                        dailyboardPath: fetchEvent.dailyboardPath,
                                    };
                                },
                                onDone: {
                                    target: "#workspace-dailyboard.ready",
                                    actions: "fetchingSourcesDone"
                                },
                                onError: {
                                    target: "idle"
                                }
                            }
                        }
                    }
                }
            }
        },
        ready: {
            initial: "idle",
            states: {
                idle: {
                    on: {
                        SOURCES_FETCH_REQUEST: {
                            target: "#workspace-dailyboard.waiting.fetching.sources"
                        },
                        CARD_CREATE_REQUEST: {
                            target: "card.creating.placing"
                        }
                    }
                },
                card: {
                    initial: "creating",
                    states: {
                        creating: {
                            initial: "editing",
                            states: {
                                editing: {
                                    on: {
                                        CARD_CREATE_PLACE_REQUEST: {
                                            target: "placing"
                                        },
                                        CARD_CREATE_CANCEL: {
                                            target: "#workspace-dailyboard.ready.idle"
                                        }
                                    }
                                },
                                placing: {
                                    on: {
                                        CARD_CREATE_PLACE_DONE: {
                                            target: "#workspace-dailyboard.ready.idle"
                                        },
                                        CARD_CREATE_PLACE_CANCEL: {
                                            target: "editing"
                                        }
                                    }
                                }
                            },
                            on: {
                                CARD_CREATE_CANCEL: {
                                    target: "#workspace-dailyboard.ready.idle"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);