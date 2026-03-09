import { BoardInteraction } from "./interaction/board.interaction.types";
import { BoardSession } from "./session/board.session.types";
import { createContext } from "react";
import { BoardRegistry } from "./board.registry";
import { LayoutMeasurements } from "../layout/types/dom";

export const BoardContext = createContext<BoardContextValue | null>(null);

export interface BoardContextValue {
    session: BoardSession;
    interaction: BoardInteraction;
    registry: BoardRegistry;
    measurements: LayoutMeasurements | null;
}