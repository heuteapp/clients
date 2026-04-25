import { useContext } from "react";
import { CanvasContext } from "@/src/modules/ux-canvas/contexts/canvas.context";
import { CanvasContextValue } from "@/src/modules/ux-canvas/types/canvas.context";

export const useCanvasContext = () : CanvasContextValue => {
    const context = useContext(CanvasContext);
    
    if (!context) {
        throw new Error("useCanvasContext must be used within an CanvasProvider");
    }

    return context;
};