import { createActor, setup } from "xstate";
import { AuthMachineContext, AuthMachineEvent } from "@/src/modules/auth/types/auth.machine.types";
import { hydrateSessionActor } from "./auth.actors";

export const authMachine = setup({
  types: {
    context: {} as AuthMachineContext,
    events: {} as AuthMachineEvent,

  },
  actors: {
    hydrateSession: hydrateSessionActor
  },
  actions: {

  },
  guards: {
    isAuthenticated: ({ context }) => !!context.auth,
    isRegistrationAwaiting: ({ context }) => !!context.registration
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOmQd2QEt1CA7KbWOWQge1O0wE8IAnZE8gYgGUBRHjwCSAeQByAfQASATQAiAJQCCAFT4SeAVQDC2gTwDaABgC6iUAAdaNEvXMgAHogAcAViPZnAdncBmI85GAJwATEa+vgA0IEyIvgAsAIzYIe4BQa4hvkHxRiEAvvnRaFi4BMRkFFSwNPSMLOycULz6opKyiqrqAGJKQgAymgp8xmZIIFY2dKT2TgiJedhGyyurK4nRsQgh8c7YaUYAbF7+h4eJF76FxRg4+ERNlNTT9WwclS2CbRLD3cM8Uh+fAAipoBCpRvZJhU7OM5r4vMlcodUidXIcjK5fK5NogQmF9itsq5XEE8s5nFdriBSLQIHB7CVMFDrDCZnDEABaJLYIJ8-kC-nOQ64hDc5KCyX86lM7CsSCEeUAYyaLKmsNAc3iIVF8UOQUJyxRQWcIVNiSpN1K9wq5DVbNmiEOSzWrqMiXiutc2HiAqy6RCfNc8RltzKD0qTxq03ttnZmsQwZdbtWHtFFt8yfdpIiQS8OVD1vKj2qtQYzDeqvG0LjjvmWR9oUSpoSZqMXi8ov88WTCz1RiSOWchbuxcjpZe8oAZvLYJhKrGYxyEIdMtgEgjXF5zs5m4kRTE8SFkqtiaTycKR7hbmBSCQlRxIIuNY5E53DwgvIHe8s27lfYUhRAA */
  context: {
    auth: null,    
    registration: null,
    error: null,
  },
  id: "auth",
  initial: "redirecting",
  states: {
    "redirecting": {

    },
    "awaiting": {
      states: {
        "session": {
          initial: "hydrating",
          states: {
            "hydrating": {
              invoke: {
                src: "hydrateSession",
              },
              on: {
                SESSION_HYDRATE_SUCCESS: {
                  target: "#auth.authenticated",
                },
                SESSION_HYDRATE_FAILURE: {
                  target: "#auth.unauthenticated",
                },
                SESSION_REFRESH_REQUEST: {
                  target: "refreshing",
                }
              }
            },
            "refreshing": {

            }
          }
        },
        "registration": {
        }
      }
    },
    "authenticated": {
    },
    "unauthenticated": {
    }
  },
});

export const authService = createActor(authMachine);