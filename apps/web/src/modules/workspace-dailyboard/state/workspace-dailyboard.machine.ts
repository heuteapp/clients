import { createActor, setup } from "xstate";
import { WorkspaceDailyboardMachineContext, WorkspaceDailyboardMachineEvent, WorkspaceDailyboardMachineState } from "../types/state/workspace-dailyboard.machine.types";
import { fetchSourcesActor } from "./workspace-dailyboard.actors";
import { createCardAction, resolveSourcesAction, setCardCreateSessionAction, setCardEditSessionAction, unsetCardCreateSessionAction, unsetCardEditSessionAction } from "./workspace-dailyboard.actions";

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
        createCard: createCardAction
    }
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOymfIkpgAxAGUA8gFUASgGEAoiID6AMTkAVGQAlFUuQEUJCtXIAiAbQAMAXUSgcqWOU6outkAA9EAJgCMADgBWZgBOAGYAdgAWYIA2P2iAiz8AGhBqRB9IyKDggNCLYIsfUJiw4OCAXwrUtCxcQhIyKjoGJlYObl4AMzB2AgALToACWFQAV3QiWCEIFzA+LgA3VEx5nr7+4lGJqcsbJBB7R2dXA88EAK9U9IQ-H2ZEiyLI0J9Eu8rqkFrsfCJSCg0eiMFhsJydZjrAbDbaTOBCMDodAYZg4Sh4dhdDAAW0hvQGW3GcNgezcR3BLjc5y8XjuzFCtIscT8MQivgC1wyoWCfmY2VetJpoXybyqNQwvwaAOawLa6DAeAg1D4AmE4mk8iUqg02l0BiMplJB3JJypGXC3Pp4USAT8LKiwR8Pk5CB8XnC4WY4Qsr2KLJZsTF3wl9X+TSBrRY8sVyv4giEMgAglITIoZLpE8YdPpDCJjOZrGSHBTTqBzk7Ivc4tbiuVLhYsi7wn5PYEYl5bRYPdlAkGfqHGoCWiDmNGlSr40mU4pTABJNTZ-V5w2F43F01nRDBcIuryOkLhGIBYI0yKHu6RPshv6DmWR0cK8cEaOcHhDAgghPJ1PpuSZuSKCIEgyPIpgrvsdjruQlKbq6bxVi2AS1rkXgNpELqlPchSvPkPolF4pRXnUN7ShGI5jsqz4Kq+UDvp+U4-hmWZJgAcvIAAy7HgUWxzQaWHgZD4MQITW3IoWhGGVnyPqZHkbzHuURGSmGQ6ylGj7KpA4Jvh+bQmnxnRftOc4LgACmISh6rm+ZGpBvEwWWiDClhckMhaASRDEFgES6PgFDkeQFLkmQFA2SkDqRw5yhpzBaTRdF6VBLiGQxM4mPOgGzgAWgBVkGgWEGHEl-HnM5ISue6oQeV5PlpIg1qhHygXhGEFpeAynzisRUrhlF6kxrFEDabRuksPpyU8EZqYmWmYgscos5SAAstxa72SV9XhF4ITVna7rCW86F1bcUTMKh+Ste6fihPE4Ukb1akPgNcXDKNqLFSl35pRlrEcVxBU8SWZoIB622xC2e2Hk6HkunJXoycJASlKE0ThHdPWqfeFGDcNCUsNiqCLJ9xnpWZFmAcBoEmKtdlA7BwqNd6ryeT6fjeUUvkNkE-IVi1XmsqE6MqXe5ExS9OkjgTROTalM3mUov1yJxNNFetwPCjEZ3+M2PiOr43kpMd5SROV+QskkcSXELt5kdFz1DfFb3yo4ABexPTaTmU5RTIFyGBANrXTjkIGVuQ4ZV1XeTETbeabfoxJ53LedbkWPdj4sjaLrvu99C4iNlAGK8rAe0xuwfCibnktnEXm5JEe7R8dR7bTzeQntdrJeFUXxcKgEBwG4-b3ZjIKA2XAkIMQbousQMQpw995gjRY98cDqF+SEERIRXQk0r5tKa-yQUdzdaNfEPGMi20S8QnGYArw5E+obam+iSju9XMdIWNT6Cdnl5URsjzxHtfDoPA8QbBhESKYD8NoIC8Gebm5RgoMhKNyXyERGphwKOyW0HpgFX36kqWB6tG43FQpXQ8to-BhB9LkdsBDbZENjKqEhsE-KZGYNWAIlxIh+D3H5UIsMUbwxwrkC01p8Hn2vJfJhT0nwvleqPQO49yz115O1LI2shIekdBhYIJs3SxHKFHGhTpGF9XkZpB2SimBsODvEWGPhPRhzeO2Uox4toWLTmLGxEtErrU6PYiexRP43D8i1M6toE5JwSAg7xWNfG4zelLIJKjV6wURjtCG7otqsh3F-BsvIj7tyeGeHwCTRb22SVncgbseDBPOFk8GzZckEQiDHAKF1PI8Ofp8KoQA */
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
                    initial: "positioning",
                    states: {
                        "positioning": {
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
                                CARD_EDIT_POS_SUCCEEDED: {
                                    target: "positioning",
                                },
                                CARD_EDIT_POS_CANCELLED: {
                                    target: "positioning",
                                }
                            },
                        },
                        "resizing": {
                            on: {
                                CARD_EDIT_SIZE_SUCCEEDED: {
                                    target: "positioning",
                                },
                                CARD_EDIT_SIZE_CANCELLED: {
                                    target: "positioning",
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