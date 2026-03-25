import { LayoutData, LayoutSectionData } from "@/src/layout/types/layout.types";
import { UIEntity } from "@/src/shared/types/ui.types"

/**
 * Represents a complete layout entity combining UI state and layout data
 */
export interface LayoutEntity extends UIEntity, LayoutData {

}

/**
 * Represents a layout section entity combining UI state and section data
 */
export interface LayoutSectionEntity extends UIEntity, LayoutSectionData {

}