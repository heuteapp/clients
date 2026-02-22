import { HeuteBoard } from "./board";
import { HeuteBoardSection } from "./board-section";

export class HeuteBoardLayout {
    #id: string;
    #board: HeuteBoard;
    #sections: HeuteBoardLayout_Sections;
    
    constructor(id: string, board: HeuteBoard) {
        this.#id = id;
        this.#board = board;
        this.#sections = new HeuteBoardLayout_Sections();
    }

    //

    public get id() {
        return this.#id;
    }

    public get board(): HeuteBoard {
        return this.#board;
    }

    public get sections(): HeuteBoardLayout_Sections {
        return this.#sections;
    }
}

export default HeuteBoardLayout;

//

export class HeuteBoardLayout_Sections {
    #cache: Map<string, HeuteBoardSection>;

    constructor() {
        this.#cache = new Map<string, HeuteBoardSection>();
    }

    public add(section: HeuteBoardSection) {
        const id = section.getId();
        if(this.#cache.has(id)) {
            throw new Error(`Section with id ${id} already exists in the layout.`);
        }

        this.#cache.set(id, section);
    }

    public get(id: string): HeuteBoardSection | undefined {
        return this.#cache.get(id);
    }

    public getAll(): HeuteBoardSection[] {
        return Array.from(this.#cache.values());
    }
}