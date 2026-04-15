import { createActor, setup } from "xstate";
import { AuthMachineContext, AuthMachineEvent } from "@/src/modules/auth/types/auth.machine.types";
import { hydrateSessionActor } from "./auth.actors";
import { hasRegistrationGuard } from "./auth.guards";

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
    hasRegistration: hasRegistrationGuard
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgE6QEt8BjdAgOygGIBtABgF1FQAHAe1gLLfOZAA9EARgDsAVmyihADnHSxANgUBmACyqRAGhABPYWIBM2EaoCcpw8rqqDquspEBfR9rRY8hEmUq0hTJCDsnNy8AYIIohJSsmLySmoa2noRptLGZqYK8g6mdAYGYs6uGDjIAO7IXBRQ2LBwnDzYmDoQuMje1ADKAKKdnQCSAPIAcgD6ABIAmgAiAEoAggAq3aOdAKoAwhu9nfT+rBxVPHzhQkJ2xgl0dCJ0KiJKSYgFpsZi1wZCYmbndPJFIDcpQqVUotXqBEazVa7WqVB6fSGYymcyWKwAYvN+gAZNazbp7PhBI6hUCnX6XdTXW73R66RDvITYArXZRfUyqISmZSZAFA7DlSodcGwBrkJotNodeE7JGjfHo-Gdcby7oARTWvUWhICxJCJ0QSiZBgUihsdFS0m5BieCGU0jo2HeH1NIiEShMzhcIHIbAgcD4QKJh31YUQAFoFLbw7ZsNd4wmE+c+SUPBAiGBSNVg8FIaSBIgbLaviJsJyjcpbDchA5lCn3ILQVAcySDXb7dhpKoHFkMrlTVH6QgVGXzJlUgUTSZFPXgULqiKxS3Q2TEPaFJ3uw8u2O7opbSbXmPzCIHjJpNIvrOBSDhXVRXmJTCOsu823u6pNz2d+Y94PksoYils61hspyHIiNICjXo2d4Qo0+AAGb4LAmDZrqIZvmGCAckYBj2Oc0j2lapi2La9pMgmJpAe6Ciet6-KwQu+BQAQsDoFKWEHLmxzYXYn5dt+fZ-sW7zYMePKmnQYhqByMElGA5BkMQ7SQK+vGrsOWhDpen4JsoRp0fhhQMamqDkECinKapEDqfm4RAbashGCBkEliI3J1l6QA */
  context: {
    auth: null,    
    registration: null,
    error: null,
  },
  id: "auth",
  initial: "redirecting",
  states: {
    "redirecting": {
      always: [
        {
          guard: "hasRegistration",
          target: "awaiting.registration"
        },
        {
          target: "awaiting.session"
        }
      ]
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