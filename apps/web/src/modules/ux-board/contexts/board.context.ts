import { createContext } from "react";
import { BoardContextValue } from "@/src/modules/ux-board/types/board.context";

export const BoardContext = createContext<BoardContextValue | null>(null);