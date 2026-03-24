"use client";

import { isVerificationLocked } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { state } = useAuthContext();

  if (isVerificationLocked(state)) {
    return <CircularProgress />;
  }

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100%", width: "100%", bgcolor: "background.default" }}>
      {children}
    </Stack>
  )
}