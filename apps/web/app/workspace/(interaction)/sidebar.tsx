import { useWorkspaceDailyboardContext } from "@/src/modules/workspace-dailyboard/hooks/useWorkspaceDailyboardContext";
import { useWorkspaceContext } from "@/src/modules/workspace/hooks/useWorkspaceContext";
import { ChevronLeft, ChevronRight, Add } from "@mui/icons-material";
import { IconButton, Typography, Slider, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";

export function LayoutSidebar() {
  const { metadata } = useWorkspaceContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box
      component="aside"
      sx={{
        width: isExpanded ? 192 : 64,
        height: "100%",
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <IconButton 
        onClick={toggleExpanded}
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
        }}
      >
        {isExpanded ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 1
        }}
      >
        {metadata.type === "dailyboard" && <SidebarDailyboardContent />}
      </Box>
    </Box>
  );
}

const SidebarDailyboardContent = () => {
  const { send } = useWorkspaceDailyboardContext();
  return (
    <Box sx={{ marginTop: "auto", marginBottom: "auto" }}>
      <IconButton color="primary" aria-label="add">
        <Add />
      </IconButton>
    </Box>
  )
}