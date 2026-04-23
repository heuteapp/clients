import { createContext } from "react";
import { CanvasContextValue } from "@/src/modules/ui-canvas/types/canvas.context";

export const CanvasContext = createContext<CanvasContextValue | null>(null);