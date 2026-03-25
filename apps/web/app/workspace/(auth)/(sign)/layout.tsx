"use client";

import { isSignLocked } from "@/src/authentication/state/auth.machine";
import { HeuteCompactBrand, HeuteFullBrand } from "@/src/ui-shared/components/HeuteBrand";
import { useAuthContext } from "@/src/modules/auth/hooks/useAuthContext";
import { CircularProgress } from "@mui/material";
import { Box, Stack } from "@mui/material";

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
                    px: 4,
                    py: 3
                }}
            >
                <HeuteCompactBrand link={{ href: "/", linkType: "external" }} />
            </Box>
            <Box
                sx={{
                    width: { xs: "100%", lg: "40%" },
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: { xs: "none", lg: 1.5 },
                    borderColor: { lg: "divider" },
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
                        height: "auto",
                        mb: 3,
                    }}
                >
                    <HeuteFullBrand 
                        iconSize={64}
                        textSize={"2.5rem"}
                    />
                </Box>

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