import { BoardEntity, BoardCardEntity } from "@/src/modules/ui-board/types/board.entity";

export interface BoardRootProps extends BoardEntity {

}

export interface BoardCardContainerProps {
    cards: BoardCardEntity[];
}

export interface BoardCardProps extends BoardCardEntity {
    
}