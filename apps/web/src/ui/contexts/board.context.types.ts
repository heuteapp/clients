import { BoardInteraction } from "@/src/ui/interactions/board.interaction.types";
import { BoardMetrics } from "@/src/ui/types/board/board.dom";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardSession } from "../types/board/board.session";

export interface BoardContextValue {
    session: BoardSession;
    interaction: BoardInteraction;
    registry: BoardRegistry;
    measurements: BoardMetrics | null;
}