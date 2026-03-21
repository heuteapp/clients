import { createActor, setup } from "xstate";
import { hydrateAuthActor, hydrateRegistrationActor, signInActor, signUpActor } from "./auth.actors";
import { AuthMachineContext, AuthMachineEvent } from "@/src/types/states/auth/auth.machine";
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
    signUp: signUpActor
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCMWgCwAOU1oDs6gJzqANCACeiawFZr2dSddHrWk-r6rsEAviEOgngExORUgrRgAE6JDInYUgA2yOgAZqkAtlG8AhjC4soycgpKSKoa2roGxmYmljb2Toj6TdhaAGwm6iJagZreFmERpdjIOehJlDwxFNSllIzMtKIStZXyimTKaggWRha6Rn3W+iIm3kHqFg7OCNYWfdhGRq6PIkb9NiMkxAkVm80Si2ipBWgnWTDAW30O2ksn2NVAx1O5z+Vxud1cDyenQQgWsRmwBNabwJ-REA2BkSW0KoiTAUBIsHQiWyB3o8NYZA4XCKxD4rPZnO51TI2wqqOlRy62hE2AsejpImsJls7meXX0Fn02BMFlcen0piCJmGDOmTNilHFHK5PKYCWSqXSWVyBRF-CdktdMvKu3lB0VJOVqvVfU12vUuuJVp01yMBsGvjVfVtWBmcwW9pWAZd0rhm1loaq4dqx30VIpBn0fWbpn+-z1JLrJmwtl8bz6Ixu2fCIOmYILUIdxalBzLCKESLlVfRdRJ9Z+gWbfVbxi0HYtfVc2Cb-z0Wlchtcw6mucEYDIClw2UgtAAygBJADiADkAPoAeQAVQAFQrFFl0OGtEH6Pp1GPIwRAJA0zgQowO1sbtd2MAYhwvIER0iVAyDvB8SCfeYIDfL8-3fb8wJAPYFSghB+gCbBD1jaxU3cRMXnUAZPg3Tc+n0axblcHMcCIkjH2fSiPx-X9AIABXoxjqwxaC+neY0jH4kTAn6PdiTYs0RBxfTbANfRJOwOQoDIB1yCoxTaN-V9AIAYU8gBRV9XzUsMV2OLR-BVTiRmubwtH4jtTA8LRzS0Wwrm0WDbPsxyVmchSaL-AAxABBd8ABlAIAJR8wKIIjULrXYzVIrrVwYr6DtEp0c9zPUb5m0MOl1AykgHIdVApBcv8VN-QqAHViuA2jP2qtFIM0tdkobYTtzMXcOwsUybD+bUYusbSbII6ZMtG8bcqU5TfyK0qKqqkNwJWiM6w2oStx3dtiQGI9XG8bUCT+IYE1s5AAHdkH2FZMsoMaJru39PP-ABZZSSp84CfIAEWWpi1rq8LGtE5rWv3TVyTJH5vAGW5tRMSGYbhqgEaR26pp8gANZT30qgnXoYoLVtXEmGr8cnotipNLBVc99pa7CJOBMgGAgOBlEEJd3uYvg2uJPgjy402zfNwaLtzQs4lKXWidXP6XjeI0TAHRDmxNa4IatnBxwhG3ViwOd7Y01ckM8PT3n+IS3g6Z22MMjURjOWDrFswPpyDUPgpcPTelO7xfCvYJLH3OtyQTJsfEePTTtVm8-fzAPJyLNlnRnJgQ8rPW1qCf52OMPwAmSsSCXL2wGuriwxMMS5099mZSnvWSKJzsWQrNc4o-4xD+i4tDiTeckrh+Y+AjVTVbOk5fSPIyB19qt24KsNN3BECxTjcKmVSGYI-FOAhfa24hojWymLdSucWI3HOASYIA5DwJhNB2HqR5viNlChYRKXhHigKylQMaj9mIng8GJESQNX6akQh2AYOgR6thjh-dKi9oawwUPDYaZBEZSCIcTAam1RJfDjlxQ2LxAimCnhQ+MCY-hhDCEAA */
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
            target: "after checking registration done",
            actions: "setRegistration"
          }
        ],
        onError: { target: "unauthenticated" },
      }
    },
    "after checking registration done": {
      always: [
        { 
          target: "awaiting sign up",
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
          actions: [
            "setAuth",
            "persistAuth",
            "clearRegistration",
            "unsetError"
          ]
        },
        SIGN_UP_EXPIRED: { 
          target: "unauthenticated",
          actions: [
            "setError",
            "clearRegistration"
          ]
        },
      },
      exit: "clearRegistration"
    }
  },
});

export const authService = createActor(authMachine);