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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCMWgGzaAnABYRAdhGmANCACeiUwA4ArNlfqP+1zdd9U1N1AF9Qh0E8AmJyKkFaMAAnJIYk7CkAG2R0ADM0gFto3gEMYXFlGTkFJSRVDW1dA2MzSxt7J0R9TVdsKy19c3d9a1MRkS1wyLLsZFz0ZMoeWIpqMspGZlpRCTqq+UUyZTUEK3MrXXMjUy0rMddzENcHZwRxnVc3cy11K3d3MbmfRTEBROYLJJLGKkVaCDZMMDbfS7aSyA61UAnM4XERXG53PyPHwvLpaLQibCmKzdAyma5GcyuIwgqLLGFUJJgKAkWDoJI5Q70BGsMgcLjFYh8Tnc3n8mpkHaVNHy45dbQUmzadzqdxGQzuB4kt5BXraQIMgGuWxnFkzNlxSjSnl8gVMRIpNIZbJ5QoS-hO2WuhUVPbKw6qt7qvp6LTa3X6w2dN5GWzYdRGaluM4ia4iVy2rCzeaLe2rAMu+XwraK0PVcN1E5+LSmbDawbam4-MZGwz6Tw+QL6KzqCY2ZkRUEzcEl6EO8tyw5VxFCZFKusY+pvVzN1sGIbqTsH-Q9x76bB6-pklNBclhCdgspgMgKXA5SC0ADKAEkAOIAOQAfQAeQAVQAFRrVF1yOBtEFuPQvC0QdzEZO4-isI06XMc9TG1HUWhEbp83vGZUDIQQnxfN8IE-X9AK-P9IJAfYVVghBbjJNNzB6XCHiZDpXnTXp90MK1cRQox3CsAscDIijnxIV8Fho79-wAkCAAUmJY+tMTg6kLm1WwsP+YIziNQJWxEaz9FEq4iWkkjCzkKAyAdchaLUhiAI-ECAGE-IAUQ-D9tLDDcTjJK1z1sKTfH+T5zCNRkW1vQZhz0Zo6Rk7AXLc1YPNU+jAIAMQAQS-AAZECACVArC6CIyiikU1wqx4oNCwjXJHRYxs25eytIxJicnA8odVApE8wDNJ8-ygpChr0RgvStx3Nt90Pbsk3as8O1sPV3BEdxzjvaZnJIVyJqmor1I0gDyqq2r6pDKDlojJsWw2jsySPI0jA8VsPDMkdyQ8EbzpwZAAHdkAOVY2GSEhckUoNaAANUCmqvxKr8-LKsCvyAwC-KAgBZDTKsCsDAoAESW1jVuamK2o6xKe17NMvi0SxXG3WxiMh2ZYfhqhEaSZHUflDGsZxvGCaJwDAoADQ0r86vp17mPClbN2Z1q4uGBKuqTQw6T6EYqV+L5vHHCcyAYCA4GUQQ13eti+CMI1PZy0t4jKN3Gc3b5MLcNM+xGWymT8PUcunSE-bWLAl0D3TN2GM91G4qx+j56xNB7azDMkvM3D0Pwbl92cyy5Z0Fw3HSIpcbjsGba4u2sSOtB7AYKStc4fh5qwTBtUaiwhKFeDnWvA0rTYwFTpu3hOnRhvcMG9AzwYe-JXQTqMBlyRzq5xyF+SqOUxfdcik7en1clHmOwxbkLwjsEGbx+L8azvByuTHwUkpSAV8mqmFxNgb4+g17+CZMNV+aZjq6mCOmXulcx7jQKrrRu184IjEMn2bcnwcxGizp4ESKF0zDGHlcHKGCqCTRAWxKBjxKQ5l+FcbwVIvZJgBh8e+AIoEPBoWPGGcMFAIyRijJSadsFNTYbuQYSEpKxh1OoDmfw94cKOpqSSdtQhAA */
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
          target: "authenticated",
          actions: [
            "setAuth",
            "persistAuth",
            "unsetRegistration",
            "clearRegistration",
            "unsetError"
          ]
        },
        VERIFY_EMAIL_FAILURE: {
          target: "awaiting registration",
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
      "verify expires": {
        after: {
          5000: "unauthenticated"
        }
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

export const isAwaitingRegistration = (state: AuthMachineState) => state.matches("awaiting verification");

export const isVerifyingRegistration = (state: AuthMachineState) => state.matches("verifying email");

//

export const isAuthBusy = (state: AuthMachineState) => isAuthenticated(state) || isChecking(state);

export const isSignBusy = (state: AuthMachineState) => isAuthBusy(state) || isAwaitingRegistration(state);

export const isVerificationBusy = (state: AuthMachineState) => isAuthBusy(state) || isSigningIn(state) || isSigningUp(state);