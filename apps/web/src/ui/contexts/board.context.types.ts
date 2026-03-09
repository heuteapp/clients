import { BoardInteraction } from "@/src/ui/interactions/board.interaction.types";
import { LayoutMeasurements } from "@/src/ui/types/layout/dom";
import { BoardSession } from "@/src/ui/sessions/board.session.types";
import { BoardRegistry } from "@/src/ui/registries/board.registry.types";

export interface BoardContextValue {
    session: BoardSession;
    interaction: BoardInteraction;
    registry: BoardRegistry;
    measurements: LayoutMeasurements | null;
}