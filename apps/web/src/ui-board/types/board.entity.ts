import { UIEntity } from "@/src/shared/types/ui.types";
import { BoardCardData, BoardData } from "@/src/board/types/board.types";

export interface BoardEntity extends UIEntity, BoardData {

}

export interface BoardCardEntity extends UIEntity, BoardCardData {

}