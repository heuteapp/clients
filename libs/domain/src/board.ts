import { GridRect, isGridRectOverlapping } from "@heuteapp/common";
import { HeuteBoardCard, HeuteBoardCardSnapshot } from "./board-card";
import { HeuteLayoutSnapshot } from "./layout";
import { HeuteLayoutSectionSnapshot } from "./layout-section";

export class HeuteBoard {
    readonly #id: string;
    
    #layout: HeuteLayoutSnapshot;
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

    public get layout(): HeuteLayoutSnapshot {
        return this.#layout;
    }
    
    //

    public changeLayout(layout: HeuteLayoutSnapshot) {
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

    public addCards(cards: readonly HeuteBoardCardSnapshot[]) {
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

    public removeCards(cardIds: readonly string[]) {
        for (const cardId of cardIds) {
            this.removeCard(cardId);
        }
    }

    public getCard(cardId: string): HeuteBoardCardSnapshot {
        const card = this.#cards.get(cardId);
        if (!card) {
            throw new Error("Card does not exist in board.");
        }
        
        return HeuteBoardCard.toSnapshot(card);
    }

    public getCardSection(cardId: string): HeuteLayoutSectionSnapshot | null {
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

    public getCards(): ReadonlyArray<HeuteBoardCardSnapshot> {
        return [...this.#cards.values()].map(card => HeuteBoardCard.toSnapshot(card));
    }

    public getSectionCards(sectionId: string): ReadonlyArray<HeuteBoardCardSnapshot> {
        if (!this.#layout.sections.some(sec => sec.id === sectionId)) {
            throw new Error("Section does not exist in board layout.");
        }

        const result: HeuteBoardCardSnapshot[] = [];

        for (const card of this.#cards.values()) {
            if (card.sectionId === sectionId) {
                result.push(HeuteBoardCard.toSnapshot(card));
            }
        }

        return result;
    }

    //

    public placeCard(cardId: string, sectionId: string, position: GridRect) {
        const card = this.#cards.get(cardId);
        if (!card) throw new Error("Card does not exist in board.");
        
        const section = this.#layout.sections.find(sec => sec.id === sectionId);
        if (!section) throw new Error("Section does not exist in board layout.");

        if (!this.#canPlaceCard(card, section, position)) {
            throw new Error("Card cannot be placed at the specified position.");
        }

        this.#placeCard(card, section, position);
    }

    public canPlaceCard(cardId: string, sectionId: string, position: GridRect): boolean {
        const card = this.#cards.get(cardId);
        if (!card) throw new Error("Card does not exist in board.");

        const section = this.#layout.sections.find(sec => sec.id === sectionId);
        if (!section) throw new Error("Section does not exist in board layout.");

        return this.#canPlaceCard(card, section, position);
    }

    //

    #processId(id: string | undefined) : string {
        if (!id) {
            throw new Error("Board ID is required.");
        }
        return id;
    }

    #processLayout(layout: HeuteLayoutSnapshot | undefined) : HeuteLayoutSnapshot {
        if (!layout) {
            throw new Error("Layout is required for board.");
        }
        return layout;
    }

    //

    #placeCard(card: HeuteBoardCard, section: HeuteLayoutSectionSnapshot, position: GridRect) {
        card._place(section.id, position);
    }

    #canPlaceCard(card: HeuteBoardCard, section: HeuteLayoutSectionSnapshot, position: GridRect): boolean {
        for (const existingCard of this.#cards.values()) {
            if (!existingCard.isPlaced) continue;
            if (existingCard.sectionId !== section.id) continue;
            if (existingCard.id === card.id) continue;
            
            const existingRect = existingCard.position!;
            const isOverlapping = isGridRectOverlapping(existingRect, position);

            if (isOverlapping) {
                return false;
            }
        }

        return true;
    }

    //

    public static fromSnapshot(snapshot: HeuteBoardSnapshot): HeuteBoard {
        return new HeuteBoard(snapshot.id, {
            layout: snapshot.layout,
            cards: snapshot.cards
        });
    }

    public static toSnapshot(board: HeuteBoard): HeuteBoardSnapshot {
        return {
            id: board.id,
            layout: board.layout,
            cards: board.getCards()
        };
    }
}

export default HeuteBoard;

export interface HeuteBoardSnapshot {
    readonly id: string;
    readonly layout: HeuteLayoutSnapshot;
    readonly cards: readonly HeuteBoardCardSnapshot[];
}

export type HeuteBoardProps = Omit<HeuteBoardSnapshot, "id">;