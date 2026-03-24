'use client';

import { useRef } from "react";
import { Box } from "@mui/material";
import { BrandCompact } from "@/src/ui/components/app/Brand";
import { useAuthContext } from "@/src/ui/hooks/states/auth/useAuthContext";
import { isAuthenticated, isUnauthenticated } from "@/src/states/auth/auth.machine";
import { HeuteLink } from "@/src/ui/components/app/HeuteLink";

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
              borderBottom: "1px solid #7f7f7f53",
              width: "100%",
              height: "64px",
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
              <BrandCompact link={{ href: "/", linkType: "internal" }} />
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
                  <HeuteLink href="/workspace/sign-in" className="navbar-link" id={"navbar-link-sign-in"}>
                    Sign In
                  </HeuteLink>
                  <HeuteLink href="/workspace/sign-up" className="navbar-link" id={"navbar-link-sign-up"}>
                    Sign Up
                  </HeuteLink>
                </>
              )}

              {isAuthenticated(state) && (
                <>                
                  <HeuteLink href="/workspace" className="navbar-link" id={"navbar-link-workspace"}>
                    Workspace
                  </HeuteLink>
                  <HeuteLink href="/workspace/profile" className="navbar-link" id={"navbar-link-profile"}>
                    {state.context.auth?.profile.username}
                  </HeuteLink>
                </>
              )}
            </Box>
          </Box>
            {children}
        </div>
    )
}