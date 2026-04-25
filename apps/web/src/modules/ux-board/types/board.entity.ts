import { UIEntity } from "@/src/modules/ui-base/types/ui.types";
import { BoardCardModel, BoardModel } from "@/src/modules/d-board/types/board.model.types";

/**
 * Represents a complete board entity combining UI state and board data
 */
export interface BoardEntity extends UIEntity {
    data: BoardModel;
}

/**
 * Represents a board card entity combining UI state and card data
 */
export interface BoardCardEntity extends UIEntity {
    data: BoardCardModel;
}