'use client';

import Box from "@mui/material/Box";

import { WorkspaceBoardProvider } from "@/src/modules/workspace-board/providers/WorkspaceBoardProvider";
import { WorkspaceProvider } from "@/src/modules/workspace/providers/WorkspaceProvider";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceBreadcrumbs } from "@/src/modules/workspace/components/WorkspaceBreadcrumbs";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: "background.paper",
      }}
    >
      <WorkspaceProvider>
        <LayoutContainer>{children}</LayoutContainer>
      </WorkspaceProvider>
    </Box>
  )
}

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const context = useWorkspaceContext();
  const { type } = context.metadata;

  const content = <LayoutContent>{children}</LayoutContent>;

  const getWrappedContent = () => {
    switch (type) {
      case "board":
        return <WorkspaceBoardProvider>{content}</WorkspaceBoardProvider>;
      default:
        return content;
    }
  };

  return getWrappedContent();
}

const LayoutContent = ({ children }: { children: React.ReactNode }) => (
  <>
    <LayoutNavbar/>
    <LayoutMonitor>
      {children}
    </LayoutMonitor>
  </>
);

//

const LayoutNavbar = () => {
    return (
        <Box
            component="nav"
            sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "text.primary",
            fontSize: "1.5rem",
            }}
        >
          <WorkspaceBreadcrumbs />
          <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pr: 1,
            }}
          >
          </Box>
        </Box>
    )
};

const LayoutMonitor = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
        sx={{
            width: "100%",
            height: "calc(100dvh - 49px)",
            display: "flex",
            flexDirection: "row",
            bgcolor: "transparent"
        }}
    >
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
  );
}