export const hasRegistrationGuard = (): boolean => {
  const registration = localStorage.getItem("registration");
  return !!registration;
};