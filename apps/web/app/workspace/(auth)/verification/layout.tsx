"use client";

import { isVerificationBusy } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { state } = useAuthContext();

  if (isVerificationBusy(state)) {
    return <CircularProgress />;
  }

  return (
    <>
      {children}
    </>
  )
}