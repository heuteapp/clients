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
    isUserLoggedIn: () => !!useAuthStore.getState().accessToken
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygGIIB7MsbcgNxqIbSzwOPKgWZq5k6EnQDaABgC6kqYlAAHGrBIi68kAA9EAVgAsAdmwGdEiQCY9EgGwSAnAEY9OgDQgAnonN2AHMb12dtY+DnY61nrmAMwAvjFuHDj4hKQU1HQMAmzYiVwpvPxkLEJqZLJiDnJIIEoqpRraCPpGJmaWNvZOrh5eElHGphIOOj5mUQ4GUbHxILnJPGlgAE5LNEvYCgA2wgBmawC2ORhJ3Kl8AiWiZdKyGrWqVw26hgNtVraOzm6eCOY6Dtg-mZ7DoomFAgYDHEEscjlgwGQRCVIJQAMoASQA4gA5AD6AHkAKoAFVu1Xu9WqjQcFh0xgcPh8Iym3kmBm+uj62Ak+gienG+iioOhs1hqDIiQRSOEKIxONx6OxZMUyge6ipiBpkWw7yiegmYOspiiHIQJjpOl5Vl8zn05hFuXFksRJGREDRWLxhIACsqaqrKaBqX0jDo7FEfFMIzpzGZuj8QjrAoEfM47OZQo4HbCVFAyLwAATkdL0RhFVjsHMkPOF8iFYrCK7laR3AOPDVNF6tCzvTpfHoIALmYx9ezpvneHTZzi5-MUItkSjLVbrLa7A5wnCz2tkeuCRviG4t8lt9VB54tQbtD5dU3WKLWbBRCR6PkOJyObzTrfVudQAuoAoJaZOW2S5Nu86AXulyHjIx4qnU7bnr8GbYNYQIOBmUQGHoTIGD4pr8kY5g+BEloBH03gONY37YBB-6AUuKxrBs2zoHsSyHOBv6FlBFwHtccFVAhapkE8KEAuhpiYQ42G4To+Gmj4kLYKMr5WPhVjjD4tHIAA7sgDzzrOAFAXKXreriADC+IALLegAMgAosSTkACJ+hSSFaBerw9h0nzxogeqPpYgTWKEerpoYukGUZ-4mYx5m4j6uJOQAGt66IAEruZ5p5iR2zR+defZBYO2qxuMtJhNVqZxDMZA0BAcAaIkraIWePkIAAtNYpp9dywLDSNGa0fMZwdaJ4kPnYgJ6tGpGviYeimuY5iPjhyb2AYwwvtMMKcM60roJAU2Bt1ykSNywzWOGejOHq0Smsa2Dkeh1iQhGwwxTMjoSscUqujKEDnd51LrXoOqpoYURUS+5Wkdd21XRIBhBHYUJ-VWNbzuQYNdY0cloeEG0KURkzlRFUPPq+fy8iEOG0fRpkE4VyGRIRNKAktkWjBFD5Y4dOD6YZIjGb+rMnp17PdcT0T8kyS2ffohEPjzEQPrh2GOA4DUxEAA */
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