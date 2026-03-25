import { BoardCardData, BoardData } from "@/src/modules/board/types/board.data";
import { DataContent } from "@/src/types/shared/core/data";
import { createDataIdentifier } from "@/src/core/utils/shared/data";

export function createBoardData(content: DataContent<BoardData>): BoardData {
    return {
        id: createDataIdentifier(),
        ...content,
    };
}

export function createBoardCardData(content: DataContent<BoardCardData>): BoardCardData {
    return {
        id: createDataIdentifier(),
        ...content,
    };
}