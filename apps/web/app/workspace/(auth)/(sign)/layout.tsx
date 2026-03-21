"use client";

import { isSignBusy } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { CircularProgress } from "@mui/material";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const { state } = useAuthContext();

    if (isSignBusy(state)) {
        return <CircularProgress />;
    }

    return (
        <>
            {children}
        </>
    )
}