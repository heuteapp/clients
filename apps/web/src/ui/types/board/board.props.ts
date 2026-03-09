import { BoardCardData, BoardData } from "@/src/types/board/board.data";

export interface HeuteBoardProps extends BoardData {

}

export interface BoardCardContainerProps {
    cards: BoardCardData[];
}

export interface BoardCardProps extends BoardCardData {

}