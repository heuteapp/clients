import { createContext } from "react";
import { CanvasContextValue } from "@/src/modules/ux-canvas/types/canvas.context";

export const CanvasContext = createContext<CanvasContextValue | null>(null);