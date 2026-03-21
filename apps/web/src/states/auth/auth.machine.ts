import { createActor, setup } from "xstate";
import { hydrateAuthActor, hydrateRegistrationActor, signInActor, signUpActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { clearAuthAction, clearRegistrationAction, persistAuthAction, persistRegistrationAction, setAuthAction, setErrorAction, unsetAuthAction, unsetErrorAction } from "./auth.actions";

export const authMachine = setup({
  types: {
    context: {} as AuthMachineContext,
    events: {} as AuthMachineEvent,

  },
  actors: {
    hydrateAuth: hydrateAuthActor,
    hydrateRegistration: hydrateRegistrationActor,
    signIn: signInActor,
    signUp: signUpActor
  },
  actions: {
    setAuth: setAuthAction,
    unsetAuth: unsetAuthAction,
    persistAuth: persistAuthAction,
    clearAuth: clearAuthAction,
    persistRegistration: persistRegistrationAction,
    clearRegistration: clearRegistrationAction,
    setError: setErrorAction,
    unsetError: unsetErrorAction
  },
  guards: {
    isUserLoggedIn: ({ context }) => !!context.auth
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCMW-QFYAbCYDs60wA4LAGhABPRBZGnsps+oAs+gJz++j42WloAvuGOgngExORUgrRgAE4pDCnYUgA2yOgAZhkAtrG8AhjC4soycgpKSKoa2roGRmaW1naOLgg+Fha6FlqBff5mNqZjkdEVpfEUlClgUCSw6Cl5imT0TCzsnNxx-Esraxt1ZKISDTXyW8pqCDbP2BY+gf4+PqY+Wr7q3UQXxEun8Pz+P1MFgmESiIBiPHmVBOq3WmyYyTSGSyuQKxTmx2WqPOWyu1Vkd3qoEezxsr3eI2+v3+gIQxiGngs-n6Wl+kx87mm8NmgjAZAUuDykFoAGUAJIAcQAcgB9ADyAFUACpkm4Ui4PRD6Cz6EFaGyGMFmES8-qsyb6bD+YYWLw24wiD0+IUxVBkUXikiS9DS+XKlVypW66T6+4NR7G82vMFjES-AX6Gz+Vn6fSmdSeMaafNWPrGfQ+2Z+gMSqUQWWK1UagAK0ZAtwN8aNQwL-hsPnUFpsZihX1ZFuwHpEIi5vjCXLTlaw2DkUDICUo5Ab4cjKplGoAwgeAKIymVtjtx6lG7QDN4fN4iYfDYzjkKebT+dxaYwjuxLnBV3XBYtzDVVdwAMQAQTlAAZDUACVjwvWMqUaBB9FvekHwFZ8xlZQIBneMJ2T6AJ2QAlcSDXDdUCkbcm2bFUoIAdRgrVIwVFDaivdDaWwxlwRZZwNGNQsREzU1tHMCTKKA2j6LAlUWxVaC4MQ5Cqj1Hi0JpF570E5kB1ZLQbWwH9py5Ux81zKFKOQAB3ZA7gWIDKDohjlKYg81QAWWbWDjy1Y8ABFuMpMhDQwrCDO5XDjBfVkBR8J1XRsiThgmCx7KclyqDcjylJU48AA1mzlJCwq0mMdMirtoq0O8GTip8EvwkSEHUYwUr6ayBU0dQZx+SI4TIBgIDgZRBHJWqor4UxWT4YwnQ+Va1v8dRKMRUgFmm7SIqi34kus7BQky-tzWCf84QRI4NxRM50TqmqDvq8tHX+KwspNCYkoSychj7LMfGMbRvmMeyKjFWsQwgGbXuvDDfxS9kLV6kJ83anohjpQdhlNIJ2UwiGbqrf0ocDYNIHhztEYCadTosD1bGMGwJMmLQCP8SdTB-NnQgtRrnTk6jgKocgad4hMTBSrxeZBqFTBnZ0ue5n62Zk4w+2skWaIWOjJd01wRG5wwGRnX8TbeHNAmwXr81CVmgmCHLnIUVzRfcqRDee9Dc1NTlM1-YcTZdVlfGWoZrOsNwvq6kbwiAA */
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
            target: "awaiting sign up",
            actions: "persistRegistration"
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
        SIGN_UP_AWAITING: {
          target: "awaiting sign up",
          actions: [
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
    "awaiting sign up": {
      on: {
        SIGN_UP_COMPLETED: { 
          target: "authenticated",
          actions: "persistAuth"
        },
        SIGN_UP_EXPIRED: { target: "unauthenticated" },
      },
      exit: "clearRegistration"
    }
  },
});

export const authService = createActor(authMachine);