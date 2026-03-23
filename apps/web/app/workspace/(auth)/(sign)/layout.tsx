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
                backgroundColor: "background.default",
                alignItems: "stretch" // This makes children stretch to full height
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", md: "40%" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: { xs: "none", md: "0px 4px 20px rgba(0, 0, 0, 0.1)" },
                    backgroundColor: "background.paper"
                }}
            >
                {children}
            </Box>
            <Box 
                sx={{
                    flex: 1, // This makes it take the remaining space
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "text.secondary",
                    backgroundColor: "background.default",
                    display: { xs: "none", md: "flex" },
                }}
            >
                {new Date().getFullYear()} Heute. All rights reserved.
            </Box>
        </Stack>
    )
}