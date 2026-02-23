import { HeuteBoardCard } from "./board-card";
import { HeuteBoardLayout } from "./board-layout";

export class HeuteBoard {
    #id: string;
    #layout: HeuteBoardLayout;
    #cards: HeuteBoardCard[];

    constructor(id: string, props: HeuteBoardProps) {
        this.#id = id;
        this.#layout = props.layout;
        this.#cards = props.cards ?? [];
    }

    //

    public get id() : string {
        return this.#id;
    }

    public get layout(): HeuteBoardLayout {
        return this.#layout;
    }

    //

    public set id(id: string) {
        this.#id = id;
    }
    
    //

    public changeLayout(layout: HeuteBoardLayout) {
        this.#layout = HeuteBoardLayout.copy(layout);
    }

    public addCard(card: HeuteBoardCard) {
        this.#cards.push(card);
    }

    public listCards(): ReadonlyArray<HeuteBoardCard> {
        return [...this.#cards];
    }
}

export default HeuteBoard;

export interface HeuteBoardProps {
    layout: HeuteBoardLayout;
    cards?: HeuteBoardCard[];
}