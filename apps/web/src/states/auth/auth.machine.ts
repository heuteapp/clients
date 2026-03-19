import { assign, setup } from "xstate";
import { hydrateActor, signInActor, signUpActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";

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
    persistAuth: ({ event }) => {
      if (event.type !== "SIGN_IN_SUCCESS" && event.type !== "SIGN_UP_COMPLETED") {
        throw new Error("Invalid event");
      }

      localStorage.setItem("auth", JSON.stringify({
        accessToken: event.accessToken,
        profile: event.profile
      }));

      return assign({
        accessToken: event.accessToken,
        profile: event.profile
      });
    },
    "clearAuth": assign({
      accessToken: () => { localStorage.removeItem("auth"); return null; },
      profile: () => null
    })
  },
  guards: {
    isUserLoggedIn: ({ context }) => !!context.accessToken
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygGIIB7MsbcgNxqIbSzwOPKgWZq5k6EnQDaABgC6kqYlAAHGrBIi68kAA9EAVgAsAdmwG9ATnN6AbAYMAmW5b0AaEAE9Et0wA5jZ819MdUwNLAGYDUIBfSJcOHHxCUgpqOgYBNmw4rkTefjIWITUyWTEARjkkECUVIo1tBH0jE3NTKxt7Rxd3BFsJUOMdCQlSvS9LB1GDHWjYjHjuJKowACdlmmXsBQAbYQAzdYBbTLnsngo8guFRYulZDWrVa7rdQ18WtrsJro8dUuxbQZDSymUqlXrjPQzEBZOJgMgiQqQSgAZQAkgBxAByAH0APIAVQAKndKg9apV6qUJADjKUvBFbAE9BJzKFvg0JHpsDpGqFmV4qYFpjFoSdUGRYfCSIiICiMTjUZiSYplI91BTEFS9LZsMzxizfsyLOypkYJPpLPTDKFvPSoVlxZKEcIkWisdj8QAFZVVVXk0CUvpGILhKmfKk6dkC7lDIa9AytPSlX72k4qKBkXgAAnIcvdiuxyPxAGFiwBRZHIn1kp4ahqvZoWayfTpuRBmHUGPpgyw6UKlUyhHSWVOcdOZig5sh5hU4gBiAEFUQAZfEAJTL1b9tYDLyaflazY6zjbCDClmwoU5wNsV8sw1Ko5w4+zqAUKXojHyrHYaZIGdfBQLkEK5xFuaR7m3dVdx6Ww-nGQEqQkMYDC8AF2T0cJ-jGKwkwcQZvCfbAX0nN9KBWNYNm2PZDmOMd-wnKAszfYDCmuEoINJKCyGeWD4IBIYkJQtDI1PelTEva89FGbV708IjkAAd2QR5J3HZj3zdHEvWxYtcQAWU9Zcy0JMsABEtxqHctD3N4m3aL5Tz5C8BOpBNflCLx+wU5TVKY9SyK0j1PWxMsAA1PVRDcLM4lUrOgmz633d4j0c7ppJ1Xp+1CSwByCLxzRHKEyBoCA4A0OJIPini6wAWksdlap0bAWlatrTEcYVZk4BIzigKq1RqmCcok29MLsTlmUGdDTw6AZYy8MYvD7cwFLmOFnXQSABv9RL6QkbBhmHIcJpy7V2UGZrzSsYJSk8vohyIx11qlGUdusyl7C5GTwjMUpHAHNkxPGXVzDu5DpN7PoiJIpjyHehL6l+7Be3GS0ky7O6+XZXLmoKm6+QkLtMK60V6IA0iFARobEvO08kwOxlHEse8vK8EmfJUkQ1IYjTqd45GxvCXppPNalRPSnLsMcKxfjBAq7uiaIgA */
  context: {
    accessToken: null,    
    profile: null
  },
  id: "auth",
  initial: "checking",
  states: {
    "checking": {
      invoke: {
        src: "hydrate",
        onDone: [
          { target: "authenticated", guard: "isUserLoggedIn" },
          { target: "unauthenticated" },
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