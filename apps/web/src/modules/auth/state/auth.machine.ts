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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgMabFwGsBLAOygAI0sBiCAezLG3IDcGiX9CiBaGpgDaABgC6iUAAcGsEuhJNJIAB6IAzOoBM2EeoCMWgGz7NAVi0itAFgA0IAJ6J9+6-uwB2fSICc6kfpGvh7W1gC+YfaCeATE5FSCtGAATskMydhSADbI6ABm6QC2MbwCGMLiyjJyCkpIqhraugbGpuoWVnaOiBY+un4hPoFGWmZmHhFR5SVxFJTJYFAksOjJuYpk9Ews7JzcsfwLSytrtWSiEvXV8hvKaggAHD4PnmYielra6n76PvZOCA62BMHlGPhE1iePjMkxA0R4syoR2Wq3WTCSqXSmRy+SKM0OixRpw2FyqshudVA9yeLw8bw+Xx+f26j3c9ICPmeWh8NgeE0icOmgjAZAUuFykFoAGUAJIAcQAcgB9ADyAFUACqkq7ks53RBaGwiYGglyuAIPB5af7OQxGbDPazqB5GMyQswPaxGWHRVBkYWikji9CS2WKpUyhXa6S6271e6Gsx9fR8q2GiFBDw2hD6JO0+lu36fawedQ+6Z+gNiiUQaXy5VqgAK0ZA1z18YNo2s2HUdMhlrM+i8uezLp0dI8D00fLpWkM5aw2DkUDI8Uo5Dr4cjSqlaoAwnuAKJSqUtttxqnOB653RenneKwQkQPbOGKfAvkWfzgnm+Bc4ZdVzmDcw2VbcADEAEEZQAGTVAAlQ8z1jSkGhza8zFvIx73eSxrGfV8nR0N1sLMb4zFdEtwgFaJALXVApE3BtGx3fcjxPZCagvNCaVed4vk+JlsxMdRsHGKxPUHIYTAef8lxIFd6MY0ClSbJUoNghCkMqHUuNQ6lnj4hlBIMZkAWeUS3knLRLR8IxQUhOTkAAd2QG45jYFISDyIM0U2AA1Q94JlcCAE0lUPABZaCYM4ikyH1HNNA8XRJyfF0jGsD0zMQaxoWBFwfFBCFezGGEaKFVz3KoTzkm83yzloQLgrCiLotgpU9xVSLGxgw8NUPAAROL20vJLe1Sh50qMTLsuzJNjRCOcRhm-C3XKqZF1q7yHDXMBCjcrImqCkLwqimLWIPY9Tx0mM9ISjt0JvDMcMffCXxZb57Q8Sj1s9EQTC0OTtryXa5n2w7jpas72pg9SYqGkbuPuUwPGTUZ3js59PizT7OWBD0HgokJ+JMYGvNBvaDpII7mtOtqLsPAANRsZUQ4bbtbFCHrGlNnrvOdcPS7NQhS4wxkyoYSyMdRQnJurQcoWBUFwXA4FgSUkf0g0AdEkRrOeTLSznLoAUsRb6X8T5XE5Cx5Z2ygwBUKQSAWWBaBUFYJWwZA8hDZIAAp2QASloaIQYcR3ndduAtZ5tDDXwk05xcfCUytEWiodLKtA8THwQtcqBTIBgIDgZRBDJe7Er4Ixsz4TDOSb5vm-Ub0KsXBFSDmSvdPixLrGtFkXFGD8QlLESeTsuSu7XZETj8qv+8ewd3Fl3t3rzomXDMeaITEgZDX8LevCc8oRWrEMICX0aE4BlLtFCUw3lzOlX0CUSnTpZ8rH8AJ282jgSs59AzBkgDfZGBo07YHFj4PKQQsoplfO8b668hi9GdH+DuAEFJASoOQCB2scwy3cNCAwFhn5TUnK+MqwJRhtCeL4L0QNsHyUUnMBihD473DzujN4mh8IrVltmLGwJfDfG8JoFw9knJVQUB5CmDVuLniISPY09kUwAy5O0YSFFdDvD0JoGwrpJz20puDamWQuGJUCADbAg8UyhCKu6D6AIsrJjIb2NGedsIyNYRHJWKs1awA1tfPut8Ey62wN4aEIRMrfCtOoEW+9BxjGME6cYZFZL+IppHJ2Ls3bWMepYUsMDZbG1fplIebi7LZzIiIMiHgt58mohEIAA */
  context: {
    auth: null,    
    registration: null,
    error: null,
  },
  id: "auth",
  initial: "hydrating session",
  states: {
    "awaiting session": {
      initial: "hydrating",
      states: {
        "hydrating": {
          invoke: {
            src: "hydrateSession",
          },
          on: {
            SESSION_HYDRATE_SUCCESS: {
            },
            SESSION_HYDRATE_FAILURE: {
            },
            SESSION_REFRESH_REQUEST: {
            }
          }
        }
      }
    }
  },
});

export const authService = createActor(authMachine);