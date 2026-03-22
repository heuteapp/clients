"use client";

import { isVerificationLocked } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { state } = useAuthContext();

  if (isVerificationLocked(state)) {
    return <CircularProgress />;
  }

  return (
    <>
      {children}
    </>
  )
}