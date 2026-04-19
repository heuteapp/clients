import { useWorkspaceDailyboardContext } from "@/src/modules/workspace-dailyboard/hooks/useWorkspaceDailyboardContext";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Typography, Slider, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";

//

const QUICK_SIZES = [
  { col: 4, row: 3 },
  { col: 8, row: 3 },
  { col: 12, row: 3 },
  { col: 24, row: 3 },
  { col: 4, row: 6 },
  { col: 8, row: 6 },
  { col: 12, row: 6 },
  { col: 24, row: 6 },
];

const FIRST_ROW_SIZES = QUICK_SIZES.slice(0, 4);
const SECOND_ROW_SIZES = QUICK_SIZES.slice(4, 8);

//

export function LayoutSidebar() {
  const { send } = useWorkspaceDailyboardContext();
  const [colSpan, setColSpan] = useState(12);
  const [rowSpan, setRowSpan] = useState(3);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCreate = () => {
    send({ type: 'CARD_CREATE_REQUESTED', cardSize: { colSpan, rowSpan } });
  };

  const handleQuickCreate = (col: number, row: number) => {
    send({ type: 'CARD_CREATE_REQUESTED', cardSize: { colSpan: col, rowSpan: row } });
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  //

  const SidebarBody = () => (
    <Box
      component="aside"
      sx={{
        width: isExpanded ? 192 : 64,
        height: '100%',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: isExpanded ? 2 : 1,
        bgcolor: 'background.paper',
        transition: 'width 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'absolute',
          transition: 'top 0.2s ease, right 0.2s ease',
          top: isExpanded ? 8 : 8,
          right: isExpanded ? 8 : 24,
          color: 'white',
          bgcolor: 'rgba(255,255,255,0.1)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
          zIndex: 1,
        }}
        size="small"
      >
        {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        <ExpandedContent />
      </IconButton>

      
    </Box>
  );

  const ExpandedContent = () => (
    <Box
      sx={{
        opacity: isExpanded ? 1 : 0,
        visibility: isExpanded ? 'visible' : 'hidden',
        transition: 'opacity 0.2s ease, visibility 0.2s ease',
        mt: isExpanded ? 0 : 4,
      }}
    >
      <Typography variant="subtitle2" sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 500, mb: 2 }}>
        Select Card Size
      </Typography>

      <Box>
        <Typography variant="caption" sx={{ color: 'white', fontSize: '1rem', display: 'block', mb: 0.5 }}>
          Column Width: {colSpan}
        </Typography>
        <Slider
          value={colSpan}
          min={3}
          max={24}
          step={1}
          onChange={(_, val) => setColSpan(val as number)}
          valueLabelDisplay="auto"
          sx={{ color: 'primary.main' }}
        />
      </Box>

      <Box>
        <Typography variant="caption" sx={{ color: 'white', fontSize: '1rem', display: 'block', mb: 0.5 }}>
          Row Height: {rowSpan}
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
        sx={{ mt: 1, color: 'white', fontSize: '1rem', width: '100%' }}
      >
        Create {colSpan}x{rowSpan} Card
      </Button>

      <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          {FIRST_ROW_SIZES.map((size) => (
            <Button
              key={`${size.col}x${size.row}`}
              size="small"
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                fontSize: '0.7rem',
                minWidth: 0,
                px: 1,
              }}
              onMouseDown={() => handleQuickCreate(size.col, size.row)}
              onTouchStart={() => handleQuickCreate(size.col, size.row)}
            >
              {size.col}x{size.row}
            </Button>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="space-between">
          {SECOND_ROW_SIZES.map((size) => (
            <Button
              key={`${size.col}x${size.row}`}
              size="small"
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'white',
                fontSize: '0.7rem',
                minWidth: 0,
                px: 1,
              }}
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

  return (
    <SidebarBody />
  );
}