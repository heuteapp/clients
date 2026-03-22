import { createActor, setup } from "xstate";
import { hydrateAuthActor, hydrateRegistrationActor, signInActor, signUpActor, verifyEmailActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent, AuthMachineState } from "@/src/types/states/auth/auth.machine";
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
    unsetError: unsetErrorAction
  },
  guards: {
    isAuthenticated: ({ context }) => !!context.auth,
    isRegistrationAwaiting: ({ context }) => !!context.registration
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCMWgCwB2TQA4j5k-oA0IAJ6ITJnQDY3ATn2Hr5rW4ArOoAviH2gngExORUgrRgAE6JDInYUgA2yOgAZqkAtlG8AhjC4soycgpKSKoa2roGxmbqltZ2joiGJtiB5gYmbiL66kaebgZhEaXYyDnoSdSllDzEkLSiErWV8opkymoIJiI6WuaG+mPmbkb6IoH2TgjmJ71uxiLHt32egVMgkTmC0SSywK2iXAgG30W2ksl2NVAh2Op3OWkunmut3uj0Qxjc2H6Bmu6hMpmO2n+kVWpAolESYCgJFg6ES2T29CYLHYnG4EL4DKZLLZ1TImwq8NFBy6Wl+2E8pMCIjcLiMWk0JlxCE8PSGKsCZ30-XORiMVJmNNi9MZzNZ7KYCWSqXSWVyBSKxAFNuF9rF5W2kr20oQhjlCpMSpVZPVpK1xkC2GMngV-gCRhElnNWFm80WgttIr24N463FAaqQdqh30Jmu2EuyoCSfRpq1516Ik7nYmzUu5izOCBee9dtFxbWUKEMIlFcRdRDtYJDfe7zGLaMWu6HeG3lcYxXoXCAJmgjAZAUuGy6wAygBJADiADkAPoAeQAqgAVMtw2f7KtdIu9bpiuzaXBunRHDc2DqIEngxu8dyeLcA7YKgZCnueJCXgsUJ3k+z63o+P4gDsUoASG5iYroq7nKMhgTOoWrqNBYyYnolimlogR-EekToZhF5XnhD4vu+AAKJFkZWSJ4uinj1iI8HqPBNxjA8kGBPoCZKYEVg8XRxyeKhchQGQVrkLQ+EvkRz7Xu+ADCDkAKLXteUmBnO1aygm4aRqqMaapp7ZaCcOo3GYSqkiZJBmRZZBWaJhEvgAYgAgreAAy74AErOR5f7BqGvmKsqAUalq+mJlcQy-MqapaDFcV0qgUiJQREl2Y5LluQVCL-rJCDceY5jYGqRrqSYyGmJVBpjcmSl3HpjHcU15ktW11nPp16VZbl+X+r+-XBlo8mKcpqmmr8lX6Aplzqsc9zmEqyGocgADuyC7HSbBJCQOTYb6tAAGrOTlt4pQAms+zkALIZZlfXkYNTZGL0tYjO8spuOcm70fKpLpjWnawdpqG-Yk-0OFaYD5F9GQg2DEPQ3DCNdU5rnuYdpGeQN87FQTEZldGFWQfB+g0eqgS1qa0v9nxMwU1TNN0yQDOg+DUMw-DWXPrt2V5UjMn8z5gv+SLsaQZc7zYDjZhYqMCqYuTf05NTdK0-TjOayzOuZTDAAa4m3nlAAiRteTKYalVGaqi08PinYSZydpGrRBC7lNu5QYAqFIJAMrAtAqCyV45sCAAUSqdgAlLQkRK9nuf54XEd89WQHLqj4utlbNbqB2EYgaa7Rmv8ZAMBAcDKIIM7HRRfBuFqi+6F2a-r2cqGWnSs-lvPg1qlqEYEjc0v3IYwSYo1CvZkOIKCOOkJz8j85aRLoykqMRgRT4QVPFNaMVLSx8MEGs4Yt4QitPmH0L9pKR2eNRUB6p1TPWTJiOMyp5qYm6HoU0+gM430HLmEE0DRxFhpJAZ+xtqx6TRuvS4IxfgaQTrdGCmhSamFukpcYb1ShniErhKh8DtLQVggqU+aktCDDbJ2QkhhP5IUxDqVCAk+FYRwpQveL9DihXTMBRscEDDaCYppT4vQLhKQzNYAya14pCPbl0O4OhLCtBcFFPBf9EB9DRhGQYLgL5GFGLYja9iTq3AHlNHG3FpbBG0JVWsttaw2CGL4EQY9pi30+t9KgjdAawN5idF4A9MSmgMCcPo-hPEhg1L0aw6ZTDBECek482ZG7uyoJ7NWoSKJ3FcDBQwYwGlGL6JuQJCZBgsWQmcBUUjeIZJwG0nOecC7Ty0dQrofQCS3BAvBZMVgDCbhrDoJU-i7h9kuLxMIQA */
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
            target: "after auth checked",
            actions: "setAuth"
          }
        ],
        onError: { target: "checking registration" },
      }
    },
    "after auth checked": {
      always: [
        { 
          target: "authenticated",
          guard: "isAuthenticated"
        },
        { target: "checking registration" }
      ]
    },
    "checking registration": {
      invoke: {
        src: "hydrateRegistration",
        id: "check-registration",
        onDone: [
          {
            target: "after registration checked",
            actions: "setRegistration",
          }
        ],
        onError: { target: "unauthenticated" },
      }
    },
    "after registration checked": {
      always: [
        { 
          target: "awaiting verification",
          guard: "isRegistrationAwaiting"
        },
        { target: "unauthenticated" }
      ]
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
          target: "verify completing",
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
          target: "verify completing",
        },
        VERIFY_EMAIL_FAILED: {
          target: "awaiting verification",
          actions: "setError"
        },
        VERIFY_EMAIL_EXPIRED: { 
          target: "verify expires",
          actions: [
            "setError",
            "unsetRegistration",
            "clearRegistration"
          ]
        },
      },
    },
    "verify completing": {
        always: {
          actions: [
            "setAuth",
            "persistAuth",
            "unsetRegistration",
            "clearRegistration",
            "unsetError"
          ]
        },
        after: {
          5000: "authenticated"
        }
    },
    "verify expires": {
      after: {
        5000: "unauthenticated"
      }
    }
  },
});

