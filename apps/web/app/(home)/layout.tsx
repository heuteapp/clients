'use client';

import { useRef } from "react";
import { Box } from "@mui/material";
import { HeuteCompactBrand } from "@/src/modules/ui-shared/components/HeuteBrand";
import { useAuthContext } from "@/src/modules/ui-auth/hooks/useAuthContext";
import { isAuthenticated, isUnauthenticated } from "@/src/modules/auth/state/auth.machine";
import { HeuteLink } from "@/src/modules/ui-shared/components/HeuteLink";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { state } = useAuthContext();

    return (
        <Box ref={rootRef}
        sx={{
            bgcolor: 'background.default',
            minHeight: '100vh',
          }}
        >
          <Box 
            component="nav"    
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              width: "100%",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              color: 'text.primary',
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
              <HeuteCompactBrand link={{ href: "/", linkType: "internal" }} />
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
                  <HeuteLink href="/workspace/sign-in" linkType="external" className="navbar-link" id={"navbar-link-sign-in"}>
                    Sign In
                  </HeuteLink>
                  <HeuteLink href="/workspace/sign-up" linkType="external" className="navbar-link" id={"navbar-link-sign-up"}>
                    Sign Up
                  </HeuteLink>
                </>
              )}

              {isAuthenticated(state) && (
                <>                
                  <HeuteLink href="/workspace/board" linkType="external" className="navbar-link" id={"navbar-link-workspace"}>
                    Workspace
                  </HeuteLink>
                  <HeuteLink href="/workspace/profile" linkType="external" className="navbar-link" id={"navbar-link-profile"}>
                    {state.context.auth?.profile.username}
                  </HeuteLink>
                </>
              )}
            </Box>
          </Box>
            {children}
        </Box>
    )
}