import { CanvasModelData, CanvasGridModelData } from "@/src/modules/d-canvas/types/canvas.model.types";
import { UIEntity } from "@/src/modules/ui-base/types/ui.types"

/**
 * Represents a complete canvas entity combining UI state and canvas data
 */
export interface CanvasEntity extends UIEntity {
    data: CanvasModelData;
}

/**
 * Represents a canvas grid entity combining UI state and grid data
 */
export interface CanvasGridEntity extends UIEntity {
    data: CanvasGridModelData;
}