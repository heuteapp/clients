import { createActor, setup } from "xstate";
import { AuthMachineContext, AuthMachineEvent, AuthMachineState } from "@/src/modules/auth/types/auth.machine.types";
import { hydrateSessionActor, refreshSessionActor, signInActor } from "./auth.actors";
import { hasRegistrationGuard } from "./auth.guards";
import { sessionHydrateFailureAction, sessionHydrateSuccessAction, sessionRefreshFailureAction, sessionRefreshRequestAction, sessionRefreshSuccessAction, signInFailureAction, signInSuccessAction } from "./auth.actions";

export const authMachine = setup({
  types: {
    context: {} as AuthMachineContext,
    events: {} as AuthMachineEvent,

  },
  actors: {
    hydrateSession: hydrateSessionActor,
    refreshSession: refreshSessionActor,
    signIn: signInActor
  },
  actions: {
    sessionHydrateSuccess: sessionHydrateSuccessAction,
    sessionHydrateFailure: sessionHydrateFailureAction,
    sessionRefreshRequest: sessionRefreshRequestAction,
    sessionRefreshSuccess: sessionRefreshSuccessAction,
    sessionRefreshFailure: sessionRefreshFailureAction,
    signInSuccess: signInSuccessAction,
    signInFailure: signInFailureAction
  },
  guards: {
    hasRegistration: hasRegistrationGuard
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgE6QEt8BjdAgOygGIBtABgF1FQAHAe1gLLfOZAA9EARgDsAVmyihADnHSxANgUBmACyqRAGhABPYWIBM2EaoCcpw8rqqDquspEBfR9rRY8hEmUq0hTJCDsnNy8AYIIohJSsmLySmoa2noRptLGZqYK8g6mdAYGYs6uGDjIAO7IXBRQ2LBwnDzYmDoQuMje1ADKAKKdnQCSAPIAcgD6ABIAmgAiAEoAggAq3aOdAKoAwhu9nfT+rBxVPHzhQkJ2xgl0dCJ0KiJKSYgFpsZi1wZCYmbndPJFIDcpQqVUotXqBEazVa7WqVB6fSGYymcyWKwAYvN+gAZNazbp7PhBI6hUCnX6XdTXW73R66RDvITYArXZRfUyqISmZSZAFA7DlSodcGwBrkJotNodeE7JGjfHo-Gdcby7oARTWvUWhICxJCJ0QSiZBgUihsdFS0m5BieCGU0jo2HeH1NIiEShMzhcIHIbAgcD4QKJh31YUQAFoFLbw7ZsNd4wmE+c+SUPBAiGBSNVg8FIaSBIgbLaviJsJyjcpbDchA5lCn3ILQVAcySDXb7dhpKoHFkMrlTVH6QgVGXzJlUgUTSZFPXgULqiKxS3Q2TEPaFJ3uw8u2O7opbSbXmPzCIHjJpNIvrOBSDhXVRXmJTCOsu823u6pNz2d+Y94PksoYils61hspyHIiNICjXo2d4Qo0+AAGb4LAmDZrqIZvmGCAckYBj2Oc0j2lapi2La9pMgmJpAe6Ciet6-KwQu+BQAQsDoFKWEHLmxzYXYn5dt+fZ-sW7zYMePKmnQYhqByMElGA5BkMQ7SQK+vGrsOWhDpen4JsoRp0fhhQMamqDkECinKapEDqfm4RAbashGCBkEliI3J1l6QA */
  context: {
    session: null,    
    registration: null,
    error: null,
    temp: {
      accessToken: null
    }
  },
  id: "auth",
  initial: "redirecting",
  states: {
    "redirecting": {
      always: [
        {
          guard: "hasRegistration",
          target: "awaiting.registration"
        },
        {
          target: "awaiting.session"
        }
      ]
    },
    "awaiting": {
      initial: "session",
      states: {
        "session": {
          initial: "hydrating",
          states: {
            "hydrating": {
              invoke: {
                src: "hydrateSession",
              },
              on: {
                SESSION_HYDRATE_SUCCESS: {
                  target: "#auth.authenticated",
                  actions: "sessionHydrateSuccess"
                },
                SESSION_HYDRATE_FAILURE: {
                  target: "#auth.unauthenticated",
                  actions: "sessionHydrateFailure"
                },
                SESSION_REFRESH_REQUEST: {
                  target: "refreshing",
                  actions: "sessionRefreshRequest"
                }
              }
            },
            "refreshing": {
              invoke: {
                src: "refreshSession",
                input: ({ event })  => {
                  if (event.type !== "SESSION_REFRESH_REQUEST") {
                    throw new Error("Invalid event");
                  }

                  return event.input;
                },
                on: {
                  SESSION_REFRESH_SUCCESS: {
                    target: "#auth.authenticated",
                    actions: "sessionRefreshSuccess"
                  },
                  SESSION_REFRESH_FAILURE: {
                    target: "#auth.unauthenticated",
                    actions: "sessionRefreshFailure"
                  }
                }
              }
            }
          }
        },
        "registration": {
        }
      }
    },
    "authenticated": {
      on: {
        SIGN_OUT_REQUEST: {
          target: "unauthenticated",
        }
      }
    },
    "unauthenticated": {
      on: {
        SIGN_IN_REQUEST: {

        },
        SIGN_UP_REQUEST: {

        }
      }
    },
    "signing": {
      initial: "idle",
      states: {
        "idle": {
          on: {
            SIGN_IN_REQUEST: {
              target: "in",
            },
            SIGN_UP_REQUEST: {
              target: "in",
            }
          }
        },
        "in": {
          invoke: {        
            src: "signIn",
            input: ({ event }) => {
              if (event.type == "SIGN_IN_REQUEST") {
                return event.input;
              }                
              
              throw new Error("Invalid event");
            }
          },
          on: {
            SIGN_IN_SUCCESS: {
              target: "#auth.authenticated",
              actions: "signInSuccess"
            },
            SIGN_IN_FAILURE: {
              target: "#auth.unauthenticated",
              actions: "signInFailure"
            }
          }
        }
      }
    }
  },
});

export const authService = createActor(authMachine);

//

export const isRedirecting = (state: AuthMachineState): boolean => state.matches("redirecting");

export const isAwaiting = (state: AuthMachineState): boolean => state.matches("awaiting");

export const isAwaitingSession = (state: AuthMachineState): boolean => state.matches({ awaiting: "session" });

export const isAwaitingSessionHydrating = (state: AuthMachineState): boolean => state.matches({ awaiting: { session: "hydrating" } });

export const isAwaitingSessionRefreshing = (state: AuthMachineState): boolean => state.matches({ awaiting: { session: "refreshing" } });

export const isAwaitingRegistration = (state: AuthMachineState): boolean => state.matches({ awaiting: "registration" });

export const isAuthenticated = (state: AuthMachineState): boolean => state.matches("authenticated");

export const isUnauthenticated = (state: AuthMachineState): boolean => state.matches("unauthenticated");

export const isSigningIn = (state: AuthMachineState): boolean => state.matches({ signing: "in" });

//

export const isSignLocked = (state: AuthMachineState): boolean => isRedirecting(state) || isAwaiting(state);