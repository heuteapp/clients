import { createActor, setup } from "xstate";
import { AuthMachineContext, AuthMachineEvent, AuthMachineState } from "@/src/modules/auth/types/auth.machine.types";
import { hydrateSessionActor, refreshSessionActor, signInActor, signUpActor, verifyEmailActor } from "./auth.actors";
import { hasRegistrationGuard } from "./auth.guards";
import { unauthenticatedEntryAction, sessionHydrateFailureAction, sessionHydrateSuccessAction, sessionRefreshFailureAction, sessionRefreshRequestAction, sessionRefreshSuccessAction, signInFailureAction, signInSuccessAction, signUpFailureAction, signUpSuccessAction, verifyEmailRequestAction, verifyEmailConfirmAction, verifyEmailAssumeAction, verifyEmailSuccessAction, verifyEmailFailureAction, verifyEmailTimeoutAction } from "./auth.actions";

export const authMachine = setup({
  types: {
    context: {} as AuthMachineContext,
    events: {} as AuthMachineEvent,

  },
  actors: {
    hydrateSession: hydrateSessionActor,
    refreshSession: refreshSessionActor,
    signIn: signInActor,
    signUp: signUpActor,
    verifyEmail: verifyEmailActor
  },
  actions: {
    sessionHydrateSuccess: sessionHydrateSuccessAction,
    sessionHydrateFailure: sessionHydrateFailureAction,
    sessionRefreshRequest: sessionRefreshRequestAction,
    sessionRefreshSuccess: sessionRefreshSuccessAction,
    sessionRefreshFailure: sessionRefreshFailureAction,
    unauthenticatedEntry: unauthenticatedEntryAction,
    signInSuccess: signInSuccessAction,
    signInFailure: signInFailureAction,
    signUpSuccess: signUpSuccessAction,
    signUpFailure: signUpFailureAction,
    verifyEmailRequest: verifyEmailRequestAction,
    verifyEmailConfirm: verifyEmailConfirmAction,
    verifyEmailAssume: verifyEmailAssumeAction,
    verifyEmailSuccess: verifyEmailSuccessAction,
    verifyEmailFailure: verifyEmailFailureAction,
    verifyEmailTimeout: verifyEmailTimeoutAction
  },
  guards: {
    hasRegistration: hasRegistrationGuard
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgJYQBswBiAJQFEARASQoGEAVAfQoEUBVcgZQYG0AGALqJQABwD2sXOlziAdiJAAPRAHYArACZsqgJwA2AByqAzLvVmT6gIwAaEAE9EAFk3Psz69ef7+X3Xqq1gC+wfZoWNgATpC4MQDGMnJQxALCSCASUjLyiioIXp461sYmps66uvye9k4Imtbazhbempr6AYa61qqh4Rg4MRBxYIm4yanW6WKS0rIKGfmF1sWl5ZXVdo4uJibY-KqGPT4m+j3q+n0gETjIAO7Ic8nYsHBS8tiYDhBRyEkpXG4XGoAHkAHJMAASAE1KKQAIIMchMLjsOh0IFpRRZOa5RaIazqVS1Al+PaE-SaVTtXRWNwhMLXAbYe6Pf4vN7zT7fX7-YiArjA8FQ2EIpFMABi8OoABl2BQsRkcTkFqAlt4VkE1iYKlUatsCiZ+Np1MbTPotF12pdGTcWQ8nlAObB3nJuT8-uMAUDQRCKBKKFxISxyBxuHwhNjZiq8gSgqpsOofIZ9BbVM5TI0SQgfLodO11IYjZTTJoTFc7azHc7XdEwAAzGKwTBe-k+4X+wPB1HozGRpXR+axgpE7Nefh56wTzwmay6ZwVQkV5lV9mvF1cmKNuAtiYCoV+8gB7jBqWy+XkRUzbJD-H1KwrIlHRpGMlbOolE38b-Vfg603mJoy6RDcYByDI8R-JA-LUAA4hCILsMwbCcDwV6ZIOeJqgSGqrKY6x6u+BILu4Ga0lSVTfh0QG2syqByKB4G4JB6DQcC8FMNQh5hmh-bXriqrKASmhjjR-SRPRjEQVBEAwRx7AAAohjxEbTBhN5YUJCCqGc2CGM4ZRmJoE5-oY2bGYS+a6G4FyGEcDTATgUhQHIXp4IQJDsRCXHKahqlRhpgn5EaeY-t+rgdMc1j6GOZz6ImlKFkapo6qYjkvLgLlufgRByRCim+eG6HKre2EICF+xhRF3TptFY4XPF-CJYchimiWYlMpEzmuc84x5ZxEI9higrFZhQVqFoOgGKU5iWDYY4GdoJamAYhzxul3XZXI-U+WecoKnx6kCcOGjaHoRgrRYtLzQaPTWHsp2qNUhwdBODLiU5mU9U6qCiP1BVDX2aklZp+T0gmyb6Bo+iuE9pzZlDezGbO6YGSYxgVBtX1ub9-1KXtF6jYFJ2TedM1XQ+9WuImxodPppSaLooSMnI4gQHAig3AFx13gAtPDBq8xoNM-s4f7NBOZTpTlYDczGd5nOoU1GB0RgZmc2auO43SEsapxeN4hjpUMIxjMkculVplR5qcASmEmZQ6UROZuNgOummWZyFEbtEgQ6-wW6DBLo0rjS6otattGORoeC0riGFSTVPc46Wrm566uoH40FGj2Bh5UEf6VHBqnPwiaHNFqh6EarXqKn-vp5yHxfB6AcDsTd6Gys+fziY7RFyJBoLoY+wV1qVLqPOTO+7cDfPBnm4Nk2u5QFnw5zroI-OPpZjRfdZbNJrHSx7OC4WEmOnljP9psm5MRQLgsDoLylsg9n3g2HnbgF33keD3UDQEyzW8CrQkl9p4fRZAMMC0lWIQDXneTejUKRTihsYLQC0Fxuz0JoVqFp0E9HSpJaBTEWKQAQWVMB5ldjaDaNZSwE8vA2kgZtc27ceaULMJgsuZEyxdDnA0bwWMsq9Q8hQrSJRiS3TOGXGGk8KRFmpGla+rCnTjHEfkGwexaTpkqMZWknh1CxUqNgOhidDLmACMI762BfoaMQFovOWoNCmDsnZEw9UqTYOsjDA4BlAjM2CEAA */
  context: {
    session: null,    
    registration: null,
    error: null,
    temp: {
      accessToken: null
    }
  },
  id: "auth",
  initial: "idle",
  states: {
    "idle": {
      on: {
        REDIRECT_REQUEST: {
          target: "redirecting"
        }
      }
    },
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
                SESSION_HYDRATE_DONE: {
                  target: "#auth.authenticated",
                  actions: "sessionHydrateSuccess"
                },
                SESSION_HYDRATE_ERROR: {
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
              },
              on: {
                SESSION_REFRESH_DONE: {
                  target: "#auth.authenticated",
                  actions: "sessionRefreshSuccess"
                },
                SESSION_REFRESH_ERROR: {
                  target: "#auth.unauthenticated",
                  actions: "sessionRefreshFailure"
                }
              }
            }
          }
        },
        "registration": {
          states: {
            "pending": {
              on: {
                VERIFY_EMAIL_REQUEST: {
                  target: "verifying",
                  actions: "verifyEmailRequest"
                },
                VERIFY_EMAIL_CONFIRM: {
                  target: "#auth.authenticated",
                  actions: "verifyEmailConfirm"
                },
                VERIFY_EMAIL_ASSUME: {
                  target: "#auth.unauthenticated",
                  actions: "verifyEmailAssume"
                }
              }
            },
            "verifying": {
              invoke: {
                src: "verifyEmail",
                input: ({ context }) => context.registration!,
                on: {
                  VERIFY_EMAIL_DONE: {
                    target: "finishing",
                  },
                  VERIFY_EMAIL_ERROR: {
                    target: "pending",
                  },
                  VERIFY_EMAIL_EXPIRED: { 
                    target: "finishing",
                  },
                },
              }
            },
            "finishing": {
              after: {
                20000: {
                  target: "#auth.unauthenticated",
                }
              },
              on: {
                VERIFY_EMAIL_FINALIZE: {
                  target: "#auth.authenticated",
                }
              }
            }
          }
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
      entry: "unauthenticatedEntry",
      on: {
        SIGN_IN_REQUEST: {
          target: "signing.in",
        },
        SIGN_UP_REQUEST: {
          target: "signing.up",
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
              target: "up",
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
            SIGN_IN_DONE: {
              target: "#auth.authenticated",
              actions: "signInSuccess"
            },
            SIGN_IN_ERROR: {
              target: "#auth.unauthenticated",
              actions: "signInFailure"
            }
          }
        },
        "up": {
          invoke: {        
            src: "signUp",
            input: ({ event }) => {
              if (event.type == "SIGN_UP_REQUEST") {
                return event.input;
              }
              
              throw new Error("Invalid event");
            }
          },
          on: {
            SIGN_UP_DONE: {
              target: "#auth.awaiting.registration",
              actions: "signUpSuccess"
            },
            SIGN_UP_ERROR: {
              target: "#auth.unauthenticated",
              actions: "signUpFailure"
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

export const isAwaiting = (state: AuthMachineState): boolean => state.matches("awaiting")

export const isAwaitingSession = (state: AuthMachineState): boolean => state.matches({ awaiting: "session" });

export const isAwaitingSessionHydrating = (state: AuthMachineState): boolean => state.matches({ awaiting: { session: "hydrating" } });

export const isAwaitingSessionRefreshing = (state: AuthMachineState): boolean => state.matches({ awaiting: { session: "refreshing" } });

export const isAwaitingRegistration = (state: AuthMachineState): boolean => state.matches({ awaiting: "registration" });

export const isAwaitingRegistrationPending = (state: AuthMachineState): boolean => state.matches({ awaiting: { registration: "pending" } });

export const isAwaitingRegistrationVerifying = (state: AuthMachineState): boolean => state.matches({ awaiting: { registration: "verifying" } });

export const isAwaitingRegistrationFinishing = (state: AuthMachineState): boolean => state.matches({ awaiting: { registration: "finishing" } });

export const isAuthenticated = (state: AuthMachineState): boolean => state.matches("authenticated");

export const isUnauthenticated = (state: AuthMachineState): boolean => state.matches("unauthenticated");

export const isSigningIn = (state: AuthMachineState): boolean => state.matches({ signing: "in" });

export const isSigningUp = (state: AuthMachineState): boolean => state.matches({ signing: "up" });

//

export const isSignLocked = (state: AuthMachineState): boolean => isRedirecting(state) || isAwaiting(state);