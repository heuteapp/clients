import { useWorkspaceDailyboardContext } from "@/src/modules/w-dailyboard/hooks/useWorkspaceDailyboardContext";
import { useWorkspaceContext } from "@/src/modules/w-core/hooks/useWorkspaceContext";
import { ChevronLeft, ChevronRight, Add, Launch } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useTracingStore } from "@/src/modules/t-core/hooks/useTracingStore";

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
  const { domains } = useTracingStore();

  const handleAddCard = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    send({ type: "CARD_CREATE_REQUEST" });
  };

  const testTracing = () => {
    const domain = domains["w-dailyboard"];
    console.log(domain.itemsOf("canvas-grid-section"));
  }
  
  return (
    <>
      <IconButton 
        color="primary"
        aria-label="add" 
        onPointerUp={handleAddCard}
        sx={{
          width: 36,
          height: 48,
          border: "2px solid",
          borderRadius: 0.6,
          boxSizing: "border-box"
        }}
      >
        <Add />
      </IconButton>
      {<IconButton 
        color="secondary"
        aria-label="add"
        onClick={testTracing}
        sx={{
          width: 36,
          height: 24,
          border: "1px solid",
          borderRadius: 0.6,
          padding: 1,
          boxSizing: "border-box"
        }}
      >
        <Launch sx={{ fontSize: 18 }} />
      </IconButton>}
    </>
  )
}