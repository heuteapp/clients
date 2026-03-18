import { setup } from "xstate";

export const machine = setup({
  types: {
    context: {} as { profile: { username: string; email: string } | null },
    events: {} as
      | { type: "SIGN_IN"; identifier: string; password: string }
      | { type: "SIGN_UP"; username: string; email: string; password: string },
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
    checking: {
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
    authenticated: {},
    unauthenticated: {},
  },
});