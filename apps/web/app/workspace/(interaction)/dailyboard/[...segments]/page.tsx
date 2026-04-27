"use client";

import { useDailyboardDataStore } from "@/src/heute-store/stores/board.store";
import { useCanvasModelStore } from "@/src/heute-store/stores/canvas.stores";
import { useBoardContext } from "@/src/modules/ux-board/hooks/useBoardContext";
import { useCanvasContext } from "@/src/modules/ux-canvas/hooks/useCanvasContext";
import { WorkspaceDailyboardView } from "@/src/modules/w-dailyboard/components/WorkspaceDailyboardView";
import { useWorkspaceDailyboardContext } from "@/src/modules/w-dailyboard/hooks/useWorkspaceDailyboardContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function WorkspaceDailyboardPage() {
    const { metadata, dailyboard, canvas } = useWorkspaceDailyboardContext();
    const { categoryPath, date } = metadata!;
    const { getMeDailyboard } = useDailyboardDataStore();
    const { getGlobalCanvas } = useCanvasModelStore();
    const { rootRef: boardRef } = useBoardContext();
    const { rootRef: canvasRef } = useCanvasContext();

    if(!dailyboard) {
        return (
            <CircularProgress />
        )
    }

    if(!canvas) {
        return (
            <CircularProgress />
        )
    }

    return (
        <WorkspaceDailyboardView rootRef={boardRef} canvasRef={canvasRef} src={dailyboard} canvasSrc={canvas} />
    )
}