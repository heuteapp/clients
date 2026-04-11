import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent, WorkspaceDailyboardMachineState } from "../types/state/workspace-dailyboard.machine.types";
import { fetchSourcesActor } from "./workspace-dailyboard.actors";
import { createCardAction, moveCardAction, resolveSourcesAction, setCardCreateSessionAction, setCardEditSessionAction, unsetCardCreateSessionAction, unsetCardEditSessionAction } from "./workspace-dailyboard.actions";

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
        setCardCreateSession: setCardCreateSessionAction,
        unsetCardCreateSession: unsetCardCreateSessionAction,
        setCardEditSession: setCardEditSessionAction,
        unsetCardEditSession: unsetCardEditSessionAction,
        createCard: createCardAction,
        placeCard: moveCardAction
    }
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOymfIkpgAxAGUA8gFUASgGEAoiID6AMTkAVGQAlFUuQEUJCtXIAiAbQAMAXUSgcqWOU6outkAA9EAJgCMAdgBmZj8ANgBWEJ8AFi8Avx8wrzCAGhBqRGiosOYATjCAgoAOCz9EgOiAXwrUtCxcQhIyKjoGJlYObl4AMzB2AgALToACWFQAV3QiWCEIFzA+LgA3VEx5nr7+4lGJqcsbJBB7R2dXA88ERNT0hEKfZiicx8Kw24CokIsoqpqMbHwiUgUGj0RgsNhOTrMdYDYbbSZwIRgdDoDDMHCUPDsLoYAC2UN6Ay243hsD2biOEJcbnOXi8IRyzASkUiPkipT8VwyARyhXu+TihRCAWKOSiX2qIFqfwagOaILa6DAeAg1D4AmE4mk8iUqg02l0BiMpjJBwpJ2pGT8Xj8zC8FnKgT88UeXk5CB81ptfntUVZITpdJCfm+kt+9QBTWBrRYiuVqv4giEMgAglITIoZLpk8YdPpDCJjOZrOSHJTTqBzj4PQywgkwjlYiEHn4ohy0og-IUbc9-U2G1EuwkQ1Lw40gS1QcxYyq1YmU2nFKYAJJqXOGgvG4um0vms6IHJt65eHJ3A-hCJNkKDsLDsP-Mdy6NTpUzgixzg8IYEUFJ1PpzNyNmciKCIEgyPIpibvsdg7uQVJ7u6PjcswtZhPWjbNq2br0qe9pIRYx6FFkvi3nU96ylGk7Tqqb5Kh+UBfj+87-lmOYpgAcvIAAyXFQSWxxweWHgZNENZ1g2AR9i2h6IE2dxRPaFhhAOoTVjeEojuRkYTgqL6qpAEKft+bQJsIzGLiYK6KAACmISgGvmhYmjBAnwRWiDlAyFjed58QBBYOQhOEURuj4AXZHkBSdietZKQEpHShG47yjGenMAZ9GMSZ6q-guy6riIS4AFrAQ5RpFtBhywW5wkIJ5zA+b5+GBcFbqlEEWQBLShRvNJHoJaOFE6alcbpRAhkMcZLCmbl6b5RmYjscoS5SAAsnx26uUJ5yhBYwSBT13JKVEwo5G6XZRLa9rdXahSBWhA1aclT7UWNE1ZdNOXmfNHHcbxFX8WWFoILt+1XgUOTHadbr5Hc3r+U6ckFP4j0ytpKXPqNGXDFNzA4qgiydLNFlWbZSgyGIq3WbxTlbi5QMIV1e2lN5XgnbSoSQyF7bup82Sdf5bwNp2x6o0lj5UWl2NGZO+OEzwxPzWTGbJpxcg8Rt9O7u5dVsw17xEcKWT1jkcRuo8l2Rd1JSfB8Xhiw+lG6Vj42ZbjiqOAAXkT32WQVxXARTVM05rVVbcD9WNSUzVBcpbUEbksOJA2tYqQ7Q0Y690uTZLXs+3+JP+yVKtqxrAObQzOtdV4toHU2YQ+kKaHYYkfIIyzXiFAGVQSlwqAQHAbiaWjz2goD2u1cQHpusQIQNVHC9KcGGl3iPEttOC9Hj4JwM+E8wThB88QWJEgoBKFndzwLJQFIkTrxSvZFr07YIdDws5gNvNU0rbB8RNHJ8fBn1CgpII9ogqxweLSe2j9EqO2Gu0Ca+INiwmJFML+21vDvCCF1W4sRrQn0KKFOIQRIpxHCuUJShR07oxenpDBEcQhujtJdVs4RvSHV9GFGBPwn7ixfpjGcpkGEITCgnVCLwygKQsF3GGbxgiKW5H4E8QUHg0NHs7V874cZjwrhPSsvo54nySLWFsVZ6znx5vSS61Zj63TCgOdR68Rozmzh9EROsiIw38IncosRAreVeE4gRWdXY6OyoIDxtUkKuh5mFZRtp6zeSARAnq1DYGDVoZLF271cZy06FE84HwgjKKvJeNmSEGyhU+Lya+QtrRdxyMEhBoTcm53IN7HghTZL2jBoKd4FTuSxOuN6CK+Rur+jFF3HwPcKhAA */
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null,
        sessions: {
            cardCreate: null,
            cardEdit: null
        }
    },
    id: "workspace-dailyboard",
    initial: "waiting",
    states: {
        "waiting": {
            initial: "idle",
            states: {
                "idle": {
                    on: {
                        SOURCES_FETCH_REQUESTED: {
                            target: "fetching sources"
                        }
                    }
                },
                "fetching sources": {
                    invoke: {
                        src: "fetchSources",
                        id: "fetch-sources",
                        input: ({ event }) => {
                            const fetchEvent = event as Extract<WorkspaceDailyboardMachineEvent, { type: "SOURCES_FETCH_REQUESTED" }>;
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
                        SOURCES_FETCH_REQUESTED: {
                            target: "#workspace-dailyboard.waiting.fetching sources"
                        },
                        CARD_CREATE_REQUESTED: {
                            target: "creating card",
                            actions: ["setCardCreateSession"]
                        },
                        CARD_EDIT_REQUESTED: {
                            target: "editing card",
                            actions: ["setCardEditSession"]
                        }
                    }
                },
                "creating card": {
                    on: {
                        CARD_CREATE_SUCCEEDED: {
                            target: "idle",
                            actions: ["createCard"]
                        },
                        CARD_CREATE_CANCELLED: {
                            target: "idle"
                        }
                    },
                    exit: ["unsetCardCreateSession"]
                },
                "editing card": {
                    initial: "idle",
                    states: {
                        "idle": {
                            on: {

                                CARD_EDIT_POS_REQUESTED: {
                                    target: "moving"
                                },
                                CARD_EDIT_SIZE_REQUESTED: {
                                    target: "resizing"
                                },
                                CARD_EDIT_CONFIRMED: {
                                    target: "#workspace-dailyboard.ready.idle"
                                },
                                CARD_EDIT_CANCELLED: {
                                    target: "#workspace-dailyboard.ready.idle"
                                }
                            },
                        },
                        "moving": {
                            on: {
                                CARD_EDIT_POS_COMPLETED: {
                                    target: "idle",
                                    actions: ["placeCard"]
                                },
                                CARD_EDIT_POS_CANCELLED: {
                                    target: "idle",
                                },
                                CARD_EDIT_CANCELLED: {
                                    target: "#workspace-dailyboard.ready.idle"
                                }
                            },
                        },
                        "resizing": {
                            on: {
                                CARD_EDIT_SIZE_COMPLETED: {
                                    target: "idle",
                                },
                                CARD_EDIT_SIZE_CANCELLED: {
                                    target: "idle",
                                },
                                CARD_EDIT_CANCELLED: {
                                    target: "#workspace-dailyboard.ready.idle"
                                }
                            },
                        },
                    },
                    exit: ["unsetCardEditSession"]
                }
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);

export const isWaiting = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches("waiting");

export const isWaitingIdle = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "waiting": "idle" });

export const isFetchingSources = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "waiting": "fetching sources" });

export const isReady = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches("ready");

export const isReadyIdle = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "ready": "idle" });

export const isCreatingCard = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "ready": "creating card" });

export const isEditingCard = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "ready": "editing card" });

export const isEditingCardIdle = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "ready": { "editing card": "idle" } });

export const isEditingCardMoving = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "ready": { "editing card": "moving" } });

export const isEditingCardResizing = (state: WorkspaceDailyboardMachineState): boolean => 
    state.matches({ "ready": { "editing card": "resizing" } });