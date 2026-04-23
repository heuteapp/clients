import { Box } from "@mui/material";
import { YYMMDDDate } from "../../d-shared/types/date.types";

export function WorkspaceDailyboardDateBreadcrumb({ date, isDateToday }: { date: YYMMDDDate, isDateToday: boolean }) {
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