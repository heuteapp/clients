'use client';

import Box from "@mui/material/Box";

import { WorkspaceDailyboardProvider } from "@/src/modules/workspace-dailyboard/providers/WorkspaceDailyboardProvider";
import { WorkspaceProvider } from "@/src/modules/workspace/providers/WorkspaceProvider";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { WorkspaceBreadcrumbs } from "@/src/modules/workspace/components/WorkspaceBreadcrumbs";
import { Button, Stack } from "@mui/material";
import { useWorkspaceDailyboardContext } from "@/src/modules/workspace-dailyboard/hooks/useWorkspaceDailyboardContext";
import { useState, useEffect } from "react";
import { GridSize } from "@/src/modules/shared/types/common";

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
      case "dailyboard":
        return <WorkspaceDailyboardProvider>{content}</WorkspaceDailyboardProvider>;
      default:
        return content;
    }
  };

  return getWrappedContent();
}

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const context = useWorkspaceContext();
  const { type } = context.metadata;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <LayoutNavbar/>
      <Stack direction="row" sx={{ width: "100%", height: "calc(100dvh - 49px)" }}>
        {isClient && type === "dailyboard" && <LayoutSidebar/>}
        <LayoutMonitor>
          {children}
        </LayoutMonitor>
      </Stack>
    </>
  );
};

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

const LayoutSidebar = () => {
  const { send } = useWorkspaceDailyboardContext();

  const createButton = (cardSize: GridSize) => (
    <Button 
      variant="contained" 
      color="primary" 
      sx={{ m: 1 }} 
      onTouchStart={(e) => {
        send({ type: "CREATE_CARD", cardSize });
      }}
      onMouseDown={() => {
        send({ type: "CREATE_CARD", cardSize });
      }}
    >
      Create {cardSize.colSpan}x{cardSize.rowSpan} Card
    </Button>
  );

  return (
      <Box
          component="aside"
          sx={{
              width: "240px",
              height: "100%",
              borderRight: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.paper"
          }}
      >
        {createButton({ colSpan: 4, rowSpan: 2 })}
        {createButton({ colSpan: 6, rowSpan: 2 })}
        {createButton({ colSpan: 8, rowSpan: 2 })}
        {createButton({ colSpan: 12, rowSpan: 2 })}
        {createButton({ colSpan: 4, rowSpan: 3 })}
        {createButton({ colSpan: 6, rowSpan: 3 })}
        {createButton({ colSpan: 8, rowSpan: 3 })}
        {createButton({ colSpan: 12, rowSpan: 3 })}
        {createButton({ colSpan: 4, rowSpan: 6 })}
        {createButton({ colSpan: 6, rowSpan: 6 })}
        {createButton({ colSpan: 8, rowSpan: 6 })}
        {createButton({ colSpan: 12, rowSpan: 6 })}
      </Box>
  );
}

const LayoutMonitor = ({ children }: { children: React.ReactNode }) => {
  return (
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