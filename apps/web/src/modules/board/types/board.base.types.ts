export interface BoardBase {
    canvasName: string;
    canvasVersion: number;
    cards: BoardCardBase[];
}

export interface BoardCardBase {
    name: string;
}

//

export type BoardBaseData = Omit<BoardBase, "cards">;

export type BoardCardBaseData = Omit<BoardCardBase, "">;