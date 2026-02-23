import { HeuteBoardCard, HeuteBoardCardSnapshot } from "./board-card";
import { HeuteBoardLayoutSnapshot } from "./board-layout";
import { HeuteBoardSectionSnapshot } from "./board-section";

export class HeuteBoard {
    readonly #id: string;
    
    #layout: HeuteBoardLayoutSnapshot;
    #cards: Map<string, HeuteBoardCard> = new Map();

    constructor(id: string, props: HeuteBoardProps) {
        this.#id = this.#processId(id);
        this.#layout = this.#processLayout(props.layout);
        this.addCards(props.cards);
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

        for (const card of this.#cards.values()) {
            if (card.isPlaced) {
                card._unplace();
            }
        }
    }

    public addCard(card: HeuteBoardCardSnapshot) {
        if (this.#cards.has(card.id)) {
            throw new Error("Card already exists in board.");
        }

        const cardEntity = HeuteBoardCard.fromSnapshot(card);
        this.#cards.set(card.id, cardEntity);
    }

    public addCards(cards: HeuteBoardCardSnapshot[]) {
        for (const card of cards) {
            this.addCard(card);
        }
    }

    public removeCard(cardId: string) {
        if (!this.#cards.has(cardId)) {
            throw new Error("Card does not exist in board.");
        }

        this.#cards.delete(cardId);
    }

    public getCard(cardId: string): HeuteBoardCardSnapshot {
        const card = this.#cards.get(cardId);
        if (!card) {
            throw new Error("Card does not exist in board.");
        }
        
        return HeuteBoardCard.toSnapshot(card);
    }

    public listCards(): ReadonlyArray<HeuteBoardCardSnapshot> {
        return [...this.#cards.values()].map(card => HeuteBoardCard.toSnapshot(card));
    }


    public getCardSection(cardId: string): HeuteBoardSectionSnapshot | null {
        const card = this.#cards.get(cardId);
        if (!card) {
            throw new Error("Card does not exist in board.");
        }

        if (!card.isPlaced) {
            return null;
        }

        const sectionId = card.sectionId;
        const section = this.#layout.sections.find(sec => sec.id === sectionId);

        return section ?? null;
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