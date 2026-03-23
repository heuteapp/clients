"use client";

import { isSignLocked } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { CircularProgress } from "@mui/material";
import { Box, Stack } from "@mui/system";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const { state } = useAuthContext();

    if (isSignLocked(state)) {
        return (
            <Stack direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: "100%", width: "100%", backgroundColor: "background.default" }}>
                <CircularProgress />
            </Stack>
        )
    }

    return (
        <Stack 
            direction="row" 
            sx={{ 
                height: "100%", 
                width: "100%", 
                minWidth: "min-content",
                alignItems: "stretch"
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", lg: "40%" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {children}
            </Box>
            <Box 
                sx={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "text.secondary",
                    backgroundColor: "background.default",
                    display: { xs: "none", lg: "flex" },
                }}
            >
                {new Date().getFullYear()} Heute. All rights reserved.
            </Box>
        </Stack>
    )
}