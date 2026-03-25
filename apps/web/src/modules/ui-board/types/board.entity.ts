import { UIEntity } from "@/src/ui-base/types/ui.types";
import { BoardCardData, BoardData } from "@/src/modules/board/types/board.types";

/**
 * Represents a complete board entity combining UI state and board data
 */
export interface BoardEntity extends UIEntity, BoardData {

}

/**
 * Represents a board card entity combining UI state and card data
 */
export interface BoardCardEntity extends UIEntity, BoardCardData {

}