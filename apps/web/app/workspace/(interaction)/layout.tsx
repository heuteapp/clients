'use client';

import { useRef } from "react";
import Box from "@mui/material/Box";
import { BrandIconOnly } from "@/src/ui/components/app/Brand";
import { flex } from "@mui/system";
import { Navbar } from "./navbar";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          bgcolor: "transparent"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            width: 300,
            backgroundColor: "green",
          }}
        >
          {/* do 5 96x96 items */}
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "lightgray",
                margin: 2,
              }}
            />
          ))}
        </Box>        
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}