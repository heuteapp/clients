import { BoardInteraction } from "@/src/ui/interactions/board.interaction.types";
import { LayoutMeasurements } from "@/src/ui/types/layout/dom";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";
import { BoardSession } from "@/src/ui/sessions/board/BoardSession";

export interface BoardContextValue {
    session: BoardSession;
    interaction: BoardInteraction;
    registry: BoardRegistry;
    measurements: LayoutMeasurements | null;
}