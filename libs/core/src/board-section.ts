import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoardSection {
    readonly #id: string;
    readonly #layout: HeuteBoardLayout;
    readonly #cols: number;
    readonly #rows: number;

    constructor(id: string, layout: HeuteBoardLayout, cols: number, rows: number) {        
        this.#id = id;
        this.#layout = layout;
        this.#cols = cols;
        this.#rows = rows;
    }

    public get id() {
        return this.#id;
    }

    public get layout() {
        return this.#layout;
    }

    public get cols() {
        return this.#cols;
    }

    public get rows() {
        return this.#rows;
    }
}

export default HeuteBoardSection;