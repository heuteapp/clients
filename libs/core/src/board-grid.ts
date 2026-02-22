import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoardGrid {
    #layout: HeuteBoardLayout;
    #cols: number;
    #rows: number;

    constructor(layout: HeuteBoardLayout, cols: number, rows: number) {
        this.#layout = layout;
        this.#cols = cols;
        this.#rows = rows;
    }

    public get cols() {
        return this.#cols;
    }

    public get rows() {
        return this.#rows;
    }
}

export default HeuteBoardGrid;