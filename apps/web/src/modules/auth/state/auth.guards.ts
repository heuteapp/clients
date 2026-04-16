export const hasRegistrationGuard = (): boolean => {
  const registration = localStorage.getItem("registration");
  return !!registration;
};

export const hasSessionGuard = (): boolean => {
  const session = localStorage.getItem("session");
  return !!session;
};