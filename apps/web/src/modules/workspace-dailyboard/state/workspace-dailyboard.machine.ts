import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent, WorkspaceDailyboardMachineState } from "../types/state/workspace-dailyboard.machine.types";
import { fetchSourcesActor } from "./workspace-dailyboard.actors";
import { createCardAction, resolveSourcesAction, setGhostCardAction, unsetGhostCardAction } from "./workspace-dailyboard.actions";

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
        setGhostCard: setGhostCardAction,
        unsetGhostCard: unsetGhostCardAction,
        createCard: createCardAction
    }
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOymfIkpgAxADEAogBUAwgAkA+gGUA8gFUASlLEKA2gAYAuolA5Uscp1RcjIAB6IAjLoBMAdmYBmACzuAHADZPAFZAzwBOe1DAgBoQakRA+3dmJyc-Px8nXRdEl117AF98mLQsXEISMio6BiZWDm5eADMwdgIACwaAAlhUAFd0IlghCEswPi4AN1RMMebWtuIe-sG9QyQQEzMLK3W7BECnGLiEH3tmQN1L+0z-F09dTwKikBLsfCJSChp6RhY2cwazDm7S6SwGcCEYHQ6AwzBwlDw7EaGAAtkCWu1Fn1wbBVtZNgDLNY9o5XB5vP4giFwpEjohPH5AswXKk-HkXD53M4En5CsUMG9yp8qj9augwHgINQ+AJhFI1GIAIISMRyKSKtQAETx6wJ22JiHcF3O7muKQuTk8nN00ViiCc4WYoRcjP87hSugyTj5LwFZQ+lW+NRY4sl0v4glEklkilUGi0OuMpkJO1Aez8HOYulNlvsp0STnc7jpCC8nidLr8jndvnsdc8Pte-oqX2qv2YoalzAIoc4PE6BF+QnlSpVao1msUKikmjEmrniY2yf1u3tCSdPgpl0yoU8LncfhL7lCTgraS87uC9ye-NK7xbIuDHYlXZ7Er7UAHQ5HytV6q144AHKaAAMiBC4GPiy7kESq4IE466hJuvjbrou77oedqlp4p57oyfgnvcCTOO4hTPFwqAQHA1hNvewpBr8UFbDBqa2IgxChCWxB+Fmlx8fxfHeI2fp0YGba1P8H5MSmBonAc5IoX4XL2I8LhHoESQshmhaFi4LihKawl3kKYmin89Q8DKgjSSuaaIKElwKT4uhKXkqklnuugeGhSFoSEvgZEZgoBq2Zl1AClnAh0-ZgoMNksbJZpnAkgQEWEflcphxyeI8ySshhoSRF6gRBc29HiSGL7HEmzGwXZpacVhmTlnhwQHgZBGJKRzy0SZoVPp24ayvFdVsfsThnNm1yMiyOUpFlhpBMweFVtmhb5ippWif17aDd2vZdIOTAjaxew+GpWFcl5PgpdkHKegEZH5EAA */
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null,
        ghostCard: null
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
                        CARD_CREATE_REQUESTED: {
                            target: "creating card",
                            actions: ["setGhostCard"]
                        },
                        SOURCES_FETCH_REQUESTED: {
                            target: "#workspace-dailyboard.waiting.fetching sources"
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
                    exit: ["unsetGhostCard"]
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