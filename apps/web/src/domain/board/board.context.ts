import { BoardInteraction } from "./interaction/board.interaction.types";
import { LayoutRegistry } from "@/src/domain/layout/layout.registry";
import { BoardSession } from "./session/board.session.types";
import { createContext } from "react";
import { BoardData } from "./board.types";

export const BoardContext = createContext<BoardContextValue | null>(null);

export interface BoardContextValue {
    board: BoardData;
    setBoard: (board: BoardData) => void;
    session: BoardSession;
    interaction: BoardInteraction;
    layoutRegistry: LayoutRegistry;
}