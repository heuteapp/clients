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
    unsetError: unsetErrorAction,
  },
  guards: {
    isAuthenticated: ({ context }) => !!context.auth,
    isRegistrationAwaiting: ({ context }) => !!context.registration
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCM2gCwAOAOwA2IwE4L+swBoQAT0T6967Ootb32rSIiZiYAviFOgngExORUgrRgAE6JDInYUgA2yOgAZqkAtlG8AhjC4soycgpKSKoa2roGxuZWtvZOrgj6Rkb62PrdZlqadgCso9phEaXYyDnoSdSllDzEkLSiErWV8opkymoIZiI6WiaGJpf6Fuqmox1uIqMi2Ea+1tZnT6NnoeEgkTmC0SSywK2iXAgG30W2ksl2NVAh2Op3O6ku5xudweXW0nm8RjME1GJiMIkuWimAJmq1IFEoiTAUBIsHQiWye3oTBY7E43AhfEZzNZ7OqZE2FXhYoObi0ROw1nUlnGJnUIh8+i0OMMgWwQ26tiewRMIiMVMitNiDKZLLZHKYCWSqXSWVyBSKxEFNpF9vF5W2Ur2Mq6ctGCqVFhVao1WpcbjsFmwPksJh+vnVIn05pmQMWQttor24N46wlAaqQdqh3sZN0gX0tmew1GwW1BjMevOvRMFgs1iMfdG2aws3mee9drFxbWUKEMMlFcRdS6ZlrgUzjZO6hbJm1NhM2HMZjM+lGPW31h+w5wgjAZAUuGy6wAygBJADiADkAPoAeQAqgAKmWcKLvsVYaOSRh1nodimg2-ZGDikaJsEhj2FoPzfEO-yRKgZC3veJCPgsUJvl+36vp+IEgDs0oQQgBgnNgoyntYlhElYp44qxfSfOxZzuJYfYDte2D4YRD5PmRH4-v+AAKNF0ZWSKQexep6AOQTkhYlz3HGCDnCx64GJ8xgDJSuEzHIUBkFa5C0ORP5Ud+z7-gAwu5ACiz7PkpgZLocWhWAeSpnu4RijDcfbIQ0FhmOxPy9kM5I4dMI42XZ9IOU5lE-gAYgAgq+AAy-4AEpef5YHBsFpheESvSmlF3jWDitxhkMvamFo1ipoEZpWRlJC2VaqBSI5snfgprked5vnVQi4GqSua71puzatgZAy6QqWgBJh5zHpZ6U4JlY0TblM1FaVFVVf6oFLcGNYvOuDaRluO44gd2CYYEUU9cEmZmGJyAAO7ILs9JsEkJA5MRvq0AAal55WvvlACa35eQAssVJWLfRK2+CarzqgD4xkjY+mdJqfUscEmhnlFZy3KDENQ1QMOJHDCNisjqPo1juP49+7m-jj8klV5gFeQAIoTKnLiTLxkihkVnqal44seianj4kb7Ru8VidzcPOFaYD5JDGQC2jmPY3jpWzZ5Pl+Q9tEBctyshQ14XNdFbXbftHaZqSmFKtYRqm7DOQW-SVs23bQuO6LN3SwrHvKYFiD7ftrzEr08WjJeNOysxPisaxJhaKYRjqDHPNx5b1skLbKP28LTsldjAAa8mvpVmewp7NUMXVoWNRFLUxcHx4sfoqqXs2ZJyo35uULAqC4LgcCwKWWde7VUeJmrNyBJY2hl10eh9IEcqZtonzuFmQ04GbceUGAKhSCQjKwLQFQrInyjmBAACmeIEAAlLQSIH9nBfx-n-OAisc6MSgjBbwEUEI9DbGcfofU9DPEil1BuVIyAMAgHAZQggFxPQYnwCwOJGFiUtPSWh5Z6ErTeNqZqh50S6UuPXLqaVqQjlzCCQQ05IR0KJsuXiXh66pjsDYQIqp1C8PGLoS4KIJgh0MKwiEVp8w+jkdnb2hwTD0wmIYIk9h1B9V7G2QwBCTSYnOD8cwoMxwghMZOIstJICyKVtWGwHZUyXiGP2HUmE8E6B6CaIklMHFPFBqUO8UlSLBLQb1dwSYfhDGPG8U8tdkKKl+rcSKvYzgfD7GJCS6SiIkSCZwuRhxtCkhYtE+wukS4Dmvu4F4aooqnnRJfdUr9TrYHOtlb25jaqEjDIJLEHxFmmBxKYA8-FGqrl8AYP4UyZlUHGtkixbgopDKJCIT4Vgzw2A0dtD4rxhLPCVLcYYIM36zA5goaGsc+ZK3mQxBsq4YLXHMOedZwdMKHlYvFRCjYDliPfrHeOVBE5t1OQsmwepiHDEXghYK2oSa-V0uiJKhoBjr0-lvHee8WmPTabnE+rwlQRJLl8S4xLbh6jJcXQwvVJhfPgYg3+-8sXj2sNcFiPgewpUsHoPBHYGwmnii-Mw6JBphCAA */
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
          target: "verify expires",
          actions: [
            "setError",
            "unsetRegistration",
            "clearRegistration"
          ]
        },
      },
    },

    "verify successed": {
        always: {
          actions: [
            "setAuth",
            "persistAuth",
            "unsetRegistration",
            "clearRegistration",
            "unsetError"
          ]
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

export const isCheckingAuth = (state: AuthMachineState) => state.matches("checking auth");

export const isCheckingRegistration = (state: AuthMachineState) => state.matches("checking registration");

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