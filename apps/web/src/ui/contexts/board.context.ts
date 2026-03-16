import { createContext } from "react";
import { BoardContextValue } from "@/src/ui/types/domain/board/board.context";

export const BoardContext = createContext<BoardContextValue | null>(null);