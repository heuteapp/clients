import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent, WorkspaceDailyboardMachineState } from "../types/state/workspace-dailyboard.machine.types";
import { fetchSourcesActor } from "./workspace-dailyboard.actors";
import { cardCreatingCancelAction, cardCreatingPlaceCancelAction, cardCreatingPlaceDoneAction, cardCreatingPlacingRequestAction, fetchingSourcesDoneAction, fetchingSourcesErrorAction } from "./workspace-dailyboard.actions";

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
        cardCreatingPlaceDone: cardCreatingPlaceDoneAction,
        cardCreatingPlaceCancel: cardCreatingPlaceCancelAction
    }
}).createMachine({
    /** @xstate-canvas N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDoAzMAFwIAtyA7KM3IRKYAMQBlAPIBVAEoBhAKISA+gDElAFQUAJVXKUBFGSq0BtAAwBdRKBypY5DuVR87IAB6IAjADYAdgAOZmCffwAmAFYfIL8AFgBOHwAaEGpERPio5j8AZkS-IKCAnwCIpIBfSrS0LFxCEjIqOgYmNk4efkFYVABXdCJYMQg3MCE+ADdUTHH2Lm5iXoGhq1skEAcnFzcPbwQIy0TLZjyfCqKAwKCIvIC0jIQgn2YkxMTnxNK4gODq2ow2HwRFIFBo9EYLHmXQEzGWgzgYjA6HQGGYOEoeA4rAwAFsOgslv0EbA1h4ts5XO4NvsytlTvE8n5jgEYiVzg9EEEohFcnEolEApYEuFLPF-iA6kDGqCWhD2ugwHgINQhCJxNJ5Mo1JodPpDCYzGSNhSdtTQLTorzDnlLBEgkyookYvd0ogAmdmIlHcdEhEfFlbhKpQ0Qc1wW0WIrlarhKIxAoAIJyAAiqgUhkTWiUBmMpgkFhs5MclN2NK5eRClh8Ar9Hp+qTdB2SXquUT8lk7XyCduDgNDTTBrUhzGjKuYBBHBGjLlhkEpAgTybTGaUWZzAAUADKJ5S5w0F432EtmvaIM7xZidzuxHx5KLc6LxTlPYW5AJfb3PeJlb19+rAoOcqRqOSrjpO7TTkqs6CPOMFLqm6aZtm6aJgAcsoW5HpsJ5Umer6JKcrJ2oUHzxPEEQRC+7YBMw0Rds6TIJAU-7SmGQ7ylGYGqhBLBQVi3TopiBDdAhK7IZuO57imUhoUo2Gmnh5YEURUQkcyQTkZRL6lC8tbvFcETJAKfisQOsoRiOY48VOM6CRihCiUmiGruuqjbruOZJhhShYUWJq4WWFrnrczA+EclYfnefgCs+TalCc5R+MlFHOjcFRmYBFnDgq3ETrZ0H2cJTnLkha4od5mEKYF5peFyRyqepZEUVRTY9rRMRnBEpTxKy5wBNUNQgHwqAQHAHghll4Y5RAxbbEpwUIMQNYvsQplDZNMrTZxBIwlAc2lrVtJqXkoTPOEP6Mnk-qtY8VynT+to9n4-p2nk4obf2U0cSB0K8LCcZgAdp7KTWMRneEPiXXk10cm1H5eoUjKaVcHbCplW0-SOf2CfCQzAwtdUIAG8QhPe3rMtEBS3VyaleneRz2tdTEfQCAGY8BVncQTQVEzDL6HJevUxb1H6aXcPgY+xnO5TGaqiDzR2+EcOQ2uFRykzyPI6ddryOraWnvGUUtAZZsvgZCiv4c8L4FKdSUPslT0fNyJvZTt1n5e0gNW8pBS0bExGCs8Rmky+pMvJRMUuy1P6JG720gZ7vETnZAi+4t5yJC+L2nVHMWHJpvV-p97PS2bXFyyn-EwcwcHdBnRNlK6jyfFeZxnHEP5FAnWPmzZkFp4IDkienAXzbz+x+GUjU-j2hwxS+NyXtdRlBF82QBl8g2VEAA */
    context: {
        dailyboardData: null,
        canvasData: null,
        canvasStyle: null,
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
                                            target: "editing",
                                            actions: "cardCreatingPlaceCancel"
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

export const isFetching = (state: WorkspaceDailyboardMachineState): boolean => state.matches("fetching");

export const isFetchingIdle = (state: WorkspaceDailyboardMachineState): boolean => state.matches({ fetching: "idle" });

export const isFetchingSources = (state: WorkspaceDailyboardMachineState): boolean => state.matches({ fetching: "sources" });

export const isReady = (state: WorkspaceDailyboardMachineState): boolean => state.matches("ready");

export const isReadyIdle = (state: WorkspaceDailyboardMachineState): boolean => state.matches({ ready: "idle" });

export const isReadyCard = (state: WorkspaceDailyboardMachineState): boolean => state.matches({ ready: "card" });

export const isCreatingCard = (state: WorkspaceDailyboardMachineState): boolean => state.matches({ ready: { card: "creating" } });

export const isCreatingEditingCard = (state: WorkspaceDailyboardMachineState): boolean => state.matches({ ready: { card: { creating: "editing" } } });

export const isCreatingPlacingCard = (state: WorkspaceDailyboardMachineState): boolean => state.matches({ ready: { card: { creating: "placing" } } });