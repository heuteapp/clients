"use client";

import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { Box, Button, Typography } from "@mui/material";

export default function WorkspacePage() {
    const { send } = useAuthContext();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 6,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}>
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