import { createContext } from "react";
import { BoardContextValue } from "./board.context.types";

export const BoardContext = createContext<BoardContextValue | null>(null);