export const authService = createActor(authMachine);

//

export const isChecking = (state: AuthMachineState) => isCheckingAuth(state) || isCheckingRegistration(state);

export const isCheckingAuth = (state: AuthMachineState) => state.matches("checking auth") || state.matches("after auth checked");

export const isCheckingRegistration = (state: AuthMachineState) => state.matches("checking registration") || state.matches("after registration checked");

export const isAuthenticated = (state: AuthMachineState) => state.matches("authenticated");

export const isUnauthenticated = (state: AuthMachineState) => state.matches("unauthenticated");

export const isSigningIn = (state: AuthMachineState) => state.matches("signing in");

export const isSigningUp = (state: AuthMachineState) => state.matches("signing up");

export const isAwaitingVerification = (state: AuthMachineState) => state.matches("awaiting verification");

export const isVerifying = (state: AuthMachineState) => isVerifyingEmail(state);

export const isVerifyingEmail = (state: AuthMachineState) => state.matches("verifying email");

//

export const isAuthBusy = (state: AuthMachineState) => isAuthenticated(state) || isChecking(state);

export const isSignBusy = (state: AuthMachineState) => isAuthBusy(state) || isAwaitingVerification(state);

export const isVerificationBusy = (state: AuthMachineState) => isAuthBusy(state) || isSigningIn(state) || isSigningUp(state);