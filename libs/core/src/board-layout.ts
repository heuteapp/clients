import { HeuteBoard } from "./board";
import HeuteBoardField from "./board-field";

export class HeuteBoardLayout {
    #board: HeuteBoard;
    
    constructor(board: HeuteBoard) {
        this.#board = board;
    }

    public get board(): HeuteBoard {
        return this.#board;
    }
}

export default HeuteBoardLayout;

//

export class HeuteBoardLayout_Fields {
    #cache: Map<string, HeuteBoardField>;

    constructor() {
        this.#cache = new Map<string, HeuteBoardField>();
    }

    public add(field: HeuteBoardField) {
        if(this.#cache.has(field.id)) {
            throw new Error(`Field with id ${field.id} already exists in the layout.`);
        }

        this.#cache.set(field.id, field);
    }

    public get(id: string): HeuteBoardField | undefined {
        return this.#cache.get(id);
    }

    public getAll(): HeuteBoardField[] {
        return Array.from(this.#cache.values());
    }
}