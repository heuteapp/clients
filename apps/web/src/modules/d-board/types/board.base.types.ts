export interface BoardBase {
    canvasName: string;
    canvasVersion: number;
    cards: BoardCardBase[];
}

export interface BoardCardBase {
    name: string;
}

//

export type BoardBaseData<TBase extends BoardBase = BoardBase> = Omit<TBase, "cards">;

export type BoardCardBaseData<TBase extends BoardCardBase = BoardCardBase> = Omit<TBase, never>;