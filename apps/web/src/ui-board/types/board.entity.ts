import { BoardCardPlacement } from "@/src/board/types/board.types";
import { UIEntity } from "@/src/shared/types/entity.types";

export interface BoardEntity extends UIEntity {
    layoutName: string;
    layoutVersion: number;
    category: string;
    date: Date;
}

export interface BoardCardEntity extends UIEntity {
    name: string;
    content: { title: string | null };
    placement: BoardCardPlacement | null;
}