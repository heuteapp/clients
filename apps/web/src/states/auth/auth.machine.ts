import { setup, fromPromise } from "xstate";

export const machine = setup({
  types: {
    context: {} as { profile: { username: string; email: string } | null },
    events: {} as
      | { type: "SIGN_IN"; identifier: string; password: string }
      | { type: "SIGN_UP"; username: string; email: string; password: string }
      | { type: "SIGN_OUT" },
  },
  actors: {
    signIn: fromPromise(async () => {
      // ...
    }),
  },
  guards: {
    isUserLoggedIn: ({ context }) => {
      return context.profile !== null;
    },
  },
}).createMachine({
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
        input: {},
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