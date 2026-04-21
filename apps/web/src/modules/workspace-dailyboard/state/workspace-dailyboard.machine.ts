import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent } from "../types/state/workspace-dailyboard.machine.types";
import { fetchSourcesActor } from "./workspace-dailyboard.actors";
import { cardCreatingCancelAction, cardCreatingPlaceDoneAction, cardCreatingPlacingRequestAction, fetchingSourcesDoneAction, fetchingSourcesErrorAction } from "./workspace-dailyboard.actions";

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
        fetchingSourcesError: fetchingSourcesErrorAction,
        cardCreatingCancel: cardCreatingCancelAction,
        cardCreatingPlacingRequest: cardCreatingPlacingRequestAction,
        cardCreatingPlaceDone: cardCreatingPlaceDoneAction
    }
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDoAzMAFwIAtyA7KM3IRKYAMQBlAPIBVAEoBhAKISA+gDElAFQUAJVXKUBFGSq0BtAAwBdRKBypY5DuVR87IAB6IAjADYAVgAOZgB2IJ8AJiCAFgDQvxiAZgBOABoQakRwkMsAlJTLH2Ckv0jInwBfSoy0LFxCEjIqOgYmNk4efkFYVABXdCJYMQg3MCE+ADdUTHH2Lm5iXoGhq1skEAcnFzcPbwQAyIyshAjmGIKUoMi4oNCAmL8k6tqMbHwiUgoaekYWea6AmYy0GcDEYHQ6AwzBwlDwHFYGAAth0Fkt+qDYGsPFtnK53Bt9j5QkkYswfHcYjEoklLCkAsFjtkYpZmAyrqSScTEn4XiA6u9Gl8Wr92ugwHgINQhCJxNJ5Mo1JodPpDCYzNiNridgTQETIklIsxIpYkj4fGb8pYYhEmQg-D4UswgnSXZESX4UpEvXyBQ1Ps0fm0WOLJdLhKIxAoAIJyAAiqgUhmjWiUBmMpgkFhsOMceN2hMQKVCdu9PmYxcS4WppKCKV9b39TW+rT+zFDUuYBDbBFDLiBkDxAijsYTSaUKbTAAUADLR5Tp9VZzX2PM6vaIWlJCuXFJJfePc2lO2BJ2hSKBGLRc8BJIBKo1fmNj7NkXB9sSzvd9q9iX9wSDv+I7xomyapom0YAHLKDOK6bGu+IbggoQFMwSShBcVyWIElgoUEdrhKyMQJPeVKcrSkQNvUL7CkGbYdtK34sL+8LdDCcIEN0wFjmB05zgucZSJBShwdqiGFshqHoZhLo4XhJ7EmhdIYQa1rREEvKPn6NGBq2YqfoxPZ9mxsKEFxMYgeOk6qLO85pjG0FKLBOZaghBZ6puFrknStIkikjyPOkmSIH4dLGhexFBFF0SJJRfJ8KgEBwB42lCrpooQLm2ziR5CDEJEAR2sQfjMJYZXlRV5XJFRgoBi2GWooCUBZfmupeL4NrbuEUQOpYBUBLhhXBfa0RsvkQR3hNDqpHFrzUWl9XvgCvBAhGYAteuEnFGaYQRBePh9Qyg0EXE5LJOU1oXAETwxDVTa0Xp-ydCtPQYkMG05e1CCOqNd7+YaVLRFcMQEf4pXjRS3o2nuQR3Tpi30QZH3uV9Bqlta5wJFd9LEaS+5wwtb6I2GMqiMjbVEoNxqmpYdahRE-glsNZSsrSVxPP49KeqEBN1UT+kk0x5NIaEPh2qkXURZh9x+LEvOvnRAtfm2a3C1thp2ja5blIkAOkskGmaXNtUK49H6C0Zf7dGruXmkFJyHOW56JCksXUnSt1ac+hOKyGBldpbrEDhAQ7Na52Uo0SfhMycDohAdxQFXSfihRU8sPQ1DEBz+xlAqZnECDbX2haEaEYcWcQ+NSWsKaXLrs2anrXcW1TVEAA */
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null,
        draftCard: null
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
                            target: "idle",
                            actions: "fetchingSourcesError"
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
                                            target: "placing",
                                            actions: "cardCreatingPlacingRequest"
                                        },
                                        CARD_CREATE_CANCEL: {
                                            target: "#workspace-dailyboard.ready.idle",
                                            actions: "cardCreatingCancel"
                                        }
                                    }
                                },
                                placing: {
                                    on: {
                                        CARD_CREATE_PLACE_DONE: {
                                            target: "#workspace-dailyboard.ready.idle",
                                            actions: "cardCreatingPlaceDone"
                                        },
                                        CARD_CREATE_PLACE_CANCEL: {
                                            target: "editing"
                                        },
                                        CARD_CREATE_CANCEL: {
                                            target: "#workspace-dailyboard.ready.idle",
                                            actions: "cardCreatingCancel"
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