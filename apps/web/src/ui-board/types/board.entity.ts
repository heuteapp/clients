import { UIEntity } from "@/src/ui-shared/types/ui.types";
import { BoardCardData, BoardData } from "@/src/board/types/board.types";

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