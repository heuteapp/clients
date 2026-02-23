import { HeuteBoardCard } from "./board-card";

export class HeuteBoard {
    readonly #id: string;
    
    #layoutId: string;
    #cards: HeuteBoardCard[];

    constructor(id: string, props: HeuteBoardProps) {
        this.#id = id;
        this.#layoutId = props.layoutId;
        this.#cards = props.cards ?? [];
    }

    //

    public get id() : string {
        return this.#id;
    }

    public get layoutId(): string {
        return this.#layoutId;
    }
    
    //

    public changeLayout(layoutId: string) {
        this.#layoutId = layoutId;
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
    layoutId: string;
    cards?: HeuteBoardCard[];
}