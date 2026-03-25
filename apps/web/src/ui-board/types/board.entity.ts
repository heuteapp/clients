import { BoardCardPlacement } from "@/src/board/types/board.types";
import { BaseData } from "@/src/types/shared/core/data";

export interface BoardEntity extends BaseData {
    layoutName: string;
    layoutVersion: number;
    category: string;
    date: Date;
}

export interface BoardCardEntity extends BaseData {
    name: string;
    content: { title: string | null };
    placement: BoardCardPlacement | null;
}