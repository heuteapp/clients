import { createContext } from "react";
import { BoardContextValue } from "@/src/ui-board/types/board.context";

export const BoardContext = createContext<BoardContextValue | null>(null);