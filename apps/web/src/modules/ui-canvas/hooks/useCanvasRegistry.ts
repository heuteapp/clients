import React from "react"
import { CanvasRegistry } from "@/src/modules/ui-canvas/types/canvas.registry";
import { createCanvasRegistry } from "@/src/modules/ui-canvas/registries/canvas.registry";

export const useCanvasRegistry = (canvasRef: React.RefObject<HTMLDivElement | null>) : CanvasRegistry => {
    return React.useRef<CanvasRegistry>(createCanvasRegistry(canvasRef)).current;
}