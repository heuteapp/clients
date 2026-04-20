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
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDoAzMAFwIAtyA7KM3IRKYAMQBlAPIBVAEoBhAKISA+gDElAFQUAJVXKUBFGSq0BtAAwBdRKBypY5DuVR87IAB6IAjADYAVgAOZgB2IJ8AZkiAFljIgE4AJh8fABoQakRwkMsAhISfIJiYoMTkgF8KjLQsXEISMio6BiY2Th5+QVhUAFd0IlgxCDcwIT4AN1RMMfYubmIe-sGrWyQQBycXNw9vBACkjKyECOYYgoK-c5Li8KqajGx8IlIKGnpGFjnOgWYlgbgYjA6HQGGYOEoeA4rAwAFt2vNFn0AbBVh5Ns5XO51nsfKFYswiqEAkUfHFIpYYqEjtkYpZmAF8gkAlS-JEkkkAvcQLUng1Xs0Pm10GA8BBqEIROJpPJlGpNDp9IYTGY0esMdtsaBcUl2cwkpZIj4CiSAn4igEaQhzQlmEFLCbLHkkqEfLrubz6i8mu9WiwRWKJcJRGIFABBOQAEVUCkMYa0SgMxlMEgsNnRjkxOxxiAS1MyiCShWYeb8fks9qSQVClh8HseXsabxan2YAfFzAIrYIAZcv0gmIEoYj0djSnjiYACgAZMPKJMq1Nq+yZzW7RAUyIli6FUpJPyFSL546BW2hfd+JIxAI13WRLnVHkN55NwV+tuijtdto90V9wQDv+w5RjGcYJjGYYAHLKNOy4bKuWLrggoQFMwR4BLW1aUgkQSWgWyH2mcoRlkWVaWKEMR+PWdQvgKvqtu2Erfiwv5Ql04KQgQXTAaOYFTrO86RlIkFKHBGqITmyGoehmE1ucuFWuaoRoQ6zJOgcrqctRfLes2Qr+p+THdr27EQoQ3HhiBY4TqoM5zom4bQUosHpuqCHZtqG5RISDpkTEupVsUikOvqF4+CS5wGmUVSPnwqAQHAHierRPotkwGZbBJnkIMQnJWsQATbjuxUFJEVGPsl-KpfpCI-FAGVZlqXi+KUW7hFE-lBOaHIFIpVYMky5I1mVkTaY2dFpV8HS8L8wZgA1a6SeFRphBEsRVt1RYJFaFGFWS7JlihQT2keY0pXp77fDN3TIoMC1Zc1CDGv194JHELJGihfg7f4zB5KVOFXLcQRnVVF0MYZ90eY9upWgaMREYELqye9SSg7pb4Q4GkqiFDTW4uRhUGkagShMSxoOn19IUo6zqaaNFXPmDmPCoZnafHjSGulaiRtWFLqJCkZXo6+9Gs9jzE4-NbmZdDuLslapQ+KFZa+dEB7RYzNHM2LBkS8Zf5dJzS3GlaBzK+eZZFIEVK6uVDzaxjusfvrP4mf2ECDvVMuNUh-jHog5ohD4tZKRhJRXPbT6O6Lk0u1+Btsb8ZlcQIxvZeWylHvJ5xXIy+KKXidqqRhdNug+VRAA */
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null,
        sessions: {
            card: null
        }
    },
    id: "workspace-dailyboard",
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
        },
        ready: {
            initial: "idle",
            states: {
                idle: {
                    on: {
                        SOURCES_FETCH_REQUEST: {
                            target: "#workspace-dailyboard.fetching.sources"
                        },
                        CARD_CREATE_REQUEST: {
                            target: "card.creating"
                        }
                    }
                },
                card: {
                    initial: "idle",
                    states: {
                        idle: {

                        },
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
                            }
                        }
                    }
                }
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);