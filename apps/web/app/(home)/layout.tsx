'use client';

import { useRef } from "react";
import { Box } from "@mui/material";
import { BrandCompact } from "@/src/ui/components/app/Brand";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { isUnauthenticated } from "@/src/states/auth/auth.machine";
import Link from "next/link";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { state } = useAuthContext();

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
                justifyContent: "flex-end",
              }}
            >
              {isUnauthenticated(state) && (
                <>
                  <Link href="/workspace/sign-in" id={"link-sign-in"}>
                    Sign In
                  </Link>
                  <Link href="/workspace/sign-up" id={"link-sign-up"}>
                    Sign Up
                  </Link>
                </>
              )}
            </Box>
          </Box>
            {children}
        </div>
    )
}