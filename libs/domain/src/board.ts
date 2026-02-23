import { HeuteBoardCard } from "./board-card";
import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoard {
    #layout: HeuteBoardLayout;
    #cards: HeuteBoardCard[];

    constructor(layout: HeuteBoardLayout) {
        this.#layout = layout;
        this.#cards = [];
    }

    //

    public get layout(): HeuteBoardLayout {
        return this.#layout;
    }
    
    //

    public setLayout(layout: HeuteBoardLayout) {
        this.#layout = HeuteBoardLayout.copy(layout);
    }

    public listCards(): ReadonlyArray<HeuteBoardCard> {
        return [...this.#cards];
    }
}

export default HeuteBoard;