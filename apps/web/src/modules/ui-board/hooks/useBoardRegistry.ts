import React from "react"
import { BoardRegistry } from "@/src/modules/ui-board/types/board.registry";
import { createBoardRegistry } from "@/src/modules/ui-board/registries/board.registry";
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry";

export const useBoardRegistry = (boardRef: React.RefObject<HTMLDivElement | null>, canvasRegistry: CanvasRegistry) : BoardRegistry => {
   return React.useRef<BoardRegistry>(createBoardRegistry(boardRef, canvasRegistry)).current!;
}