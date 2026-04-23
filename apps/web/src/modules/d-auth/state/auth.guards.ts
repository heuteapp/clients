import { AuthMachineContext } from "../types/auth.machine.types";

export const hasRegistrationGuard = ({ context }: { context: AuthMachineContext }): boolean => {
  return !!context.registration;
};

export const hasSessionGuard = ({ context }: { context: AuthMachineContext }): boolean => {
  return !!context.session;
};