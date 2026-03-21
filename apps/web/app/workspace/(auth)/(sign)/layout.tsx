"use client";

import { isSignBusy } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const { state } = useAuthContext();

    if (isSignBusy(state)) {
        return <CircularProgress />;
    }

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "100%", width: "100%", backgroundColor: "background.default" }}
        >
            {children}
        </Stack>
    )
}