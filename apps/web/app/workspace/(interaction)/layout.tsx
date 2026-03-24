'use client';

import { useRef } from "react";
import Box from "@mui/material/Box";
import { BrandIconOnly } from "@/src/ui/components/app/Brand";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box>
      <Box
        component="nav"
        sx={{
          borderBottom: "1px solid #7f7f7f53",
          width: "100%",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "#FFF",
          fontSize: "1.5rem",
        }}
      >
        <BrandIconOnly 
          link={{ href: "/", linkType: "external" }}
          size={28} 
          style={{ padding: 8 }}
        />
        <div
          style={{
            fontSize: "1.125rem",
            color: "#6c6c6c6d",
            fontWeight: "600",
          }}
        >
          /
        </div>
      </Box>
    </Box>
  )
}