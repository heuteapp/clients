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
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOymfIkpgAxAGUA8gFUASgGEAoiID6AMTkAVGQAlFUuQEUJCtQG0ADAF1EoHKljlOqLlZAAPRADZ3AVmZeA7AAcAIxeAEwhXqZeXgEANCDUiKFeAMzMAJypQabuAekALO6B+QC+JfFoWLiEJGRUdAxMrBzcvABmYOwEABatfALC4tLySqoa2roGRmaWSCA2dg5Oc24Ifsm+gSHh0VEx8Ylr+UEZWUEFpqbb6WUVGNj4RKQUNPSMLGz2fR1dvTzMsFQAFd0ERYEIII4wHwuAA3VCYaE-HrEQEgsEzZwLL6OZyrMIHRDBZj5dJksn5fx+FLpZK3ECVB41Z71N5NT6cf7Iv68NGguBCMDodAYZg4Sh4dhtDAAW2Y3NRwP5sExc2xSzxRMuGQC+RSqRS7nC1PyhIQ7gKJNSphSlNyoRSV3pjOqTzqr0aLHQYDwEGo-UEokksgUKnUWh0+kMIhMFixthxy1Aq1Ceoy5LylICKWCITNKWpzFCNuyARtRWp7lK9K4qAgcGcLsetReDXe8cW5FxK0QxHSZuIPnJw5H6SrXmd91dLdZnuaXx4HcTmoQpJ8-mC+WOfkycQSiCCnitKWyfj1FppoUnVWbLI973nnN4-EES41PYQXjTG6CW6CO-2fcEGSfJj2yXICiKXVryZN1WzZD4Wi5ToelaN8uyTVxEF2TZN23XczXcHJThPUx0n-AIAgtGDpzvNt2SQ9oUJ5AMwHQ7tk2w9IAlw398MAw4LXSZhy0NK4-HWMir3KBkp1vd16MQhcmN+Po+TBdjMNWbIomYEIjRSUIy0CPxPDNakTkuR0LVMPwrlCQIaPk+C529X1DmsBN304hAaTNIz3CLEtTACfx0htSknOZBSEOYNy-VYzSVwCPx80LOzSLLQ0JILMoyiAA */
    context: {
        dailyboardData: null,
        layoutData: null,
        layoutStyle: null,
        sessions: {
            cardCreation: null,
            cardEditing: null,
            cardPlacing: null
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
                        SOURCES_FETCH_REQUEST: {
                            target: "fetching.sources"
                        }
                    }
                },
                "fetching": {
                    initial: "idle",
                    states: {
                        "idle": {
                            on: {
                                SOURCES_FETCH_REQUEST: {
                                    target: "sources"
                                }
                            }
                        },
                        "sources": {
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
        "ready": {
            initial: "idle",
            states: {                
                "idle": {
                    on: {
                        SOURCES_FETCH_REQUEST: {
                            target: "#workspace-dailyboard.waiting.fetching.sources"
                        }
                    }
                },
                "card": {
                    initial: "idle",
                    states: {
                        "idle": {
                        },
                        "creating": {

                        }
                    }
                }
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);