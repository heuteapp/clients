import { GridRect } from "@heuteapp/common";

export class HeuteBoardCard {
    readonly #id : string;

    #sectionId : string | null;
    #position : GridRect | null;
    #title : string | null;

    constructor(id: string, props: HeuteBoardCardProps) {
        this.#id = this.#validateId(id);
        this.#sectionId = this.#validateSectionId(props.sectionId);
        this.#position = this.#normalizePosition(props.position);
        this.#title = this.#normalizeTitle(props.title);

        this.#syncPlacement();
    }

    //

    public get id() : string {
        return this.#id;
    }

    public get sectionId() : string | null {
        return this.#sectionId;
    }

    public get position() : GridRect | null {
        return this.#position;
    }

    public get title() : string | null {
        return this.#title;
    }

    //

    private set sectionId(value: string | null) {
        this.#sectionId = this.#validateSectionId(value);
    }

    private set position(value: GridRect | null) {
        this.#position = value ? this.#normalizePosition(value) : null;
    }

    private set title(value: string | null) {
        this.#title = this.#normalizeTitle(value);
    }

    //

    public get isPlaceable() : boolean {
        return this.#sectionId === null && this.#position === null;
    }

    public get isPlaced() : boolean {
        return this.#sectionId !== null && this.#position !== null;
    }

    //

    /**
     * @internal
     */
    _place(sectionId: string, position: GridRect) {
        if (this.isPlaced) {
            throw new Error("Card is already placed.");
        }

        if(!sectionId) {
            throw new Error("Section ID is required to place card.");
        }

        if(!position) {
            throw new Error("Position is required to place card.");
        }
        
        this.sectionId = sectionId;
        this.position = position;
    }

    /** 
     * @internal
    */
    _replace(sectionId: string, position: GridRect) {
        if (this.isPlaceable) {
            throw new Error("Card is not placed.");
        }

        if(!sectionId) {
            throw new Error("Section ID is required to replace card.");
        }

        if(!position) {
            throw new Error("Position is required to replace card.");
        }

        this.sectionId = sectionId;
        this.position = position;
    }

    /**
     * @internal
     */
    _unplace() {
        if (this.isPlaceable) {
            throw new Error("Card is not placed.");
        }

        this.#sectionId = null;
        this.#position = null;
    }

    //

    #validateId(id?: string) : string {
        if (!id) {
            throw new Error("ID is required for board card.");
        }

        return id;
    }

    #validateSectionId(sectionId?: string | null) : string | null {
        return sectionId ?? null;
    }

    #normalizePosition(position?: GridRect | null) : GridRect | null {
        if(!position) return null;
        
        return Object.freeze({ 
            col: Math.max(0, position.col),
            row: Math.max(0, position.row),
            colSpan: Math.max(1, position.colSpan),
            rowSpan: Math.max(1, position.rowSpan)
        });
    }

    #normalizeTitle(title?: string | null) : string | null {
        return title ?? null;
    }

    #syncPlacement() {
        if ((this.#sectionId === null) !== (this.#position === null)) {
            this.#sectionId = null;
            this.#position = null;
        }
    }
}

export default HeuteBoardCard;

//

export interface HeuteBoardCardProps {
    sectionId: string | null;
    position: GridRect | null;
    title: string | null;
}