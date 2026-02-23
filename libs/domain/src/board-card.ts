import { GridRect } from "@heuteapp/common";

export class HeuteBoardCard {
    readonly #id : string;

    #sectionId : string | null;
    #position : GridRect | null;
    #title : string | null;

    constructor(id: string, props: HeuteBoardCardProps) {
        this.#id = this.validateId(id);
        this.#sectionId = this.validateSectionId(props.sectionId);
        this.#position = this.normalizePosition(props.position);
        this.#title = this.normalizeTitle(props.title);
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
        this.#sectionId = this.validateSectionId(value);
    }

    private set position(value: GridRect | null) {
        this.#position = value ? this.normalizePosition(value) : null;
    }

    private set title(value: string | null) {
        this.#title = this.normalizeTitle(value);
    }

    //

    /**
     * @internal
     */
    _move(sectionId: string | null, position: GridRect | null) {
        if (sectionId) {
            this.sectionId = sectionId;
        }

        if (position) {
            this.position = position;
        }
    }

    /**
     * @internal
     */
    _moveIdle() {
        this.#sectionId = null;
        this.#position = null;
    }

    //

    private validateId(id?: string) : string {
        if (!id) {
            throw new Error("ID is required for board card.");
        }

        return id;
    }

    private validateSectionId(sectionId?: string | null) : string | null {
        return sectionId ?? null;
    }

    private normalizePosition(position?: GridRect | null) : GridRect {
        position = position ?? { col: 0, row: 0, colSpan: 1, rowSpan: 1 };

        const col = Math.max(0, position.col);
        const row = Math.max(0, position.row);
        const colSpan = Math.max(1, position.colSpan);
        const rowSpan = Math.max(1, position.rowSpan);

        if (position) {
            return Object.freeze({ col, row, colSpan, rowSpan });
        }

        throw new Error("Position is required for board card.");
    }

    private normalizeTitle(title?: string | null) : string | null {
        return title ?? null;
    }
}

export default HeuteBoardCard;

//

export interface HeuteBoardCardProps {
    sectionId: string | null;
    position: GridRect | null;
    title: string | null;
}