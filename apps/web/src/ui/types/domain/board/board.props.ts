import { BoardCardData, BoardData } from "@/src/types/core/domain/board/board.data";
import { LayoutData, LayoutSectionData } from "@/src/types/core/domain/layout/layout.data";
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