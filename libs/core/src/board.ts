import HeuteBoardLayout from "./board-layout";

export class HeuteBoard {
    #layout: HeuteBoardLayout | null;

    constructor(layout?: HeuteBoardLayout) {
        this.#layout = layout || null;
    }

    public get layout(): HeuteBoardLayout | null {
        return this.#layout;
    }

    public setLayout(layout: HeuteBoardLayout) {
        this.#layout = layout;
    }
}

export default HeuteBoard;