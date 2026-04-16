import { createActor, setup } from "xstate";
import { AuthMachineContext, AuthMachineEvent, AuthMachineState } from "@/src/modules/auth/types/auth.machine.types";
import { hydrateSessionActor, refreshSessionActor, signInActor, signUpActor, verifyEmailActor } from "./auth.actors";
import { hasRegistrationGuard, hasSessionGuard } from "./auth.guards";
import { unauthenticatedEntryAction, sessionHydrateFailureAction, sessionHydrateSuccessAction, sessionRefreshFailureAction, sessionRefreshRequestAction, sessionRefreshSuccessAction, signInFailureAction, signInSuccessAction, signUpFailureAction, signUpSuccessAction, verifyEmailRequestAction, verifyEmailConfirmAction, verifyEmailAssumeAction, verifyEmailDoneAction, verifyEmailErrorAction, verifyEmailExpiredAction, redirectingEntryAction } from "./auth.actions";

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
    redirectingEntry: redirectingEntryAction,
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
    verifyEmailDone: verifyEmailDoneAction,
    verifyEmailError: verifyEmailErrorAction,
    verifyEmailExpired: verifyEmailExpiredAction
  },
  guards: {
    hasRegistration: hasRegistrationGuard,
    hasSession: hasSessionGuard,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgJYQBswBiAJQFEARASQoGEAVAfQoEUBVcgZQYG0AGALqJQABwD2sXOlziAdiJAAPRAEYAbABZs-Xf1UBWAJzrT-AwHYANCACeidbuyH1AZk2WATJ4Ac3nwC+ATZoWNgATpC4kQDGMnJQxALCSCASUjLyiioIjp7Yrqqemq5Gmoaa6qquNva5-Pma-G6eZrrqRp5BIRg4kRDRYHG4CUmqKWKS0rIKqTl5BUUlZRVVNXaIfvk+xh6eFppGJj6BwSChfVGx8Ym8nhNpU5mzoPMNi8Wl5QaV1bWbqmwBj0-EqunKRgO3XOvWwyAA7shpglsLA4FJ5NhMLYIOFkDdiFxuFxqAB5AByTAAEgBNSikACCDHITEoFPIyUU6WmWTmaiM-Fc2E87l8gvUFgM7k0-wQFk8RmFxx8lR8DVcXTOFzhiORUFR6JmWJxeIJRK4JIp1LpjOZTHIpFIpNInNS3Oe2X5guForVrglUs0Mo2CFU+gszgM6mKRg1PglGmh2oRSJuBtgGLkxtx+JGiXNlspFAAYhQuFSWOQONw+EIuU8Zp7Q-ttD8jH4dhZ-X51LLY4qWj4LO3Ba1PKok7CU3r05mImAAGaRWCYPOE4lkovkUvcCts8kcutuhu815eoUizRi-2S6WyvwGYXA9reSGqVRGSdhadptEZo2REucCrqMBabpWO7lvajrOq6kwZI2fKhgKF6+uKt5Bn247CoKRQWPhRgfqoFhfjgP55vOUC4LA6CmkaohgHIAyjAAag61DFjS9oALIMtQAAylbVjwcGPAhp7KGo+jqEChg-K4rhSpYfwhi02BNC0nRVMRDSkTqqYUZEVE0XRmIMUxa5saQHFceQvECUwdAUsWtDcaJ7qIWeobSbJBjyYpikWCpdRSjJHgavw+Hvh0oJ6eRKJGdRtG5mZjHMYkVk2TxfGCQyFrsNxh4PB5Ek5B+3qXteAbuNYIYKYqpQKd4kWaD4JhRnFuppolJkpVmABuyAEPguasexnHZQ5+5FfW4kvJJoa-NgHa6EcIr8CqwYhVKOGFDsoquEFn5alOXWGWAxnJc82CDcNECjRl422fZgkOk6LpHvBPLzWV4rYBY6h+WKXYeBospBvwQJ6PGGjeGGpidQZCUXUlpkDUNI0EplE12Tl9oABoAAq0FQ7knj9ahLSt-Bra4G2YSGHgRp4z5uMOvidIjM49VdRoQPIJDY89eMueSDL8dQABaM3HnNTblahV5+tVmi1SFCkFJUvyBZCsZc91KO9dd-NyCQSg0fiYBwgu6BgOEAAUngggAlMQyZncjl1o9gJtgGTctIQrPpK+hgZq4gBg+EKKpaL4JSVF2JEnd+Hv6jz3tgEooiDBAxBC5Ngmi+LUsy19HqByhwdVRh4cICUj7uFoFgqgcdMaAY+vnV7fXYJn2f9MQ5voJb1u2w7Tt6K77tI2nhu85ifc5-733y5XlXKzX4M7MtWseH5NMmIpcW9IxMgxJbEA3RjuckgA4pSpLsMwbCcCJn1iSvSHFCUy0Cq1w5R3fH2Dazg4wlAaAmJOPRvwnzkGfC+eA5C3XwISag98mDUC3MJWsxVyZNgVF2XyqtmjygVLKYckNBw-B+E0aopxoFkVgfA22l8RjIJvmgyk7BCZCVfjg2an8vIEKFAYCoFgSGvnBu2bAmknalGaMUehMIwhSCgHICi+AiCoPQZg3hNZl7ly8k1AcQ5uzxlCrKUwioTi+CCroKMpgO7JxwKo9RKJNEkDvlwnhL99HvxKhTBAxiZGmPUCcQG-pLEfgKH4FCnQ2ryj0q4jRchtGUl0dNAxnkFqKUIs4IK8pDrxNlO+VqkZoyqCDM3A4bgkm4DUSktJGDKRvVgv4vBSFFJR2WgcGOJR6q9jqledSCoOjjkqAYMcmg6kNJRKgUQTTuGsnZFk0qiAukyR2J0H4bhY5bTUN-ZwNMmheDVADdQMy3H6nmYsnhrSPq4IDkYywiodkA1BqCHY+yEDFDCgDZ8CSPyWCCGcOQ4gIBwEUBcARhiFoAFpBl1ARToEEqKQRQOUTgDxMLsk5CvJYpwgM3BM38P4PS-RBjDASDitZQT8LClUEOVWRQm5O1rpYCMLhpTHJFPhTu1LZaCIWvhERcl9iuHjO1WurRHzPkih0NYQVNQMP0jOP8mYaWBLDE4PC8ZoyFHZrXHYgItkeA2vDJxKr4r6nVUabEOYbiavlp85w+w9UimIp0Wu-YCi7D8uUeGkJ+U2sNJiQCy4QJQCdYHPyj5-60MZQoocfZSi+rKP698zQg3ONVQbbusKAlNj8ICURQMuySsBrXAKKLdA+BcJ6mmwbKKox7uZdK0avKSt8pM8tCrLCWJ-htXwjgqgJ2mTm61zajZGnYQ9DtC0WUXkFPofQhxSjyllFKHwMjhzNwUh+Q4Sjp7cznt7X286yriMBJVLQTQaZkJDJYMKBDQZbv0Ee06M8p3zyzIvfoF61BXqrre1aD66itUhqrMwVRhy5KPhOphuBz4sIAz88Vv9QTymksCb5jjlodilCzWMgNj5YFPkhhB7DUMimwm1TDTt26gmAduwc4DWgFNI5gcjyHICIKo4K2FOR2OKkirur5aowzfNvDE3wlgtnN1VpcvMqHCjGBCYnUch1iJSKFMOIwfkFLNwVKUJT7jCBgBU2y9Th1NMFMsW4bAJhow0x7OOKEObknuPmoWzpgYZGKLORKZokSQySnyG2SZewtCiPHSqzz1zRAqalNHYwIp-SmBhuyutSp9NdkIpU45IKAhAA */
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
      entry: "redirectingEntry",
      always: [
        {
          guard: "hasRegistration",
          target: "awaiting.registration"
        },
        {
          guard: "hasSession",
          target: "awaiting.session"
        },
        {
          target: "authenticated.invalid"
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
                  target: "#auth.authenticated.valid",
                  actions: "sessionHydrateSuccess"
                },
                SESSION_HYDRATE_ERROR: {
                  target: "#auth.authenticated.invalid",
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
                  target: "#auth.authenticated.valid",
                  actions: "sessionRefreshSuccess"
                },
                SESSION_REFRESH_ERROR: {
                  target: "#auth.authenticated.invalid",
                  actions: "sessionRefreshFailure"
                }
              }
            }
          }
        },
        "registration": {
          initial: "pending",
          states: {
            "pending": {
              on: {
                VERIFY_EMAIL_REQUEST: {
                  target: "validating",
                  actions: "verifyEmailRequest"
                },
                VERIFY_EMAIL_CONFIRM: {
                  target: "validating",
                  actions: "verifyEmailConfirm"
                },
                VERIFY_EMAIL_ASSUME: {
                  target: "#auth.authenticated.invalid",
                  actions: "verifyEmailAssume"
                }
              }
            },
            "validating": {
              invoke: {
                src: "verifyEmail",
                input: ({ event, context }) => {
                  if(event.type !== "VERIFY_EMAIL_REQUEST" && event.type !== "VERIFY_EMAIL_CONFIRM") {
                    throw new Error("Invalid event");
                  }

                  return {
                    registration: context.registration!,
                    accessToken: (context.session?.accessToken || context.temp.accessToken)!
                  };
                },
              },
              on: {
                VERIFY_EMAIL_DONE: {
                  target: "done",
                  actions: "verifyEmailDone"
                },
                VERIFY_EMAIL_ERROR: {
                  target: "pending",
                  actions: "verifyEmailError"
                },
                VERIFY_EMAIL_EXPIRED: { 
                  target: "expired",
                  actions: "verifyEmailExpired"
                },
              },
            },
            "done": {
              after: {
                20000: {
                  target: "#auth.authenticated.valid",
                }
              },
              on: {
                VERIFY_EMAIL_FINALIZE: {
                  target: "#auth.authenticated.valid",
                }
              }
            },
            "expired": {
              after: {
                20000: {
                  target: "#auth.authenticated.invalid",
                }
              },
              on: {
                VERIFY_EMAIL_FINALIZE: {
                  target: "#auth.authenticated.invalid",
                }
              }
            }
          }
        }
      }
    },
    "authenticated": {
      initial: "invalid",
      states: {
        "valid": {
          on: {
            SIGN_OUT_REQUEST: {
              target: "invalid",
            }
          }
        },
        "invalid": {
          entry: "unauthenticatedEntry",
          on: {
            SIGN_IN_REQUEST: {
              target: "#auth.signing.in",
            },
            SIGN_UP_REQUEST: {
              target: "#auth.signing.up",
            }
          }
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
              target: "#auth.authenticated.valid",
              actions: "signInSuccess"
            },
            SIGN_IN_ERROR: {
              target: "#auth.authenticated.invalid",
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
              target: "#auth.authenticated.invalid",
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

export const isAwaitingRegistrationValidating = (state: AuthMachineState): boolean => state.matches({ awaiting: { registration: "validating" } });

export const isAwaitingRegistrationDone = (state: AuthMachineState): boolean => state.matches({ awaiting: { registration: "done" } });

export const isAwaitingRegistrationExpired = (state: AuthMachineState): boolean => state.matches({ awaiting: { registration: "expired" } });

export const isAuthenticated = (state: AuthMachineState): boolean => state.matches("authenticated");

export const isAuthenticatedValid = (state: AuthMachineState): boolean => state.matches({ authenticated: "valid" });

export const isAuthenticatedInvalid = (state: AuthMachineState): boolean => state.matches({ authenticated: "invalid" });

export const isSigning = (state: AuthMachineState): boolean => state.matches("signing");

export const isSigningIn = (state: AuthMachineState): boolean => state.matches({ signing: "in" });

export const isSigningUp = (state: AuthMachineState): boolean => state.matches({ signing: "up" });

//

export const isSignLocked = (state: AuthMachineState): boolean => 
  isRedirecting(state) || isAwaiting(state) || isAuthenticatedValid(state);

export const isVerificationLocked = (state: AuthMachineState): boolean => 
  isRedirecting(state) || isAwaitingSession(state) || isAuthenticated(state) || isSigning(state);