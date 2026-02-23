import { HeuteBoardCard } from "./board-card";

export class HeuteBoard {
    readonly #id: string;
    
    #layoutId: string;
    #cards: Map<string, HeuteBoardCard> = new Map();

    constructor(id: string, props: HeuteBoardProps) {
        this.#id = this.#validateId(id);
        this.#layoutId = this.#validateLayoutId(props.layoutId);

        for (const card of props.cards ?? []) {
            this.addCard(card);
        }
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
        if (this.#cards.has(card.id)) {
            throw new Error("Card already exists in board.");
        }

        this.#cards.set(card.id, card);
    }

    public listCards(): ReadonlyArray<HeuteBoardCard> {
        return [...this.#cards.values()];
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
}

export default HeuteBoard;

export interface HeuteBoardProps {
    layoutId: string;
    cards?: HeuteBoardCard[];
}