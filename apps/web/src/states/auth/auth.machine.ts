import { createActor, setup } from "xstate";
import { hydrateActor, signInActor, signUpActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
import { clearAuthAction, clearRegistrationAction, persistAuthAction, persistRegistrationAction, setAuthAction, unsetAuthAction } from "./auth.actions";

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
    setAuth: setAuthAction,
    unsetAuth: unsetAuthAction,
    persistAuth: persistAuthAction,
    clearAuth: clearAuthAction,
    persistRegistration: persistRegistrationAction,
    clearRegistration: clearRegistrationAction
  },
  guards: {
    isUserLoggedIn: ({ context }) => !!context.auth
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygGIIB7MsbcgNxqIf0KIFpMBPCAE7J0JOgG0ADAF1EoAA41YJEXVkgAHogDMO7ABYAnEa0B2CQEYATOZOWANCF6JrANmwAOAKwuTW93s8Jdy0XCUsAX3CHNCw8AmJyKjABARoBbDkAG2EAMzSAWzjOHn4hFTJJGSQQBSVytU0EHS19IwNTC2tbBycEd3NsQIlhlz0TFwMJca1I6IwcDgSKAAJkHPRk5b5BYVEySkq1WuU9hsQTEz1sS6NzF3cLiT1zcx7nPTcbg0utYb0tb6zEAxBbxUgrNYbARbUq7OgHcxVeSKE6qaqNC5XL53B5mZ6vRzOYbXIZPcwGdyWawzKLA+bYEFgMgiXDCSCUADKAEkAOIAOQA+gB5ACqABVDtVjvV0YgXhdsJZ+uZDFpzJ4lXo9G8EC4Qtg-CYDJ4Xi5yeMXECQdhUGRGcySKyNhBObzBVy+ZLkXVTrKEC9jdcDPdTHpLN5PMadcGJEGw1MtJYLEZLbTrbb7Sy2S7ufyBSKAApemoomWgRoB2MUsP9X5aTy-eyEpruWMSSPBEJmhMRNP0pRQMiJZbkV15j0CjkigDC04AohyOcXpb7y+dLtdDAYcY98TrRiZFS5LMb-sN23p3Fb+yRB8PR7n3YKAGIAQS5ABkRQAlOfL0urho65YluO54i8Or+G2WpdJSMbBtesQDkOKyoHI1B0AwzCsAw1rIcOaEINhTp7JU-4+mia5NLoW7tGYVg2E2vTeAMSqjBIExqiaNJzEht4oVAyxoZQySpOkWS5AUDI3neqFyERZAsCR4jSORqJkGc1EtLRHQMd0zbmEELRPM87heK2HHHohODIAA7sgJwrMhQnoY++YFgK05CgAsgWH5zmKc4ACJqWWQEIJim63Pcu4Qc2QweBIFJcVqWqjNZDL2Y5gnOcJbmFgKc4ABoFlyv4hdIRwAZR4WRdiMXgQSzHBtcx7fA25hmZcJiRLSZA0BAcBqCCVUURpfpcC4OpcJ42BtPNC0UqmvGgpwiSjepmlhjqSaxp2mr-AELieJeGWLOCgmQps2xlIBK41Y0J0tJ1lyWMdzwGEmU3NpYfiDMEb3kvW24PBlmaOtmG1hRWYQDJ4JitqYJg2Im23Nj4lgeM8UwnqM7SdRlGbzEyWbOlDgEVkjHg3CaKomrY329IZLhuL97h6gEQTI+lfZ8bJgnkOTD2IKEAzHWaZhKg2-yeJB5KDDBv0hgEBgZfhclC+NVHqi0DyGP8fgs5SDY6p48PYJ0wbVuqFxXrzNlZSITn8S5muaSdBiDIZHTvSqJ6m5GXsnuzx7I1q5i9eEQA */
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
        id: "check-hydration",
        onDone: [
          {
            target: "checking after hydration",
            actions: "setAuth"
          }
        ],
        onError: { target: "unauthenticated" },
      }
    },
    "checking after hydration": {
      always: [
        {
          target: "authenticated",
          guard: "isUserLoggedIn"
        },
        {
          target: "unauthenticated"
        }
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
            "persistAuth"
          ]
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

export const authService = createActor(authMachine);