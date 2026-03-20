import { assign, createActor, setup } from "xstate";
import { hydrateActor, signInActor, signUpActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { clearAuthAction, clearRegistrationAction, persistAuthAction, persistRegistrationAction } from "./auth.actions";

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
    clearAuth: clearAuthAction,
    persistRegistration: persistRegistrationAction,
    clearRegistration: clearRegistrationAction
  },
  guards: {
    isUserLoggedIn: ({ context }) => !!context.auth
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygGIIB7MsbcgNxqIbSzwOPKgWZq5k6EnQDaABgC6kqYlAAHGrBIi68kAA9EAVgAsAdmwG9ATnMA2HRb1WAzACYANCACeiPRJ3YJBgBwAjBIONgEWFn52OgC+0S4cOPiEpBTUdAwCbNgJXMm8-GQsQmpksmIBckggSiolGtoI+kYm5qZWNvbObogOwdgOOhJDegEBDgF2bXqx8RiJ3ClUYABOyzTL2AoANsIAZusAttlzuTwUBUXCoqXSsho1qtf1uobGZpbWtjqOLu4IDqZvL07EFfAFTAE-L4ZiAcgkwGQRMVIJQAMoASQA4gA5AD6AHkAKoAFTuVQedSqDSCAW8Bkh-gidiieh0XT+Iz02FZdgkpgMDgckQMEj8MJyqDI8MRJGREDRWLx6OxZMUyke6ipiCCjm5EgsvL8pgBfgcAt+iD8FgC2AZdj8nj8BgsvTFcVhJ0l0qRwhRGJxuMJAAVVdV1ZTQNTgkYdKZ7b42n4dJE9BaEIFsIMhhI9HZ6RYhhDxScVFAyLwAATkBUB5W41GEgDCjYAoqjUaGKU8tY1Xi0Ph1vuzEDYuXoHSDTQEBfS7MXOKXyxQq2Qa0q8QAxACC6IAMoSAEotzvh7uRl7Nd5tT6dNMmCTcvMjXn+Cb0+c4ReV1AKNL0RiFKw7AliQZbfgoFyCFc4i3NI9ynpq57-OM2AumYfhWhYBg6AYuE6GmbJ+KhJh6Ky46jFapgftgX7Lj+lArGsGzbHshzHAuoFLlAFY-pBxTXGUcHkghZDPMhNpoaYGHhNhuHYWmUl2I+Bh5hhgwGvo1HIAA7sgjzLouPG-v6eLBrijb4gAskGu4tsSLYACInrUZ5aBebytO0Xw-N0CDoT4ILjNY4SsmyWm6fp3GGfRJmBkGuItgAGkG6JHk5Qlqi5iFub2l6eTeQ4EXG2BSbmuZ2C6gQOHOMJkDQEBwBoCTwVlok9gAtBYaadT42Z9f10LujkSRnFALUam1SEVaY-R2LmBpRBEQr6mmZoPiKIJ8gYUn6sMWlzAiProJA40RjlVoPhItLWmMJG9Phvm5kYWHXgKII4XoDjUV6B0ynKp2udS4xjg6ubGoY2GmmmoLYLyOjwxhEwDC6BjUbR3HkAD2UNE+qHWOMFildYEh2He4IlXm8bVYCo5o5x4FY5NOWfQRV3EaR+jE-q1rhXpIgGZxRmM2JuPVfNzLWKaUJdb5bLPSRnMGgEhjTLE0RAA */
  context: {
    auth: null,    
    registration: null,
    error: null,
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
          actions: "persistRegistration"
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
      },
      exit: "clearRegistration"
    }
  },
});

export const authService = createActor(authMachine).start();