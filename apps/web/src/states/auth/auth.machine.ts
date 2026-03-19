import { ProfileData } from "@/src/core/types/domain/profile/profile.data";
import { setup } from "xstate";
import { signInActor, signUpActor } from "./auth.actors";

export const machine = setup({
  types: {
    context: {} as { profile: ProfileData | null },
    events: {} as
      | { type: "SIGN_IN"; identifier: string; password: string }
      | { type: "SIGN_UP"; username: string; email: string; password: string }
      | { type: "SIGN_OUT" },
  },
  actors: {
    signIn: signInActor,
    signUp: signUpActor
  },
  guards: {
    isUserLoggedIn: ({ context }) => {
      return context.profile !== null;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygGIBtABgF1FQAHAe1hPRNbKZAA9EAJgCMAVmy0AnAGYA7ABY5cgBxzaCpSoA0IAJ6IZModjG1zShVOsiZANjEBfR7rRY8BYuSrURjJCBsHFw8fIIIohLS8kqq6pqqugYImnaS5rRiUgpCtCoyCg7Orhg4bgRkXLjI6JCUAMoAkgDiAHIA+gDyAKoAKnT+LOyc3LwB4WIOpnZCVjJSYmIK4jJJhkIy6RkicnYqViJ2CsUg5dioZOVglSTVtRANLR2NrQN8QSOh44hiKiaz1jkkw2QjE8zWCBUIlMGVoe3UUhmMicLlOpWwHCgZG8AAJyJQIDwwNhyAA3VhEYlnTHYih4sgIMmsO6jAZvAIfEJjUDhSKSWSKZRqDRaCFCFRRDJSXJ5X75E7UkhY3H4sAAJzVrDV2GYABsagAzLUAW2wiuVdPIjLI5JZPDZDHewy5YWE4n5MSF8VF+mEtE2QPMs1oQnFQikmWcqLIrAgcD45SdwVGroQAFo7BCM1tYbn-YsFej8IRSBQk59uQJECoVB7FHYZCJQSJNGIIQp5Nh8gVaOJpHJZsdUWcrjc7pByy7vilpF2ssi4XYpDsIcZNmZtrt9su5IX3BdR1UahOOc6U9OBwpsMYoTshHYRCoI23fSljNgZeYn6IRTI9zgaRVStOXPHlEByCEdjSQMgybeInyjRwgA */
  context: {
    profile: null,
  },
  id: "auth",
  initial: "checking",
  states: {
    "checking": {
      always: [
        {
          target: "authenticated",
          guard: {
            type: "isUserLoggedIn",
          },
        },
        {
          target: "unauthenticated",
        },
      ],
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
      },
    },
    "signing in": {
      invoke: {
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
        },
        onError: {
          target: "unauthenticated",
        },
        src: "signIn",
      },
    },
  },
});