import { GridSize } from "../data/core";
import { HeuteDayboard } from "./dayboard";

export class HeuteApp {
    #dayboard : HeuteDayboard;
    cardSize : GridSize = { cols: 3, rows: 2 };

    constructor() {
        this.#dayboard = new HeuteDayboard();
    }

    public get dayboard(): HeuteDayboard {
        return this.#dayboard;
    }
}

export const heuteApp = new HeuteApp();