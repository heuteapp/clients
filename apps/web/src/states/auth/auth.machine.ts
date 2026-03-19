import { setup } from "xstate";
import { hydrateActor, signInActor, signUpActor } from "./auth.actors";
import { useAuthStore } from "@/src/stores/auth.store";
import { ProfileData } from "@/src/core/types/domain/profile/profile.data";

export const machine = setup({
  types: {
    events: {} as
      | { type: "SIGN_IN"; identifier: string; password: string }
      | { type: "SIGN_UP"; username: string; email: string; password: string }
      | { type: "SIGN_UP_COMPLETED", accessToken: string, profile: ProfileData }
      | { type: "SIGN_UP_EXPIRED" }
      | { type: "SIGN_OUT" }

  },
  actors: {
    hydrate: hydrateActor,
    signIn: signInActor,
    signUp: signUpActor
  },
  guards: {
    isUserLoggedIn: ({ context }) => {
      return context.profile !== null;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygGIIB7MsbcgNxqIbSzwOPKgWZq5k6EnQDaABgC6kqYlAAHGrBIi68kAA9EAJh0TsAVgCMhgGw6ALGYmWAHAHY7lywBoQAT0QBmM5ewOlgCcQXbGQTp2QcbGAL6x7hw4+ISkFNR0DAJs2Elcqbz8ZCxCamSyYsZySCBKKmUa2gh6BibmVjb2Ti7uXgguhthWIZESIxKGvvGJGMncaVRgAE5LNEvYCgA2wgBmawC2ubP5PBRFJcKi5dKyGnWqV426+kamFta2js5unojBOgFgqEJL5ot4dEFpiA8kkwGQRKVIJQAMoASQA4gA5AD6AHkAKoAFVuNXuDRqTT8ZiMFhM3kMEhBlkCvR8emwIU5DjMZmMYzsdjMULyqDIsPhJEREBRGJxqMxJMUyge6gpiB53iGDIkOm8OvshkshlZCDCRkZFot3MMQQcwuOKigZF4AAJyBl6Ixiqx2A6SE7XeRzoJLuIbtI7sryaAmi1Xu0Pl1vibvMYHEMgQ4JIF3jZDPbOI7nRQ3WRKMtVustrsDkdC-7i1BS8HSlcKhHSVHHmrmi82rnPt0fn19JqHNrjDped5vLa7VCyDQIHANElI-VuzHEABaMwm3cFuYFCjrlVkJ79HQmywvQIhVM6cI6Bx6Q91ggSqWn6NaP5BAx2Da3gOEEwFps+44prq2BAnOMQ5uO+YJNCxyiuKCLCJA36br+pqmNg4J2I+D7cuE3gmqE2DGDyZg2iCQQ0fYb5FoG56dhuqpbv06Y3sYjg8hIMR8hIe6-AgabUneIQmFEdgzo+8TxEAA */
  context: {
    profile: null,
  },
  id: "auth",
  initial: "checking",
  states: {
    "checking": {
      invoke: {
        src: "hydrate",
        onDone: [
          { target: "authenticated", guard: () => !!useAuthStore.getState().accessToken },
          { target: "unauthenticated" },
        ],
        onError: { target: "unauthenticated" },
      }
    },
    "authenticated": {
      on: {
        SIGN_OUT: {
          target: "unauthenticated",
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
        },
        onDone: {
          target: "authenticated",
          actions: ({ event }) => {
            const { accessToken, profile } = event.output;
            useAuthStore.getState().signIn(accessToken, profile);
          }
        },
        onError: {
          target: "unauthenticated",
        },
      },
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
          actions: ({ event }) => 
            useAuthStore.getState().signIn(event.accessToken, event.profile)
        },
        SIGN_UP_EXPIRED: { target: "unauthenticated" },
      }
    }
  },
});