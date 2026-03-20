import { assign, setup } from "xstate";
import { hydrateActor, signInActor, signUpActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { clearAuthAction, persistAuthAction } from "./auth.actions";

export const authMachine = setup({
  types: {
    context: {} as AuthMachineContext,
    events: {} as AuthMachineEvent,

  },
  actors: {
    hydrate: hydrateActor,
    signIn: signInActor,
    signUp: signUpActor
  },
  actions: {
    persistAuth: persistAuthAction,
    clearAuth: clearAuthAction
  },
  guards: {
    isUserLoggedIn: ({ context }) => !!context.auth
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygGIIB7MsbcgNxqIbSzwOPKgWZq5k6EnQDaABgC6kqYlAAHGrBIi68kAA9EAVgAsAdmwGdEiQGYAnDp0AmQ+b0AaEAE9EtywA5jey-4tbCQA2Ay9bAF8Ilw4cfEJSCmo6BgE2bFiuBN5+MhYhNTJZMQBGOSQQJRVCjW0EfSMTMysbewNHF3cEIPNjUwkSiS9LYOHggaiYjDjuRKowACcFmgXsBQAbYQAzFYBbDOmsngpc-OFRIulZDSrVC9rdQz7m6zsHZzcPHRLsW36zcZeMIGEqTECZWJgMgiAqQSgAZQAkgBxAByAH0APIAVQAKtcKrcahU6oM-sYSkCSuZgno9BJbCVgp1EHovD9wuzzOE7CMLGDMqgyJDoSRYRAESiMYjUQTFMo7uoSYhBnpbNh6cFKZYmTpgn9bCyEAYDJZjOz7BJLCD9ZY9ALDkKRTDhHCkWj0diAApyyoK4mgUkWIw6Sw0ywhCNWEFG9ka-wJwx2rxeB2cFRQMi8AAE5ElHpl6Ph2IAwiWAKLw+G+on3ZX1J5NCyvNodT4IPzqgwWQYGPxaxkGNM4DNZii5sj56UYgBiAEFEQAZbEAJXLNf9dcDj0a-Rab3aHy6wVD2B7JXalL0oa8OmH2FHOdQCmS9EYeVY7EOj-Hz9OgnOcQrmkG5NyVbdukZbB9X6MMGX0WxbC8I09HMIwkNpcw9UcK0QXvH8oGzZ9KEWZZVg2bY9gOdMSEzJ8FH-AoLmKEDCTAsgHkgn4YLMOC-jVJCjQjdVzxGa06TZUFonBQ5kAAd2QO5x1HIiX3dDFvXREtMQAWS9Rdy1xcsABEN2qLctB3Z5m1ad4jUcYJfj8bxmj+YIw3veTFJEZTaLIVSp09L10XLAANL1ETXUzWPlczwMshtdxeWzDxQtVfgsIZbBMEpbG5cwomksgaAgOANFiUC4o4+sAFpmXbGqdGwBMWta6x73iY4oEqxVqog8NfkcKwJHpBMRqNRDHKbEbGSZcYwk86YoRddBIB6gMEqBCQzxKPV+IZNlEKNUwmokfR3J0EFqU5YJ7ydJbRXFdaLNJRC9A1LxUMksJVR0WNb1+NzPpCCQDCCVNpMyAiJ2e+K6jQ96T31LxxjE0JryNYJuWwHRzFy3KTX0bx8L8+jYb6hK1RQwZfhRtVQZPOkpKmTgvKUwiVOfcnOIRwbUIjUaAiPVkaVpzCT2GalQftQqgA */
  context: {
    auth: null,    
    registration: null
  },
  id: "auth",
  initial: "checking",
  states: {
    "checking": {
      invoke: {
        src: "hydrate",
        onDone: [
          { 
            target: "authenticated", 
            guard: "isUserLoggedIn",
            actions: "persistAuth"
          },
          { 
            target: "unauthenticated",
            actions: "clearAuth"
          },
        ],
        onError: { target: "unauthenticated" },
      }
    },
    "authenticated": {
      on: {
        SIGN_OUT: {
          target: "unauthenticated",
          actions: "clearAuth"
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
          actions: "persistAuth"
        },
        SIGN_IN_FAILURE: { target: "unauthenticated" }
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
        },
        onDone: {
          target: "awaiting sign up",
        },
        onError: {
          target: "unauthenticated",
        },
      },
    },
    "awaiting sign up": {
      on: {
        SIGN_UP_COMPLETED: { 
          target: "authenticated",
          actions: "persistAuth"
        },
        SIGN_UP_EXPIRED: { target: "unauthenticated" },
      }
    }
  },
});