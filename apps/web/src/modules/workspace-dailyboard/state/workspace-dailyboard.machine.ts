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
    /** @xstate-layout N4IgpgJg5mDOIC5QHcD2AnA1rADgQwGMwBaCPASwBsBPAI1T3QgDpkKAXcgOymfIkpgAxAGUA8gFUASgGEAoiID6AMTkAVGQAlFUuQEUJCtQG0ADAF1EoHKljlOqLlZAAPRADZ3AVmZeA7AAcAExepgCMAJxhpgAspl4ANCDUiCEAzMwRXmlhYTERBfGmQREAvqVJaFi4hCRkVHQMTKwc3LwAZmDsBAAWbXwCwuLS8kqqGtq6BkZmlkggNnYOTvNuCH4hvoHRETHuuQVpSSnrob5p7jF+afFekV4B5ZUY2PhEpBQ09IwsbPb9nW6fR4zFgqAArugiLAhBBHGA+FwAG6oTAIwG9YhgyHQ2bORb-RzONZeILHRABMLMfIFSlpAIxIJpNJ+J4gKqvWofBrfZp-TggjHA3jYqFwIRgdDoDDMHCUPDsdoYAC2zCFWIhYtgePmBOWxIpplMmQZaSCeyupnp5PWVuYVu8QXcNxiZpiYTZHJq73qXyaLHQYDwEGoA0EokksgUKnUWh0+kMIhMFnxtkJK1Aa3NMXtRqNaQeESCQQCAT8NpZGSCVrCQT8fhipcZHrZXFQEDgzi9bzqn0aP1TS3IRNWiGIERtxHcubzs9n-k9L29vZ5-pa-x4g-TBoQ+R8-kp8TLkT8pgCNrCnmp2TCzP2jcvpMX1R73L9P3XAt4-EEW-1o4QLxXS2Q8Hj8E8zxtEIcxiG88gKCIiiZZ9OR9PteV+VpBS6Xo2j-YcM1cRAvDOA9ojAiDz2SDxTGnLIcjifIAmdGIUOXN9+z5LCOhw4UwzAfCR0zYiIgCEDyOPCJTyok5Tz8Zh9lE807jNM0W2eF8uV9TjMI3HigX6UVoUEwi1gKHwwi8dwglyBs0l2W8bXcXZrxyGzSxLdx6zY19tIw5hA2DE5rDTf9hIQeyoOY5hqzUrySlJUsfK09C10CkN+JMncywra5mFPNz60bBlq3ccpyiAA */
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
                            target: "fetching"
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
                                    actions: ["resolveSources"]
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
                            target: "#workspace-dailyboard.waiting.fetching"
                        }
                    }
                },
            }
        }
    }
});

export const workspaceDailyboardService = createActor(workspaceDailyboardMachine);