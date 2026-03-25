"use client";

import { useAuthContext } from "@/src/modules/auth/hooks/useAuthContext";
import { Box, Button, Typography } from "@mui/material";

export default function WorkspacePage() {
    const { send } = useAuthContext();

    return (
        <Box
            sx={{
                height: "60vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 6,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "text.primary", bgcolor: "transparent" }}>
                Welcome to your Workspace
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={() => send({ type: "SIGN_OUT" })}
                sx={{
                    textTransform: "none",
                }}
            >
                Sign Out
            </Button>
        </Box>
    );
}