import { HeuteBoardCard, HeuteBoardCardSnapshot } from "./board-card";
import { HeuteBoardLayoutSnapshot } from "./board-layout";

export class HeuteBoard {
    readonly #id: string;
    
    #layout: HeuteBoardLayoutSnapshot;
    #cards: Map<string, HeuteBoardCard> = new Map();

    constructor(id: string, props: HeuteBoardProps) {
        this.#id = this.#processId(id);
        this.#layout = this.#processLayout(props.layout);
    }

    //

    public get id() : string {
        return this.#id;
    }

    public get layout(): HeuteBoardLayoutSnapshot {
        return this.#layout;
    }
    
    //

    public changeLayout(layout: HeuteBoardLayoutSnapshot) {
        this.#layout = this.#processLayout(layout);
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

    #processId(id: string | undefined) : string {
        if (!id) {
            throw new Error("Board ID is required.");
        }
        return id;
    }

    #processLayout(layout: HeuteBoardLayoutSnapshot | undefined) : HeuteBoardLayoutSnapshot {
        if (!layout) {
            throw new Error("Layout is required for board.");
        }
        return layout;
    }
}

export default HeuteBoard;

export interface HeuteBoardSnapshot {
    id: string;
    layout: HeuteBoardLayoutSnapshot;
    cards: HeuteBoardCardSnapshot[];
}

export type HeuteBoardProps = Omit<HeuteBoardSnapshot, "id">;