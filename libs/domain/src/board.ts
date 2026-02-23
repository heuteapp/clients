import { HeuteBoardCard } from "./board-card";

export class HeuteBoard {
    readonly #id: string;
    
    #layoutId: string;
    #cards: HeuteBoardCard[];

    constructor(id: string, props: HeuteBoardProps) {
        this.#id = this.#validateId(id);
        this.#layoutId = this.#validateLayoutId(props.layoutId);
        this.#cards = this.#normalizeCards(props.cards);
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
        this.#layoutId = this.#validateLayoutId(layoutId);
    }

    public addCard(card: HeuteBoardCard) {
        this.#cards.push(card);
    }

    public listCards(): ReadonlyArray<HeuteBoardCard> {
        return [...this.#cards];
    }

    //

    #validateId(id: string | undefined) : string {
        if (!id) {
            throw new Error("Board ID is required.");
        }
        return id;
    }

    #validateLayoutId(layoutId: string | undefined) : string {
        if (!layoutId) {
            throw new Error("Layout ID is required for board.");
        }
        return layoutId;
    }

    #normalizeCards(cards?: HeuteBoardCard[]) : HeuteBoardCard[] {
        return cards ? [...cards] : [];
    }
}

export default HeuteBoard;

export interface HeuteBoardProps {
    layoutId: string;
    cards?: HeuteBoardCard[];
}