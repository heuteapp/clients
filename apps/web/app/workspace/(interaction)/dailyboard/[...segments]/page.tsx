"use client";

import { useDailyboardStore } from "@/src/heute-store/stores/dailyboard.store";
import { useLayoutStore } from "@/src/heute-store/stores/layout.stores";
import { DailyboardRoot } from "@/src/modules/ui-dailyboard/components/DailyboardRoot";
import { useWorkspaceDailyboardContext } from "@/src/modules/workspace-dailyboard/hooks/useWorkspaceDailyboardContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function WorkspaceDailyboardPage() {
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata;
    const { getMeDailyboard } = useDailyboardStore();
    const { getGlobalLayout } = useLayoutStore();

    const dailyboard = getMeDailyboard(categoryPath, date!);

    if(!dailyboard) {
        return (
            <CircularProgress />
        )
    }

    const layout = getGlobalLayout(dailyboard.layoutName, dailyboard.layoutVersion);
    
    if(!layout) {
        return (
            <CircularProgress />
        )
    }

    return (
        <DailyboardRoot id={categoryPath} data={dailyboard} layout={layout} />
    )
}