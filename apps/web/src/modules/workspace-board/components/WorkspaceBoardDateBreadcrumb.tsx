import { Box } from "@mui/material";
import { useWorkspaceBoardContext } from "../hooks/useWorkspaceBoardContext";

export function WorkspaceBoardDateBreadcrumb() {
    const context = useWorkspaceBoardContext();
    const { date, isDateToday } = context.metadata;

    return (
        <Box sx={{
            fontSize: "0.875rem",
            color: "text.secondary",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            px: 1,
            userSelect: "none",
        }}>
            {isDateToday ? "Today" : date?.display}
        </Box>
    )
}