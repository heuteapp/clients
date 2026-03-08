import { BoardInteraction } from "./interaction/board.interaction.types";
import { LayoutRegistry } from "@/src/domain/layout/layout.registry";
import { BoardSession } from "./session/board.session.types";
import { createContext } from "react";

export const BoardContext = createContext<BoardContextValue | null>(null);

export interface BoardContextValue {
    session: BoardSession;
    interaction: BoardInteraction;
    layoutRegistry: LayoutRegistry;
}