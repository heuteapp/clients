"use client";

import { isAuthenticated, isUnauthenticated } from "@/src/states/auth/auth.machine";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { state } = useAuthContext();
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 500,
              mb: 1,
            }}
          >
            Daily what you learned
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 500,
              mb: 1,
            }}
          >
            Yours to keep
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            opacity: 0.7,
            mb: 8,
          }}
        >
          HeuteApp is a digital journal for your daily learning journey. Capture, reflect, and grow with your personal learning log.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="primary" onClick={() => {
            if(isAuthenticated(state)) {
              window.location.href = "/workspace";
            }
            else if(isUnauthenticated(state)) {
              window.location.href = "/workspace/sign-in";
            }
          }}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary" onClick={() => router.push("/")}>
            Learn More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;