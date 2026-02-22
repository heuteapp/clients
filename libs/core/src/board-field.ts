import { HeuteBoardGrid } from "./board-grid";
import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoardField {
    readonly #id: string;
    readonly #layout: HeuteBoardLayout;
    readonly #grid: HeuteBoardGrid;

    constructor(id: string, layout: HeuteBoardLayout, cols: number, rows: number) {        
        this.#id = id;
        this.#layout = layout;
        this.#grid = new HeuteBoardGrid(this, cols, rows);
    }

    public get id() {
        return this.#id;
    }

    public get layout() {
        return this.#layout;
    }

    public get grid() {
        return this.#grid;
    }
}

export default HeuteBoardField;