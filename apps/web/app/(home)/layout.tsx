'use client';

import { useRef } from "react";
import { Box } from "@mui/material";
import { BrandCompact } from "@/src/ui/components/app/Brand";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={rootRef}>
          <Box 
            component="nav"    
            sx={{
              borderBottom: "1px solid #eaeaea",
              width: "100%",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              color: "#FFF",
              fontSize: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "30%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <BrandCompact link="/" />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "20%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
            </Box>
          </Box>
            {children}
        </div>
    )
}