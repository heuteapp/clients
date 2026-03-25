import { BoardCardData, BoardData } from "@/src/modules/domain/board/types/board.data";
import { LayoutData, LayoutSectionData } from "@/src/modules/domain/layout/types/layout.data";
import { Identifier } from "@/src/types/shared/core/data";

export interface BoardRootProps extends BoardData {

}

export interface BoardCardContainerProps {
    cards: BoardCardData[];
}

export interface BoardCardProps extends BoardCardData {
    
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