import { createContext } from "react";
import { BoardContextValue } from "@/src/modules/ui-board/types/board.context";

export const BoardContext = createContext<BoardContextValue | null>(null);