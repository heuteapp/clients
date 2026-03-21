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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCMWrQFYAnADYj+8yIDsAGhABPRLZEAObO8MAWEXtN1PyMAXxDHQTwCYnIqQVowACdEhkTsKQAbZHQAM1SAWyjeAQxhcWUZOQUlJFUNbV0DIzNLLWs7RxcEd2NzbB9jXq1Ta2DbfTCI0uxkHPQkyh4YimpSykZmWlEJWsr5RTJlNQRbH1tdH3N3P0H3Uz13TsRjO69DTQ9jLVsDW0mQSKzeaJRbRUgrQTrJhgLb6HbSWT7GqgY6nc4iS7XES3e7qR7OVx47BuXq2MynYzjLT-SJLcFURJgKAkWDoRLZA70aGsMgcLhFYh8RnM1ns6pkbYVRHio6IfTaUzYNruWxafx4tzWJ7dBp3Sk+dQvcZkmnTOmxSjCllsjlMBLJVLpLK5AoC-hW0W2iXlXbSg6yhDy4ZK-QqtUPTXmbUU4nmQY+LTmGwiZWmrAzUpgMgKXDZSC0ADKAEkAOIAOQA+gB5ACqABVJb6qv7asc2jZicZ1cM8XYftrBvpsDYRqZevoRPdTNTwgDpqgyIIszm8xBC6XK0Wy42Ec3kXUEG1bIrE5TDIMu-2CYezsS9CJ9MYfAbtEE-rPIgul9mSLn5mvi3LCsawABR3EA9hlVtECPHx+mMbQXh8McUO1fR0M8LtjAnDx3BMA1jDTHA5CgMgLXIdcgK3CsCxrABhOiAFECwLcDIJbFE5VsWxPGVPD3HMQItGfLRtXUK54PUFN7m8dRTGnIjsBIsiVgowDN0rAAxABBIsABkawAJUYti-X3Y59G43jQ34wTtBE7VvH6eT5JsfR7nDQiP2mZSLVQKRKMrUCK20gB1XS6y3EtTL3Q5oMDBUQzDdUVQfKNr2nYwvB8dwBITL59By8xFN8lZ-MC4CQIrHT9KMkyfV3JE4s4hLg2VVUUsjNCtDkpVBknNyE0srypnTZAAHdkH2FZlMocr1Mqis6KrABZEC9MYutGIAERipqA0sniktsoSHOvASsofQZEzsdQeNsYrvLGybpqoWb5o3RbGIADRAotjN2hqILM5qD0O6zcq0ATToTbULBEbALAunjxNMB71DCWcyAYCA4GUQQpVigM+HSro+CylzKapsd31GnBzQhUpCf2+LYfOyy7yGO7cq+HxFKBBYGbiNYNjAZmoJa7ChyCO6esMPDJ30aMpOwBC7mNcwpMfEa53TIXLSZa0xQ44Gifi0wfCHbxhOGQJsXuBx2b6MNX0NJ8bB1wFMx-P9IHFk2238S7LlMbxH2PB8fAHXLdEsbQTGGOw9EUr9vZXf9-fMmDtGlg1cuxQ1DUTaNn1jQY7vQxXLZKkhSPI0H2KzwMzCy887DOSzsUdrpZd0OxzATdwrr8CYnuI2uVKofzM9Biz5UVMxufdxXu7ldtsENJN3Du8wJx6Pmx5mF6FBmie5qkGeDsHbBCpEONEzJBM8ThnriVDTXNELnjHrCIA */
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
            target: "after checking auth done",
            actions: "setAuth"
          }
        ],
        onError: { target: "checking registration" },
      }
    },
    "after checking auth done": {
      always: [
        { 
          target: "authenticated",
          guard: "isUserLoggedIn"
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