import { BoardCardData, BoardData } from "@/src/core/types/domain/board/board.data";
import { LayoutData, LayoutSectionData } from "@/src/core/types/domain/layout/layout.data";
import { Identifier } from "@/src/core/types/shared/data";

export interface BoardProps extends BoardData {

}

export interface BoardCardContainerProps {
    cards: BoardCardData[];
}

export interface BoardCardProps extends BoardCardData {

}

export interface BoardLayoutProps extends LayoutData {

}

export interface BoardLayoutSectionProps extends LayoutSectionData {

}

export interface BoardLayoutGridProps  {
    sectionId: Identifier,
    colSpan: number,
    rowSpan: number,
}