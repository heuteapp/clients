import { BoardInteraction } from "./board.interaction";
import { LayoutRegistry } from "@/src/domain/layout/layout.registry";
import { BoardSession } from "./board.session";
import { createContext } from "react";

export const BoardContext = createContext<BoardContextValue | null>(null);

export interface BoardContextValue {
    session: BoardSession;
    interaction: BoardInteraction;
    layoutRegistry: LayoutRegistry;
}