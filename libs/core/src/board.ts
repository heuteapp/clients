import HeuteBoardCard from "./board-card";
import HeuteBoardLayout from "./board-layout";

export class HeuteBoard {
    #layout: HeuteBoardLayout | null;
    #cards: HeuteBoardCard[];

    constructor(layout?: HeuteBoardLayout) {
        this.#layout = layout || null;
        this.#cards = [];
    }

    public get layout(): HeuteBoardLayout | null {
        return this.#layout;
    }

    public setLayout(layout: HeuteBoardLayout) {
        this.#layout = layout;
    }
}

export default HeuteBoard;