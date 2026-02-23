import { GridRect } from "@heuteapp/common";
import { HeuteBoardSection } from "./board-section";

export class HeuteBoardCard {
    readonly #id : string;

    #section : HeuteBoardSection | null;
    #position : GridRect | null;
    #title : string | null;

    constructor(id: string, props: HeuteBoardCardProps) {
        this.#id = this.validateId(id);
        this.#section = this.validateSection(props.section);
        this.#position = this.normalizePosition(props.position);
        this.#title = this.normalizeTitle(props.title);
    }

    //

    public get id() : string {
        return this.#id;
    }

    public get section() : HeuteBoardSection | null {
        return this.#section;
    }

    public get position() : GridRect | null {
        return this.#position;
    }

    public get title() : string | null {
        return this.#title;
    }

    //

    private set section(section: HeuteBoardSection | null) {
        this.#section = section ? this.validateSection(section) : null;
    }

    private set position(position: GridRect | null) {
        this.#position = position ? this.normalizePosition(position) : null;
    }

    private set title(title: string | null) {
        this.#title = this.normalizeTitle(title);
    }

    //

    /**
     * @internal
     */
    _move(section: HeuteBoardSection | null, position: GridRect | null) {
        if (section) {
            this.section = section;
        }

        if (position) {
            this.position = position;
        }
    }

    /**
     * @internal
     */
    _moveIdle() {
        this.#section = null;
        this.#position = null;
    }

    //

    private validateId(id?: string) : string {
        if (!id) {
            throw new Error("ID is required for board card.");
        }

        return id;
    }

    private validateSection(section?: HeuteBoardSection) : HeuteBoardSection {
        if (!section) {
            throw new Error("Section is required for board card.");
        }

        return section;
    }

    private normalizePosition(position?: GridRect) : GridRect {
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
        title = title ?? null;

        return title;
    }
}

export default HeuteBoardCard;

//

export interface HeuteBoardCardProps {
    section: HeuteBoardSection;
    position: GridRect;
    title: string | null;
}