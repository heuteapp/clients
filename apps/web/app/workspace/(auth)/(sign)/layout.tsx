"use client";

import { isSignLocked } from "@/src/states/auth/auth.machine";
import { Favicon } from "@/src/ui/assets/Favicon";
import { BrandCompact, BrandFull } from "@/src/ui/components/app/Brand";
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
                alignItems: "stretch",
                color: "text.primary",
            }}
        >
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    padding: 2
                }}
            >
                <BrandCompact />
            </Box>
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
                    display: { xs: "none", lg: "flex" },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "background.default",
                    userSelect: "none",
                    px: 4,
                }}
                >

                <Box
                    sx={{
                        width: 150,
                        height: "auto",
                        mb: 3,
                    }}
                >
                    <BrandFull 
                        iconSize={64} 
                        iconStyle={{
                            padding: 6
                        }}
                        textSize={"2.5rem"}
                    />
                </Box>

                {/* Slogan */}
                <Box
                    sx={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "text.primary",
                    }}
                >
                    Daily Learning Journey
                </Box>
            </Box>
        </Stack>
    )
}