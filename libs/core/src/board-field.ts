import { HeuteBoardGrid, HeuteBoardGridProps } from "./board-grid";
import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoardField {
    readonly #layout: HeuteBoardLayout;
    readonly #grid: HeuteBoardGrid;

    constructor(layout: HeuteBoardLayout, gridProps: HeuteBoardGridProps) {
        this.#layout = layout;
        this.#grid = new HeuteBoardGrid(this, gridProps.cols, gridProps.rows);
    }

    public get layout() {
        return this.#layout;
    }

    public get grid() {
        return this.#grid;
    }
}

export default HeuteBoardField;