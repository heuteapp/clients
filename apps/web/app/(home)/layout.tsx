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
            style={{
                borderBottom: "1px solid #eaeaea",
                width: "100%",
                height: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFF",
                fontSize: "1.5rem",
            }}
          >
            <BrandCompact link="/" />
          </Box>
            {children}
        </div>
    )
}