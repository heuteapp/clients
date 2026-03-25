import { createActor, setup } from "xstate";
import { hydrateAuthActor, hydrateRegistrationActor, signInActor, signUpActor, verifyEmailActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent, AuthMachineState } from "@/src/authentication/types/auth.machine.types";
import { clearAuthAction, clearRegistrationAction, persistAuthAction, persistRegistrationAction, setAuthAction, setErrorAction, setRegistrationAction, unsetAuthAction, unsetErrorAction, unsetRegistrationAction } from "./auth.actions";

export const authMachine = setup({
  types: {
    context: {} as AuthMachineContext,
    events: {} as AuthMachineEvent,

  },
  actors: {
    hydrateAuth: hydrateAuthActor,
    hydrateRegistration: hydrateRegistrationActor,
    signIn: signInActor,
    signUp: signUpActor,
    verifyEmail: verifyEmailActor,
  },
  actions: {
    setAuth: setAuthAction,
    unsetAuth: unsetAuthAction,
    persistAuth: persistAuthAction,
    clearAuth: clearAuthAction,
    setRegistration: setRegistrationAction,
    unsetRegistration: unsetRegistrationAction,
    persistRegistration: persistRegistrationAction,
    clearRegistration: clearRegistrationAction,
    setError: setErrorAction,
    unsetError: unsetErrorAction,
  },
  guards: {
    isAuthenticated: ({ context }) => !!context.auth,
    isRegistrationAwaiting: ({ context }) => !!context.registration
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCMWgGz7NAVi0itAFgA0IAJ6J9+6-uwB2fSICc6kfpGvh7W1gC+YfaCeATE5FSCtGAATskMydhSADbI6ABm6QC2MbwCGMLiyjJyCkpIqhraugbGpuoWVnaOiBY+un4hPoFGWmZmHhFR5SVxFJTJYFAksOjJuYpk9Ews7JzcsfwLSytrtWSiEvXV8hvKaggAHD4PnmYielra6n76PvZOCA62BMHlGPhE1iePjMkxA0R4syoR2Wq3WTCSqXSmRy+SKM0OixRpw2FyqshudVA9yeLw8bw+Xx+f26j3c9ICPmeWh8NgeE0icOmgjAZAUuFykFoAGUAJIAcQAcgB9ADyAFUACqkq7ks53RBaGwiYGglyuAIPB5af7OQxGbDPazqB5GMyQswPaxGWHRVBkYWikji9CS2WKpUyhXa6S6271e6Gsx9fR8q2GiFBDw2hD6JO0+lu36fawedQ+6Z+gNiiUQaXy5VqgAK0ZA1z18YNo2s2HUdMhlrM+i8uezLp0dI8D00fLpWkM5aw2DkUDI8Uo5Dr4cjSqlaoAwnuAKJSqUtttxqnOB653RenneKwQkQPbOGKfAvkWfzgnm+Bc4ZdVzmDcw2VbcADEAEEZQAGTVAAlQ8z1jSkGhza8zFvIx73eSxrGfV8nR0N1sLMb4zFdEtwgFaJALXVApE3BtGx3fcjxPZCagvNCaVed4vk+JlsxMdRsHGKxPUHIYTAef8lxIFd6MY0ClSbJUoNghCkMqHUuNQ6lnj4hlBIMZkAWeUS3knLRLR8IxQUhOTkAAd2QG45jYFISDyIM0U2AA1Q94JlcCAE0lUPABZaCYM4ikyH1HNNA8XRJyfF0jGsD0zMQaxoWBFwfFBCFezGGEaKFVz3KoTzkm83yzloQLgrCiLotgpU9xVSLGxgw8NUPAAROL20vJLe1Sh50qMTLsuzJNjRCOcRhm-C3XKqZF1q7yHDXMBCjcrImqCkLwqimLWIPY9Tx0mM9ISjt0JvDMcMffCXxZb57Q8Sj1s9EQTC0OTtryXa5n2w7jpas72pg9SYqGkbuPuUwPGTUZ3js59PizT7OWBD0HgokJ+JMYGvNBvaDpII7mtOtqLsPAANRsZUQ4bbtbFCHrGlNnrvOdcPS7NQhS4wxkyoYSyMdRQnJurQcoWBUFwXA4FgSUkf0g0AdEkRrOeTLSznLoAUsRb6X8T5XE5Cx5Z2ygwBUKQSAWWBaBUFYJWwZA8hDZIAAp2QASloaIQYcR3ndduAtZ5tDDXwk05xcfCUytEWiodLKtA8THwQtcqBTIBgIDgZRBDJe7Er4Ixsz4TDOSb5vm-Ub0KsXBFSDmSvdPixLrGtFkXFGD8QlLESeTsuSu7XZETj8qv+8ewd3Fl3t3rzomXDMeaITEgZDX8LevCc8oRWrEMICX0aE4BlLtFCUw3lzOlX0CUSnTpZ8rH8AJ282jgSs59AzBkgDfZGBo07YHFj4PKQQsoplfO8b668hi9GdH+DuAEFJASoOQCB2scwy3cNCAwFhn5TUnK+MqwJRhtCeL4L0QNsHyUUnMBihD473DzujN4mh8IrVltmLGwJfDfG8JoFw9knJVQUB5CmDVuLniISPY09kUwAy5O0YSFFdDvD0JoGwrpJz20puDamWQuGJUCADbAg8UyhCKu6D6AIsrJjIb2NGedsIyNYRHJWKs1awA1tfPut8Ey62wN4aEIRMrfCtOoEW+9BxjGME6cYZFZL+IppHJ2Ls3bWMepYUsMDZbG1fplIebi7LZzIiIMiHgt58mohEIAA */
  context: {
    auth: null,    
    registration: null,
    error: null,
  },
  id: "auth",
  initial: "checking auth",
  states: {
    "checking auth": {
      invoke: {
        src: "hydrateAuth",
        id: "check-auth",
        onDone: [
          {
            target: "authenticated",
            actions: "setAuth"
          }
        ],
        onError: { target: "checking registration" },
      }
    },

    "checking registration": {
      invoke: {
        src: "hydrateRegistration",
        id: "check-registration",
        onDone: [
          {
            target: "awaiting verification",
            actions: "setRegistration",
          }
        ],
        onError: { target: "unauthenticated" },
      }
    },

    "authenticated": {
      on: {
        SIGN_OUT: {
          target: "unauthenticated",
          actions: [
            "unsetAuth",
            "clearAuth"
          ]
        },
      },
    },

    "unauthenticated": {
      on: {
        SIGN_IN: {
          target: "signing in",
        },
        SIGN_UP: {
          target: "signing up",
        },
      },
    },

    "signing in": {
      invoke: {        
        src: "signIn",
        input: ({ event }) => {
          if (event.type !== "SIGN_IN") {
            throw new Error("Invalid event");
          }

          return {
            identifier: event.identifier,
            password: event.password,
          };
        }
      },
      on: {
        SIGN_IN_SUCCESS: { 
          target: "authenticated",
          actions: [
            "setAuth",
            "persistAuth",
            "unsetError"
          ]
        },
        SIGN_IN_FAILURE: { target: "unauthenticated", actions: "setError" },
      }
    },

    "signing up": {
      invoke: {
        src: "signUp",
        input: ({ event }) => {
          if (event.type !== "SIGN_UP") {
            throw new Error("Invalid event");
          }

          return {
            username: event.username,
            email: event.email,
            password: event.password,
          };
        }
      },
      on: {
        SIGN_UP_SUCCESS: {
          target: "awaiting verification",
          actions: [
            "setRegistration",
            "persistRegistration",
            "unsetError"
          ]
        },
        SIGN_UP_FAILURE: {
          target: "unauthenticated",
          actions: "setError"
        }
      }
    },

    "awaiting verification": {
      on: {
        VERIFY_EMAIL: { 
          target: "verifying email",
        },
        VERIFY_EMAIL_COMPLETED: {
          target: "authenticated",
          actions: [
            "setAuth",
            "persistAuth",
            "unsetRegistration",
            "clearRegistration",
            "unsetError"
          ]
        },
        VERIFY_EMAIL_ASSUMED: {
          target: "unauthenticated",
          actions: [
            "unsetRegistration",
            "clearRegistration",
            "unsetError"
          ]
        }
      }
    },

    "verifying email": {
      invoke: {
        src: "verifyEmail",
        input: ({ context }) => context.registration
      },
      on: {
        VERIFY_EMAIL_SUCCESS: {
          target: "verify successed",
        },
        VERIFY_EMAIL_FAILED: {
          target: "awaiting verification",
          actions: "setError"
        },
        VERIFY_EMAIL_EXPIRED: { 
          target: "verify expired",
          actions: [
            "unsetRegistration",
            "clearRegistration",
            "unsetError"
          ]
        },
      },
    },

    "verify successed": {
      entry: [
        "setAuth",
        "persistAuth",
        "unsetRegistration",
        "clearRegistration",
        "unsetError"
      ],
      on: {
        VERIFY_EMAIL_FINISHED: {
          target: "authenticated"
        }
      }
    },

    "verify expired": {
      after: {
        20000: "unauthenticated"
      },
      on: {
        VERIFY_EMAIL_FINISHED: {
          target: "unauthenticated"
        }
      }
    }
  },
});

export const authService = createActor(authMachine);

//


export const isCheckingAuth = (state: AuthMachineState) => state.matches("checking auth");

export const isCheckingRegistration = (state: AuthMachineState) => state.matches("checking registration");

export const isAuthenticated = (state: AuthMachineState) => state.matches("authenticated");

export const isUnauthenticated = (state: AuthMachineState) => state.matches("unauthenticated");

export const isSigningIn = (state: AuthMachineState) => state.matches("signing in");

export const isSigningUp = (state: AuthMachineState) => state.matches("signing up");

export const isAwaitingVerification = (state: AuthMachineState) => state.matches("awaiting verification");

export const isVerifyingEmail = (state: AuthMachineState) => state.matches("verifying email");

export const isVerifySuccessed = (state: AuthMachineState) => state.matches("verify successed");

export const isVerifyExpired = (state: AuthMachineState) => state.matches("verify expired");

//

export const isAnyChecking = (state: AuthMachineState) => isCheckingAuth(state) || isCheckingRegistration(state);

export const isAnyAuthenticated = (state: AuthMachineState) => isAuthenticated(state) || isUnauthenticated(state);

export const isAnySigning = (state: AuthMachineState) => isSigningIn(state) || isSigningUp(state);

export const isAnyVerifying = (state: AuthMachineState) => isVerifyingEmail(state);

export const isAnyVerification = (state: AuthMachineState) => isAwaitingVerification(state) || isAnyVerifying(state) || isVerifySuccessed(state) || isVerifyExpired(state);

//

export const isSignLocked = (state: AuthMachineState) => isAnyChecking(state) || isAuthenticated(state)|| isAnyVerification(state);

export const isVerificationLocked = (state: AuthMachineState) => isAnyChecking(state) || isAnyAuthenticated(state) || isAnySigning(state);