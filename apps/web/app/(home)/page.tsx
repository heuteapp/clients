"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        color: "#FFF",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 500,
              mb: 1,
            }}
          >
            Daily what you learned
          </Typography>

          <Typography
            variant="h2"
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

        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;