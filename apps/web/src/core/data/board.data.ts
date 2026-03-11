import { BoardCardData, BoardData } from "../types/domain/board/board.data";
import { DataContent } from "../types/shared/data";
import { createDataIdentifier } from "../utils/shared/data";

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