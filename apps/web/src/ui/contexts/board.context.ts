import { BoardInteraction } from "../../core/domain/board/interaction/board.interaction.types";
import { BoardSession } from "../sessions/board.session.types";
import { createContext } from "react";
import { BoardRegistry } from "../../core/domain/board/board.registry";
import { LayoutMeasurements } from "../../core/domain/layout/types/dom";

export const BoardContext = createContext<BoardContextValue | null>(null);

export interface BoardContextValue {
    session: BoardSession;
    interaction: BoardInteraction;
    registry: BoardRegistry;
    measurements: LayoutMeasurements | null;
}