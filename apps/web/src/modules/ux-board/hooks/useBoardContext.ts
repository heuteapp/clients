import { useContext } from "react";
import { BoardContext } from "@/src/modules/ux-board/contexts/board.context";

export const useBoardContext = () => {
    const context = useContext(BoardContext);
    
    if (!context) {
        throw new Error("useBoardContext must be used within an BoardProvider");
    }

    return context;
};