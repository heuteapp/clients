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

import { Slider, Typography } from "@mui/material";

const LayoutSidebar = () => {
  const { send } = useWorkspaceDailyboardContext();
  const [colSpan, setColSpan] = useState(12);
  const [rowSpan, setRowSpan] = useState(3);

  const handleCreate = () => {
    send({ type: "CARD_CREATE_REQUESTED", cardSize: { colSpan, rowSpan } });
  };

  const handleQuickCreate = (col: number, row: number) => {
    send({ type: "CARD_CREATE_REQUESTED", cardSize: { colSpan: col, rowSpan: row } });
  };

  const quickSizes = [
    { col: 4, row: 3 },
    { col: 8, row: 3 },
    { col: 12, row: 3 },
    { col: 24, row: 3 },
    { col: 4, row: 6 },
    { col: 8, row: 6 },
    { col: 12, row: 6 },
    { col: 24, row: 6 },
  ];

  const firstRow = quickSizes.slice(0, 4);
  const secondRow = quickSizes.slice(4, 8);

  return (
    <Box
      component="aside"
      sx={{
        width: 240,
        height: "100%",
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "white", fontSize: "1.2rem", fontWeight: 500 }}
      >
        Kart Boyutu Seç
      </Typography>

      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", fontSize: "1rem", display: "block", mb: 0.5 }}
        >
          Sütun Genişliği (colSpan): {colSpan}
        </Typography>
        <Slider
          value={colSpan}
          min={3}
          max={24}
          step={1}
          onChange={(_, val) => setColSpan(val as number)}
          valueLabelDisplay="auto"
          sx={{ color: "primary.main" }} // slider rengi temadan alınır, beyaz metinle uyumlu
        />
      </Box>

      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", fontSize: "1rem", display: "block", mb: 0.5 }}
        >
          Satır Yüksekliği (rowSpan): {rowSpan}
        </Typography>
        <Slider
          value={rowSpan}
          min={2}
          max={6}
          step={1}
          onChange={(_, val) => setRowSpan(val as number)}
          valueLabelDisplay="auto"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onTouchStart={handleCreate}
        onMouseDown={handleCreate}
        sx={{ mt: 1, color: "white", fontSize: "1rem" }}
      >
        Create {colSpan}x{rowSpan} Card
      </Button>

      <Stack direction="column" spacing={1}>
          {/* 1. satır */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            {firstRow.map((size) => (
              <Button
                key={`${size.col}x${size.row}`}
                size="small"
                variant="outlined"
                sx={{ color: "white", borderColor: "white", fontSize: "0.7rem", minWidth: 0, px: 1 }}
                onMouseDown={() => handleQuickCreate(size.col, size.row)}
                onTouchStart={() => handleQuickCreate(size.col, size.row)}
              >
                {size.col}x{size.row}
              </Button>
            ))}
          </Stack>

          {/* 2. satır */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            {secondRow.map((size) => (
              <Button
                key={`${size.col}x${size.row}`}
                size="small"
                variant="outlined"
                sx={{ color: "white", borderColor: "white", fontSize: "0.7rem", minWidth: 0, px: 1 }}
                onMouseDown={() => handleQuickCreate(size.col, size.row)}
                onTouchStart={() => handleQuickCreate(size.col, size.row)}
              >
                {size.col}x{size.row}
              </Button>
            ))}
          </Stack>
        </Stack>
    </Box>
  );
};

const LayoutMonitor = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "transparent",
      }}
    >
      {children}
    </Box>
  );
};