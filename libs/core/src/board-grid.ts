import { HeuteBoardField } from "./board-field";
import HeuteBoardLayout from "./board-layout";

export class HeuteBoardGrid {
    readonly #field: HeuteBoardField;
    readonly #layout: HeuteBoardLayout

    readonly #cols: number;
    readonly #rows: number;

    constructor(field: HeuteBoardField, cols: number, rows: number) {
        this.#field = field;
        this.#layout = field.layout;

        this.#cols = cols;
        this.#rows = rows;
    }

    //

    public get field() {
        return this.#field;
    }

    public get layout() {
        return this.#layout;
    }

    //

    public get cols() {
        return this.#cols;
    }

    public get rows() {
        return this.#rows;
    }
}

export default HeuteBoardGrid;