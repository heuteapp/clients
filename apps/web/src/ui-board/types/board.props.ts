import { BoardEntity, BoardCardEntity } from "@/src/ui-board/types/board.entity";
import { LayoutData, LayoutSectionData } from "@/src/modules/layout/types/layout.data";
import { Identifier } from "@/src/types/shared/core/data";

export interface BoardRootProps extends BoardEntity {

}

export interface BoardCardContainerProps {
    cards: BoardCardEntity[];
}

export interface BoardCardProps extends BoardCardEntity {
    
}

export interface BoardLayoutRootProps extends LayoutData {

}

export interface BoardLayoutSectionProps extends LayoutSectionData {

}

export interface BoardLayoutGridProps  {
    sectionId: Identifier,
    colSpan: number,
    rowSpan: number,
}