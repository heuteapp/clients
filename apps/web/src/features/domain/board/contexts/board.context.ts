import { createContext } from "react";
import { BoardContextValue } from "@/src/features/domain/board/types/board.context";

export const BoardContext = createContext<BoardContextValue | null>(null);