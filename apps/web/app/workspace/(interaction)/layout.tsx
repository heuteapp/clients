'use client';

import { useRef } from "react";
import Box from "@mui/material/Box";
import { BrandIconOnly } from "@/src/ui/components/app/Brand";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box
        component="nav"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "text.primary",
          fontSize: "1.5rem",
        }}
      >
        <BrandIconOnly 
          link={{ href: "/", linkType: "external" }}
          size={28} 
          style={{ padding: 8 }}
        />
        <Box
          component="div"
          sx={{
            fontSize: "1.125rem",
            color: "text.disabled",
            fontWeight: "600",
          }}
        >
          /
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          bgcolor: "transparent"
        }}
      >
      {children}
      </Box>
    </Box>
  )
}