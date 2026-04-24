"use client";

import { useDailyboardDataStore } from "@/src/heute-store/stores/board.store";
import { useCanvasModelStore } from "@/src/heute-store/stores/canvas.stores";
import { WorkspaceDailyboardView } from "@/src/modules/w-dailyboard/components/WorkspaceDailyboardView";
import { useWorkspaceDailyboardContext } from "@/src/modules/w-dailyboard/hooks/useWorkspaceDailyboardContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function WorkspaceDailyboardPage() {
    const { metadata } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata!;
    const { getMeDailyboard } = useDailyboardDataStore();
    const { getGlobalCanvas } = useCanvasModelStore();

    const dailyboard = getMeDailyboard(categoryPath, date!);

    if(!dailyboard) {
        return (
            <CircularProgress />
        )
    }

    const canvas = getGlobalCanvas(dailyboard.canvasName, dailyboard.canvasVersion);

    if(!canvas) {
        return (
            <CircularProgress />
        )
    }

    return (
        <WorkspaceDailyboardView data={dailyboard} />
    )
}